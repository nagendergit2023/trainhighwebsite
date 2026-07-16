import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";

import Hero from "../../Components/Hero/Hero";
import GetApiCall from "../../helpers/GetApi";
import BatchCard from "../../Components/Batches/BatchCard";
import PostApiCall from "../../helpers/PostApi";
import "./NewBatchClass.css";

const defaultFilters = {
  search: "",
  branchId: "",
  gender: "",
  status: "Active",
  booking: "",
};

export default function BatchList() {
  const navigate = useNavigate();
  const userData =
    localStorage.getItem("user") && JSON.parse(localStorage.getItem("user"));
  const userRole = String(userData?.role || "").toUpperCase();
  const userBranchId = userData?.branch_id || userData?.fld_branch_id || "";
  const memberId =
    userData?.memberId ||
    userData?.member_id ||
    userData?.fld_id ||
    userData?.id;
  const isMember = userRole === "MEMBER" || userRole === "member".toUpperCase();
  const canManage = ["SUPER ADMIN", "ADMIN", "STAFF"].includes(userRole);
  const canSeeAllBranches = userRole === "SUPER ADMIN";

  const [batches, setBatches] = useState([]);
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    ...defaultFilters,
    branchId: userBranchId || "",
  });

  const normalizeList = (data) => {
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.rows)) return data.rows;
    if (Array.isArray(data?.data)) return data.data;
    if (Array.isArray(data?.branches)) return data.branches;
    return [];
  };

  const normalizeBranchId = (item) =>
    item?.fld_branch_id || item?.branch_id || item?.branchId || item?.id || "";

  const filterByBranchAccess = useCallback(
    (list) => {
      if (canSeeAllBranches || !userBranchId) return list;
      return list.filter(
        (item) => String(normalizeBranchId(item)) === String(userBranchId),
      );
    },
    [canSeeAllBranches, userBranchId],
  );

  const getBranchName = (branchId) => {
    const branch = branches.find(
      (item) => String(normalizeBranchId(item)) === String(branchId),
    );
    return (
      branch?.fld_branch_name ||
      branch?.branch_name ||
      branch?.name ||
      branchId ||
      "-"
    );
  };

  const loadBranches = useCallback(async () => {
    try {
      const res = await GetApiCall.getRequest("GetBranches");
      if (res.status === 200 || res.status === 201) {
        const json = await res.json();
        const list = normalizeList(json);
        if (list.length) {
          setBranches(filterByBranchAccess(list));
          return;
        }
      }
    } catch (err) {}

    if (userBranchId)
      setBranches([
        {
          id: userBranchId,
          branch_name: userData?.branch_name || userBranchId,
        },
      ]);
  }, [filterByBranchAccess, userBranchId, userData?.branch_name]);

  const enrichBatchSchedules = async (list) => {
    const enriched = await Promise.all(
      list.map(async (batch) => {
        const batchId = batch.fld_id || batch.id;
        try {
          const res = await GetApiCall.getRequest(`batch/GetBatch/${batchId}`);
          const json = await res.json();
          const schedule = Array.isArray(json?.schedule) ? json.schedule : [];
          const days = schedule.map((item) => item.fld_day).filter(Boolean);
          const firstSchedule = schedule[0] || {};

          return {
            ...batch,
            schedule,
            days: days.join(", "),
            startTime: firstSchedule.fld_start_time?.slice(0, 5) || "",
            endTime: firstSchedule.fld_end_time?.slice(0, 5) || "",
          };
        } catch (err) {
          return batch;
        }
      }),
    );

    return enriched;
  };

  const loadBatches = useCallback(async () => {
    setLoading(true);
    try {
      const res = await PostApiCall.postRequest(
        { branchId: canSeeAllBranches ? null : userBranchId },
        "batch/GetBatches",
      );
      const json = await res.json();
      const visibleBatches = filterByBranchAccess(normalizeList(json));
      setBatches(await enrichBatchSchedules(visibleBatches));
    } catch {
      notification.error({ message: "Unable to load batches" });
    }
    setLoading(false);
  }, [canSeeAllBranches, filterByBranchAccess, userBranchId]);

  useEffect(() => {
    loadBranches();
    loadBatches();
  }, [loadBatches, loadBranches]);

  const setFilter = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const filteredBatches = useMemo(() => {
    const search = filters.search.toLowerCase();

    return batches.filter((batch) => {
      const branchId = normalizeBranchId(batch);
      const text = [
        batch.fld_batch_name,
        batch.batchName,
        batch.fld_room_name,
        batch.trainers,
        batch.days,
        batch.fld_description,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      if (search && !text.includes(search)) return false;
      if (filters.branchId && String(branchId) !== String(filters.branchId))
        return false;
      if (
        filters.gender &&
        (batch.fld_gender || batch.genderGroup) !== filters.gender
      )
        return false;
      if (
        filters.status &&
        (batch.status || batch.fld_status || "Active") !== filters.status
      )
        return false;
      if (filters.booking === "required" && !batch.fld_booking_required)
        return false;
      if (filters.booking === "walkin" && batch.fld_booking_required)
        return false;
      return true;
    });
  }, [batches, filters]);

  const bookSlot = async (batch) => {
    if (!memberId) {
      notification.error({ message: "Please login as member to book a slot" });
      return;
    }

    const today = new Date().toISOString().slice(0, 10);

    try {
      const res = await PostApiCall.postRequest(
        {
          batchId: batch.fld_id || batch.id,
          memberIds: [memberId],
          bookingDate: today,
          joinDate: today,
          paymentStatus: "Paid",
        },
        "batch/AssignMembersToBatch",
      );
      const json = await res.json();
      if (res.status === 200 || res.status === 201) {
        notification.success({ message: json.message || "Slot booked" });
        navigate(`/members/batch-ticket/${batch.fld_id || batch.id}`, {
          state: { batch },
        });
        loadBatches();
      } else {
        notification.error({
          message: json.message || "Unable to book slot",
        });
      }
    } catch {
      notification.error({ message: "Unable to book slot" });
    }
  };

  const deleteBatch = async (batch) => {
    const batchId = batch.fld_id || batch.id;
    try {
      const res = await PostApiCall.deleteRequest(
        `batch/DeleteBatch/${batchId}`,
      );
      const json = await res.json();
      if (res.status === 200 || res.status === 201) {
        notification.success({ message: json.message || "Batch deleted" });
        loadBatches();
      } else {
        notification.error({
          message: json.message || "Unable to delete batch",
        });
      }
    } catch {
      notification.error({ message: "Unable to delete batch" });
    }
  };

  const resetFilters = () => {
    setFilters({ ...defaultFilters, branchId: userBranchId || "" });
  };

  return (
    <>
      <section className="pb-5 inner-section">
        <Container>
          <Row className="justify-content-center mb-3">
            <Col lg={9}>
              <h2 className="section-title">Batches & Classes</h2>
              <p className="text-muted text-center mb-0">
                Manage schedules, availability and member slot bookings.
              </p>
            </Col>
          </Row>
          <div className="batch-list-header mb-4">
            <div></div>

            {canManage && (
              <div className="d-flex gap-2 flex-wrap">
                <Button
                  variant="outline-secondary"
                  onClick={() => navigate("/batch-calendar")}
                >
                  Calendar
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => navigate("/new-batch")}
                >
                  + New Batch
                </Button>
              </div>
            )}
          </div>

          <div className="batch-filter-panel mb-4">
            <Row className="g-2">
              <Col lg={3} md={6}>
                <FloatingLabel label="Search Classes">
                  <Form.Control
                    value={filters.search}
                    onChange={(e) => setFilter("search", e.target.value)}
                  />
                </FloatingLabel>
              </Col>
              <Col lg={2} md={6}>
                <FloatingLabel label="Branch">
                  <Form.Select
                    value={filters.branchId}
                    disabled={!canSeeAllBranches}
                    onChange={(e) => setFilter("branchId", e.target.value)}
                  >
                    <option value="">All Branches</option>
                    {branches.map((branch) => {
                      const branchId = normalizeBranchId(branch);
                      return (
                        <option key={branchId} value={branchId}>
                          {getBranchName(branchId)}
                        </option>
                      );
                    })}
                  </Form.Select>
                </FloatingLabel>
              </Col>
              <Col lg={2} md={6}>
                <FloatingLabel label="Gender">
                  <Form.Select
                    value={filters.gender}
                    onChange={(e) => setFilter("gender", e.target.value)}
                  >
                    <option value="">All Gender</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Unisex</option>
                  </Form.Select>
                </FloatingLabel>
              </Col>
              <Col lg={2} md={6}>
                <FloatingLabel label="Booking">
                  <Form.Select
                    value={filters.booking}
                    onChange={(e) => setFilter("booking", e.target.value)}
                  >
                    <option value="">All</option>
                    <option value="required">Booking Required</option>
                    <option value="walkin">Walk-In</option>
                  </Form.Select>
                </FloatingLabel>
              </Col>
              <Col lg={2} md={6}>
                <FloatingLabel label="Status">
                  <Form.Select
                    value={filters.status}
                    onChange={(e) => setFilter("status", e.target.value)}
                  >
                    <option value="">All Status</option>
                    <option>Active</option>
                    <option>Inactive</option>
                  </Form.Select>
                </FloatingLabel>
              </Col>
              <Col lg={2} md={6}>
                <Button
                  variant="outline-secondary"
                  className="w-100 h-100"
                  onClick={resetFilters}
                >
                  Reset
                </Button>
              </Col>
              <Col
                lg={8}
                className="d-flex align-items-center justify-content-end"
              >
                <span className="text-muted small">
                  Showing {filteredBatches.length} of {batches.length} batches
                </span>
              </Col>
            </Row>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <Spinner />
            </div>
          ) : filteredBatches.length === 0 ? (
            <div className="batch-empty-state">
              No batches match the selected filters.
            </div>
          ) : (
            <Row>
              {filteredBatches.map((batch) => (
                <Col
                  lg={6}
                  xl={4}
                  key={batch.fld_id || batch.id}
                  className="mb-4"
                >
                  <BatchCard
                    batch={batch}
                    canManage={canManage}
                    isMember={isMember}
                    onBook={() => bookSlot(batch)}
                    onDelete={() => deleteBatch(batch)}
                  />
                </Col>
              ))}
            </Row>
          )}
        </Container>
      </section>
    </>
  );
}
