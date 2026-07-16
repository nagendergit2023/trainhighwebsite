import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Badge,
  Button,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Spinner,
  Table,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { notification } from "antd";
import GetApiCall from "../../helpers/GetApi";
import PostApiCall from "../../helpers/PostApi";
import "./NewBatchClass.css";

export default function BatchManage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [batch, setBatch] = useState(null);
  const [members, setMembers] = useState([]);
  const [availableMembers, setAvailableMembers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [stats, setStats] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [selectedReviewDate, setSelectedReviewDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [assigning, setAssigning] = useState(false);
  const [paymentStatus] = useState("Paid");
  const [availableSearch, setAvailableSearch] = useState("");
  const [assignedSearch, setAssignedSearch] = useState("");
  const [removeTarget, setRemoveTarget] = useState(null);

  const normalizeArray = (data) =>
    Array.isArray(data) ? data : data?.rows || data?.data || [];

  const toLocalDateString = useCallback((date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }, []);

  const normalizeApiDate = useCallback((value) => {
    if (!value) return "";
    if (value instanceof Date && !Number.isNaN(value.getTime())) {
      return toLocalDateString(value);
    }

    const text = String(value);
    if (!text.includes("T")) return text.slice(0, 10);

    const parsed = new Date(text);
    if (Number.isNaN(parsed.getTime())) return text.slice(0, 10);
    return toLocalDateString(parsed);
  }, [toLocalDateString]);
  const formatReviewDate = (value) => {
    if (!value) return "-";
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) return String(value).slice(0, 10);
    return parsed.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const capacity = Number(batch?.fld_capacity || 0);
  const activeCount = Number(stats?.booked || 0) + Number(stats?.active || 0);
  const seatsLeft = capacity ? Math.max(capacity - activeCount, 0) : 0;

  const memberMatches = (member, search) => {
    const needle = search.trim().toLowerCase();
    if (!needle) return true;
    return [
      member.fld_name,
      member.fld_mobile_number,
      member.fld_membership_number,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase()
      .includes(needle);
  };

  const filteredAvailableMembers = useMemo(
    () =>
      availableMembers.filter((member) =>
        memberMatches(member, availableSearch),
      ),
    [availableMembers, availableSearch],
  );

  const filteredAssignedMembers = useMemo(
    () => members.filter((member) => memberMatches(member, assignedSearch)),
    [members, assignedSearch],
  );

  const reviewDateOptions = useMemo(() => {
    const dates = new Set();
    members.forEach((member) => {
      const date = normalizeApiDate(member.fld_booking_date);
      if (date) dates.add(date);
    });
    reviews.forEach((review) => {
      const date = normalizeApiDate(review.fld_booking_date || review.bookingDate);
      if (date) dates.add(date);
    });
    return Array.from(dates).sort().reverse();
  }, [members, normalizeApiDate, reviews]);
  const selectedMemberNames = useMemo(
    () =>
      availableMembers
        .filter((member) => selectedMembers.includes(member.fld_id))
        .map((member) => member.fld_name)
        .join(", "),
    [availableMembers, selectedMembers],
  );

  const loadManageData = useCallback(async () => {
    setLoading(true);
    try {
      const [batchRes, memberRes, availableRes, statsRes, reviewRes] = await Promise.all([
        GetApiCall.getRequest(`batch/GetBatch/${id}`),
        GetApiCall.getRequest(`batch/GetBatchMembers/${id}`),
        GetApiCall.getRequest(`batch/GetAvailableMembers/${id}`),
        GetApiCall.getRequest(`batch/GetBatchStatistics/${id}`),
        GetApiCall.getRequest(
          `batch/GetBatchReviews/${id}${
            selectedReviewDate ? `?bookingDate=${selectedReviewDate}` : ""
          }`,
        ),
      ]);

      const batchJson = await batchRes.json();
      const memberJson = await memberRes.json();
      const availableJson = await availableRes.json();
      const statsJson = await statsRes.json();
      const reviewJson = await reviewRes.json();

      if (batchJson?.batch) setBatch(batchJson.batch);
      setMembers(normalizeArray(memberJson));
      setAvailableMembers(normalizeArray(availableJson));
      setStats(statsJson || null);
      setReviews(normalizeArray(reviewJson));
    } catch (err) {
      notification.error({ message: "Unable to load batch management data" });
    }
    setLoading(false);
  }, [id, selectedReviewDate]);

  useEffect(() => {
    loadManageData();
  }, [loadManageData]);

  const toggleMember = (memberId) => {
    setSelectedMembers((prev) =>
      prev.includes(memberId)
        ? prev.filter((item) => item !== memberId)
        : [...prev, memberId],
    );
  };

  const assignMembers = async () => {
    if (!selectedMembers.length) {
      notification.error({ message: "Select at least one member" });
      return;
    }

    const today = new Date().toISOString().slice(0, 10);
    setAssigning(true);
    try {
      const res = await PostApiCall.postRequest(
        {
          batchId: id,
          memberIds: selectedMembers,
          bookingDate: today,
          joinDate: today,
          paymentStatus,
        },
        "batch/AssignMembersToBatch",
      );
      const json = await res.json();

      if (res.status === 200 || res.status === 201) {
        notification.success({ message: json.message || "Members assigned" });
        setSelectedMembers([]);
        loadManageData();
      } else {
        notification.error({
          message: json.message || "Unable to assign members",
        });
      }
    } catch (err) {
      notification.error({ message: "Unable to assign members" });
    }
    setAssigning(false);
  };

  const removeMember = async () => {
    if (!removeTarget) return;

    try {
      const res = await PostApiCall.postRequest(
        { batchMemberId: removeTarget.fld_id },
        "batch/RemoveBatchMember",
      );
      const json = await res.json();
      if (res.status === 200 || res.status === 201) {
        notification.success({ message: json.message || "Member removed" });
        setRemoveTarget(null);
        loadManageData();
      } else {
        notification.error({
          message: json.message || "Unable to remove member",
        });
      }
    } catch (err) {
      notification.error({ message: "Unable to remove member" });
    }
  };

  const addRemovedMemberAgain = async (member) => {
    try {
      const res = await PostApiCall.postRequest(
        { batchMemberId: member.fld_id, status: "Active" },
        "batch/MarkBatchAttendance",
      );
      const json = await res.json();
      if (res.status === 200 || res.status === 201) {
        notification.success({ message: json.message || "Member added again" });
        loadManageData();
      } else {
        notification.error({
          message: json.message || "Unable to add member again",
        });
      }
    } catch (err) {
      notification.error({ message: "Unable to add member again" });
    }
  };

  return (
    <>
      <section className="pb-5 inner-section">
        <Container>
          <Row className="justify-content-center mb-3">
            <Col lg={9}>
              <h2 className="section-title">Manage Batch</h2>
              <p className="text-muted text-center mb-0">
                {batch?.fld_batch_name ||
                  "Assign members and review batch capacity."}
              </p>
            </Col>
          </Row>
          <div className="batch-form-header mb-4">
            <div></div>
            <div className="d-flex gap-2">
              <Button
                variant="outline-secondary"
                onClick={() => navigate("/batches")}
              >
                Batches
              </Button>
              <Button
                variant="warning"
                onClick={() => navigate(`/batch/edit/${id}`)}
              >
                Edit
              </Button>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <Spinner />
            </div>
          ) : (
            <>
              <Row className="g-3 mb-4">
                <Col md={3}>
                  <div className="batch-stat-box">
                    <span>Capacity</span>
                    <strong>{capacity || "-"}</strong>
                  </div>
                </Col>
                <Col md={3}>
                  <div className="batch-stat-box">
                    <span>Booked</span>
                    <strong>{stats?.booked || 0}</strong>
                  </div>
                </Col>
                <Col md={3}>
                  <div className="batch-stat-box">
                    <span>Active</span>
                    <strong>{stats?.active || 0}</strong>
                  </div>
                </Col>
                <Col md={3}>
                  <div className="batch-stat-box">
                    <span>Seats Left</span>
                    <strong>{seatsLeft}</strong>
                  </div>
                </Col>
              </Row>

              <Row className="g-4">
                <Col lg={5}>
                  <div className="batch-filter-panel h-100">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h5 className="mb-0">Assign Members</h5>
                      <Badge bg="secondary">
                        {selectedMembers.length} selected
                      </Badge>
                    </div>
                    <Form.Control
                      className="mb-3"
                      placeholder="Search available members"
                      value={availableSearch}
                      onChange={(e) => setAvailableSearch(e.target.value)}
                    />
                    <div className="batch-member-pick-list mb-3">
                      {filteredAvailableMembers.map((member) => (
                        <Form.Check
                          key={member.fld_id}
                          type="checkbox"
                          label={`${member.fld_name} ${member.fld_mobile_number ? `- ${member.fld_mobile_number}` : ""}`}
                          checked={selectedMembers.includes(member.fld_id)}
                          onChange={() => toggleMember(member.fld_id)}
                        />
                      ))}
                      {!filteredAvailableMembers.length && (
                        <div className="text-muted small">
                          No available active members found.
                        </div>
                      )}
                    </div>
                    {selectedMemberNames && (
                      <p className="small text-muted">{selectedMemberNames}</p>
                    )}
                    <Button
                      className="w-100"
                      variant="secondary"
                      disabled={assigning}
                      onClick={assignMembers}
                    >
                      {assigning ? "Assigning..." : "Assign Selected Members"}
                    </Button>
                  </div>
                </Col>

                <Col lg={7}>
                  <div className="batch-filter-panel h-100">
                    <div className="d-flex justify-content-between align-items-center gap-3 mb-3">
                      <h5 className="mb-0">Assigned Members</h5>
                      <Form.Control
                        className="batch-member-search"
                        placeholder="Search assigned members"
                        value={assignedSearch}
                        onChange={(e) => setAssignedSearch(e.target.value)}
                      />
                    </div>
                    <Table responsive hover className="align-middle mb-0">
                      <thead>
                        <tr>
                          <th>Member</th>
                          <th>Mobile</th>
                          <th>Status</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredAssignedMembers.map((member) => (
                          <tr key={member.fld_id}>
                            <td>
                              {member.fld_name}
                              <div className="text-muted small">
                                {member.fld_membership_number}
                              </div>
                            </td>
                            <td>{member.fld_mobile_number}</td>
                            <td>
                              <Badge
                                bg={
                                  member.fld_status === "Cancelled"
                                    ? "secondary"
                                    : "success"
                                }
                              >
                                {member.fld_status}
                              </Badge>
                            </td>
                            <td className="text-end">
                              {member.fld_status === "Cancelled" ? (
                                <Button
                                  size="sm"
                                  variant="outline-success"
                                  onClick={() => addRemovedMemberAgain(member)}
                                >
                                  Add Again
                                </Button>
                              ) : (
                                <Button
                                  size="sm"
                                  variant="outline-danger"
                                  onClick={() => setRemoveTarget(member)}
                                >
                                  Remove
                                </Button>
                              )}
                            </td>
                          </tr>
                        ))}
                        {!filteredAssignedMembers.length && (
                          <tr>
                            <td
                              colSpan="4"
                              className="text-center text-muted py-4"
                            >
                              No members found.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </Table>
                  </div>
                </Col>
              </Row>

              <Row className="mt-4">
                <Col>
                  <div className="batch-filter-panel">
                    <div className="d-flex justify-content-between align-items-center gap-3 mb-3 flex-wrap">
                      <h5 className="mb-0">Member Reviews</h5>
                      <div className="d-flex align-items-center gap-2 flex-wrap">
                        <Form.Select
                          className="batch-member-search"
                          value={selectedReviewDate}
                          onChange={(e) => setSelectedReviewDate(e.target.value)}
                        >
                          <option value="">All Dates</option>
                          {reviewDateOptions.map((date) => (
                            <option key={date} value={date}>
                              {formatReviewDate(date)}
                            </option>
                          ))}
                        </Form.Select>
                        <Badge bg="secondary">{reviews.length} submitted</Badge>
                      </div>
                    </div>
                    <Table responsive hover className="align-middle mb-0">
                      <thead>
                        <tr>
                          <th>Member</th>
                          <th>Trainer</th>
                          <th>Class Date</th>
                          <th>Rating</th>
                          <th>Review</th>
                          <th>Submitted</th>
                        </tr>
                      </thead>
                      <tbody>
                        {reviews.map((review) => (
                          <tr key={review.fld_id || `${review.fld_member_id}-${review.fld_created_at}`}>
                            <td>{review.member_name || "Anonymous"}</td>
                            <td>{review.trainer_name || "-"}</td>
                            <td>
                              {formatReviewDate(
                                review.fld_booking_date || review.bookingDate,
                              )}
                            </td>
                            <td>
                              <Badge bg="warning" text="dark">
                                {review.fld_rating || review.rating || 0}/5
                              </Badge>
                            </td>
                            <td className="batch-review-text">
                              {review.fld_review || review.review || "-"}
                              {Number(review.fld_is_anonymous || 0) === 1 && (
                                <div className="text-muted small">Anonymous review</div>
                              )}
                            </td>
                            <td>{formatReviewDate(review.fld_created_at || review.createdAt)}</td>
                          </tr>
                        ))}
                        {!reviews.length && (
                          <tr>
                            <td
                              colSpan="6"
                              className="text-center text-muted py-4"
                            >
                              No reviews submitted yet.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </Table>
                  </div>
                </Col>
              </Row>
            </>
          )}
        </Container>
      </section>

      <Modal
        show={Boolean(removeTarget)}
        onHide={() => setRemoveTarget(null)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Remove Member</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to remove{" "}
          <strong>{removeTarget?.fld_name}</strong> from this batch?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-secondary"
            onClick={() => setRemoveTarget(null)}
          >
            Cancel
          </Button>
          <Button variant="danger" onClick={removeMember}>
            Remove
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}








