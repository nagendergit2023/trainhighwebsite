import React, { useEffect, useMemo, useState } from "react";
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";
import { Image, Modal, notification, Table, Tag } from "antd";
import GetApiCall from "../../helpers/GetApi.js";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import noimage from "../../assets/images/No_Image_Available.jpg";
import PostApiCall from "../../helpers/PostApi.js";

const defaultFilters = {
  branchId: "",
  status: "",
  gender: "",
  membership: "",
  trainer: "",
  expiry: "",
  biometricStatus: "",
  fitnessGoal: "",
  startFrom: "",
  startTo: "",
  endFrom: "",
  endTo: "",
};

function MembershipList() {
  const navigate = useNavigate();
  const userData =
    localStorage.getItem("user") && JSON.parse(localStorage.getItem("user"));
  const currentBranchId = userData?.branch_id || "";

  const [memberList, setMemberList] = useState([]);
  const [searchField, setSearchField] = useState("");
  const [searchFieldText, setSearchFieldText] = useState("");
  const [filters, setFilters] = useState({
    ...defaultFilters,
    branchId: currentBranchId || "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [staff, setStaff] = useState([]);
  const [trainerId, setTrainerId] = useState("");

  useEffect(() => {
    GetApiCall.getRequest("staff").then((res) =>
      res.json().then((data) => setStaff(data.data || [])),
    );
  }, []);

  useEffect(() => {
    GetApiCall.getRequest("GetMemberList").then((results) => {
      results.json().then((obj) => {
        if (results.status === 200 || results.status === 201) {
          setMemberList(obj.data || []);
        }
      });
    });
  }, []);

  const today = moment();

  const getExpiryInfo = (endDate) => {
    const end = moment(endDate);
    const diff = end.diff(today, "days");

    if (!endDate || !end.isValid()) {
      return { status: "UNKNOWN", days: null };
    }

    if (diff < 0) return { status: "EXPIRED", days: diff };
    if (diff <= 3) return { status: "EXPIRING_SOON", days: diff };
    if (diff <= 7) return { status: "WARNING", days: diff };
    return { status: "ACTIVE", days: diff };
  };

  const getStatusTag = (originalStatus, endDate) => {
    const expiry = getExpiryInfo(endDate);

    if (expiry.status === "EXPIRED") return <Tag color="red">Expired</Tag>;
    if (expiry.status === "EXPIRING_SOON") {
      return (
        <Tag color="orange">
          {expiry.days} day{expiry.days !== 1 && "s"} Left
        </Tag>
      );
    }
    if (expiry.status === "WARNING") {
      return <Tag color="gold">{expiry.days} days Left</Tag>;
    }
    if (originalStatus === "InActive") return <Tag>Inactive</Tag>;
    return <Tag color="green">Active</Tag>;
  };

  const getTrainerName = (id) => {
    const trainer = staff.find((s) => String(s.id) === String(id));
    return trainer ? trainer.name : null;
  };

  const uniqueOptions = (field) =>
    Array.from(
      new Set(
        memberList
          .map((member) => member?.[field])
          .filter(
            (value) => value !== undefined && value !== null && value !== "",
          ),
      ),
    );

  const branchOptions = useMemo(
    () => uniqueOptions("fld_branch_id"),
    [memberList],
  );
  const genderOptions = useMemo(
    () => uniqueOptions("fld_gender"),
    [memberList],
  );
  const goalOptions = useMemo(
    () => uniqueOptions("fld_fitness_goal"),
    [memberList],
  );
  const biometricOptions = useMemo(
    () => uniqueOptions("biometric_status"),
    [memberList],
  );

  const openTrainerModal = (member) => {
    setSelectedMember(member);
    setTrainerId(member.trainer_id || "");
    setIsModalOpen(true);
  };

  const assignTrainer = () => {
    if (!trainerId) {
      notification.error({ message: "Please select trainer" });
      return;
    }

    PostApiCall.postRequest(
      {
        memberId: selectedMember.fld_id,
        trainerId: trainerId,
      },
      "AssignTrainer",
    ).then(() => {
      notification.success({ message: "Trainer Assigned Successfully" });
      setMemberList((prev) =>
        prev.map((m) =>
          m.fld_id === selectedMember.fld_id
            ? { ...m, trainer_id: trainerId }
            : m,
        ),
      );
      setIsModalOpen(false);
    });
  };

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    setSearchFieldText(searchField.trim());
  };

  const resetFilters = () => {
    setSearchField("");
    setSearchFieldText("");
    setFilters({ ...defaultFilters, branchId: currentBranchId || "" });
  };

  const isBetweenDates = (value, from, to) => {
    if (!from && !to) return true;
    const date = moment(value);
    if (!date.isValid()) return false;
    if (from && date.isBefore(moment(from), "day")) return false;
    if (to && date.isAfter(moment(to), "day")) return false;
    return true;
  };

  const filteredMembers = useMemo(() => {
    const search = searchFieldText.toLowerCase();

    return memberList.filter((item) => {
      const expiry = getExpiryInfo(item.fld_end_date);
      const matchesSearch =
        !search ||
        item.fld_name?.toLowerCase().includes(search) ||
        item.fld_mobile_number?.toString().includes(search) ||
        item.fld_membership_number?.toLowerCase().includes(search) ||
        item.fld_application_number?.toLowerCase().includes(search) ||
        item.fld_email?.toLowerCase().includes(search);

      if (!matchesSearch) return false;
      if (
        filters.branchId &&
        String(item.fld_branch_id) !== String(filters.branchId)
      )
        return false;
      if (filters.status && item.fld_status !== filters.status) return false;
      if (filters.gender && item.fld_gender !== filters.gender) return false;
      if (
        filters.membership &&
        String(item.fld_membership) !== filters.membership
      )
        return false;
      if (filters.fitnessGoal && item.fld_fitness_goal !== filters.fitnessGoal)
        return false;
      if (filters.biometricStatus === "not_linked" && item.biometric_status)
        return false;
      if (
        filters.biometricStatus &&
        filters.biometricStatus !== "not_linked" &&
        String(item.biometric_status || "") !== filters.biometricStatus
      ) {
        return false;
      }
      if (filters.expiry && expiry.status !== filters.expiry) return false;
      if (filters.trainer === "assigned" && !item.trainer_id) return false;
      if (filters.trainer === "unassigned" && item.trainer_id) return false;
      if (
        filters.trainer &&
        !["assigned", "unassigned"].includes(filters.trainer) &&
        String(item.trainer_id || "") !== filters.trainer
      ) {
        return false;
      }
      if (
        !isBetweenDates(item.fld_start_date, filters.startFrom, filters.startTo)
      )
        return false;
      if (!isBetweenDates(item.fld_end_date, filters.endFrom, filters.endTo))
        return false;
      return true;
    });
  }, [filters, memberList, searchFieldText]);

  const data = {
    columns: [
      {
        title: "#",
        dataIndex: "SNo",
        sorter: (a, b) => a.SNo - b.SNo,
        width: "60px",
      },
      {
        title: "ID",
        dataIndex: "Membership",
        sorter: (a, b) =>
          String(a.Membership).localeCompare(String(b.Membership)),
        width: "150px",
      },
      {
        title: "Name",
        dataIndex: "MemberName",
        sorter: (a, b) =>
          String(a.MemberName).localeCompare(String(b.MemberName)),
        width: "160px",
      },
      {
        title: "Mobile No.",
        dataIndex: "MobileNo",
        sorter: (a, b) => String(a.MobileNo).localeCompare(String(b.MobileNo)),
        width: "125px",
      },
      { title: "Gender", dataIndex: "Gender", width: "90px" },
      { title: "Goal", dataIndex: "FitnessGoal", width: "140px" },
      { title: "Trainer", dataIndex: "Trainer", width: "140px" },
      { title: "Membership", dataIndex: "MembershipPeriod", width: "120px" },
      { title: "Branch", dataIndex: "Branch", width: "100px" },
      {
        title: "Start Date",
        dataIndex: "StartDate",
        sorter: (a, b) =>
          moment(a.StartDateRaw).valueOf() - moment(b.StartDateRaw).valueOf(),
        width: "120px",
      },
      {
        title: "End Date",
        dataIndex: "EndDate",
        sorter: (a, b) =>
          moment(a.EndDateRaw).valueOf() - moment(b.EndDateRaw).valueOf(),
        width: "120px",
      },
      { title: "Biometric", dataIndex: "Biometric", width: "140px" },
      { title: "Status", dataIndex: "Status", width: "100px" },
      { title: "Actions", dataIndex: "Action", width: "110px" },
    ],
    rows: filteredMembers.map((member, i) => {
      const expiry = getExpiryInfo(member.fld_end_date);
      return {
        key: member.fld_id,
        SNo: i + 1,
        MemberImage: <Image width={100} src={member.fld_photo || noimage} />,
        MemberName: member.fld_name,
        Address: member.fld_address,
        StartDate: moment(member.fld_start_date).format("ll"),
        StartDateRaw: member.fld_start_date,
        EndDate: moment(member.fld_end_date).format("ll"),
        EndDateRaw: member.fld_end_date,
        MobileNo: member.fld_mobile_number,
        Membership: member.fld_membership_number,
        Gender: member.fld_gender || "-",
        FitnessGoal: member.fld_fitness_goal || "-",
        MembershipPeriod: member.fld_membership
          ? (() => {
              const value = String(member.fld_membership).trim();

              // Already contains a unit (Days, Months, Weeks, Years, etc.)
              if (/[a-zA-Z]/.test(value)) {
                return value;
              }

              // Pure numeric value -> treat as months
              return `${value} Month${Number(value) > 1 ? "s" : ""}`;
            })()
          : "-",
        Branch: member.fld_branch_id || "-",
        DaysLeft:
          expiry.days === null
            ? "-"
            : expiry.days < 0
              ? "Expired"
              : `${expiry.days} day${expiry.days !== 1 ? "s" : ""}`,
        Status: getStatusTag(member.fld_status, member.fld_end_date),
        Trainer: member.trainer_id ? (
          <Tag color="blue">
            {getTrainerName(member.trainer_id) || "Assigned"}
          </Tag>
        ) : (
          <Tag>Not Assigned</Tag>
        ),
        Biometric: member.biometric_status ? (
          <Tag color={member.biometric_status === "ACTIVE" ? "green" : "gold"}>
            {member.biometric_name || member.biometric_status}
          </Tag>
        ) : (
          <Tag>Not Linked</Tag>
        ),
        Action: (
          <div className="d-flex align-items-center justify-content-start">
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle btn-sm"
                type="button"
                id={`member-actions-${member.fld_id}`}
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Manage
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby={`member-actions-${member.fld_id}`}
              >
                <li>
                  <Link
                    className="dropdown-item"
                    to="/new-membership"
                    state={{ data: member, type: "update" }}
                  >
                    Edit
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item"
                    to="/new-membership"
                    state={{ data: member, type: "renew" }}
                  >
                    Renew Membership
                  </Link>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => openTrainerModal(member)}
                  >
                    {member.trainer_id ? "Change Trainer" : "Assign Trainer"}
                  </button>
                </li>
              </ul>
            </div>
          </div>
        ),
      };
    }),
  };

  return (
    <>
      <section className="pb-5 inner-section">
        <Container>
          <Row className="justify-content-center mb-3">
            <Col lg={9}>
              <h2 className="section-title">My Members</h2>
            </Col>
          </Row>
          <Row>
            <Col lg={12} className="mb-lg-4">
              <Form>
                <Row>
                  <Col lg={8}>
                    <FloatingLabel
                      controlId="memberSearch"
                      label="Search by Name, Membership ID, Application No, Email or Mobile"
                      className="mb-3"
                      style={{ fontSize: "15px" }}
                    >
                      <Form.Control
                        type="text"
                        value={searchField}
                        onChange={(e) => setSearchField(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleSearch();
                          }
                        }}
                      />
                    </FloatingLabel>
                  </Col>
                  <Col lg={2}>
                    <Button
                      variant="secondary"
                      className="w-100 py-3 mb-3 mb-lg-0"
                      onClick={handleSearch}
                    >
                      Search
                    </Button>
                  </Col>
                  <Col lg={2}>
                    <Button
                      variant="secondary"
                      className="w-100 py-3 mb-3 mb-lg-0"
                      onClick={() => navigate("/new-membership")}
                    >
                      Add New Member
                    </Button>
                  </Col>

                  <Col lg={12}>
                    <Row className="g-2 mt-1">
                      <Col lg={2} md={4}>
                        <FloatingLabel label="Branch">
                          <Form.Select
                            value={filters.branchId}
                            disabled={Boolean(currentBranchId)}
                            onChange={(e) =>
                              handleFilterChange("branchId", e.target.value)
                            }
                          >
                            <option value="">All Branches</option>
                            {branchOptions.map((branch) => (
                              <option key={branch} value={branch}>
                                {branch}
                              </option>
                            ))}
                          </Form.Select>
                        </FloatingLabel>
                      </Col>
                      <Col lg={2} md={4}>
                        <FloatingLabel label="Status">
                          <Form.Select
                            value={filters.status}
                            onChange={(e) =>
                              handleFilterChange("status", e.target.value)
                            }
                          >
                            <option value="">All Status</option>
                            <option value="Active">Active</option>
                            <option value="InActive">Inactive</option>
                          </Form.Select>
                        </FloatingLabel>
                      </Col>
                      <Col lg={2} md={4}>
                        <FloatingLabel label="Expiry">
                          <Form.Select
                            value={filters.expiry}
                            onChange={(e) =>
                              handleFilterChange("expiry", e.target.value)
                            }
                          >
                            <option value="">All Expiry</option>
                            <option value="EXPIRED">Expired</option>
                            <option value="EXPIRING_SOON">0-3 Days</option>
                            <option value="WARNING">4-7 Days</option>
                            <option value="ACTIVE">Active &gt; 7 Days</option>
                          </Form.Select>
                        </FloatingLabel>
                      </Col>
                      <Col lg={2} md={4}>
                        <FloatingLabel label="Gender">
                          <Form.Select
                            value={filters.gender}
                            onChange={(e) =>
                              handleFilterChange("gender", e.target.value)
                            }
                          >
                            <option value="">All Gender</option>
                            {genderOptions.map((gender) => (
                              <option key={gender} value={gender}>
                                {gender}
                              </option>
                            ))}
                          </Form.Select>
                        </FloatingLabel>
                      </Col>
                      <Col lg={2} md={4}>
                        <FloatingLabel label="Membership">
                          <Form.Select
                            value={filters.membership}
                            onChange={(e) =>
                              handleFilterChange("membership", e.target.value)
                            }
                          >
                            <option value="">All Plans</option>
                            <option value="1">1 Month</option>
                            <option value="3">3 Months</option>
                            <option value="6">6 Months</option>
                            <option value="12">12 Months</option>
                            <option value="custom">Custom</option>
                          </Form.Select>
                        </FloatingLabel>
                      </Col>
                      <Col lg={2} md={4}>
                        <FloatingLabel label="Trainer">
                          <Form.Select
                            value={filters.trainer}
                            onChange={(e) =>
                              handleFilterChange("trainer", e.target.value)
                            }
                          >
                            <option value="">All Trainers</option>
                            <option value="assigned">Assigned</option>
                            <option value="unassigned">Unassigned</option>
                            {staff
                              ?.filter((s) => s.role !== "Admin")
                              .map((trainer) => (
                                <option key={trainer.id} value={trainer.id}>
                                  {trainer.name}
                                </option>
                              ))}
                          </Form.Select>
                        </FloatingLabel>
                      </Col>
                      <Col lg={2} md={4}>
                        <FloatingLabel label="Fitness Goal">
                          <Form.Select
                            value={filters.fitnessGoal}
                            onChange={(e) =>
                              handleFilterChange("fitnessGoal", e.target.value)
                            }
                          >
                            <option value="">All Goals</option>
                            {goalOptions.map((goal) => (
                              <option key={goal} value={goal}>
                                {goal}
                              </option>
                            ))}
                          </Form.Select>
                        </FloatingLabel>
                      </Col>
                      <Col lg={2} md={4}>
                        <FloatingLabel label="Biometric">
                          <Form.Select
                            value={filters.biometricStatus}
                            onChange={(e) =>
                              handleFilterChange(
                                "biometricStatus",
                                e.target.value,
                              )
                            }
                          >
                            <option value="">All Biometric</option>
                            <option value="not_linked">Not Linked</option>
                            {biometricOptions.map((status) => (
                              <option key={status} value={status}>
                                {status}
                              </option>
                            ))}
                          </Form.Select>
                        </FloatingLabel>
                      </Col>
                      <Col lg={2} md={4}>
                        <FloatingLabel label="Start From">
                          <Form.Control
                            type="date"
                            value={filters.startFrom}
                            onChange={(e) =>
                              handleFilterChange("startFrom", e.target.value)
                            }
                          />
                        </FloatingLabel>
                      </Col>
                      <Col lg={2} md={4}>
                        <FloatingLabel label="Start To">
                          <Form.Control
                            type="date"
                            value={filters.startTo}
                            onChange={(e) =>
                              handleFilterChange("startTo", e.target.value)
                            }
                          />
                        </FloatingLabel>
                      </Col>
                      <Col lg={2} md={4}>
                        <FloatingLabel label="Expiry From">
                          <Form.Control
                            type="date"
                            value={filters.endFrom}
                            onChange={(e) =>
                              handleFilterChange("endFrom", e.target.value)
                            }
                          />
                        </FloatingLabel>
                      </Col>
                      <Col lg={2} md={4}>
                        <FloatingLabel label="Expiry To">
                          <Form.Control
                            type="date"
                            value={filters.endTo}
                            onChange={(e) =>
                              handleFilterChange("endTo", e.target.value)
                            }
                          />
                        </FloatingLabel>
                      </Col>
                      <Col lg={2} md={4}>
                        <Button
                          variant="outline-secondary"
                          className="w-100 h-100"
                          onClick={resetFilters}
                        >
                          Reset Filters
                        </Button>
                      </Col>
                      <Col
                        lg={10}
                        md={8}
                        className="d-flex align-items-center justify-content-end"
                      >
                        <span className="text-muted small">
                          Showing {data.rows.length} of {memberList.length}{" "}
                          members
                        </span>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Form>
            </Col>
            <Col lg={12}>
              <Table
                size="small"
                bordered={true}
                scroll={{ x: 1300, y: 1000 }}
                className="customTable"
                columns={data.columns}
                dataSource={data.rows}
                rowClassName={(record) => {
                  const expiry = getExpiryInfo(record.EndDateRaw);
                  if (expiry.status === "EXPIRED") return "expired-row";
                  if (expiry.status === "WARNING") return "warning-row";
                  if (expiry.status === "EXPIRING_SOON") return "urgent-row";
                  return "";
                }}
              />
            </Col>
          </Row>
        </Container>
      </section>
      <Modal
        title={selectedMember?.trainer_id ? "Change Trainer" : "Assign Trainer"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={assignTrainer}
        okText="Save"
      >
        <FloatingLabel label="Select Trainer">
          <Form.Select
            value={trainerId}
            onChange={(e) => setTrainerId(e.target.value)}
          >
            <option value="">Select Trainer</option>
            {staff
              ?.filter((s) => s.role !== "Admin")
              .map((trainer) => (
                <option key={trainer.id} value={trainer.id}>
                  {trainer.name} - {trainer.staff_code}
                </option>
              ))}
          </Form.Select>
        </FloatingLabel>
      </Modal>
    </>
  );
}

export default MembershipList;
