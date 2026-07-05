import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";
import { Table, Tag } from "antd";
import GetApiCall from "../../helpers/GetApi.js";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import noimage from "../../assets/images/No_Image_Available.jpg";
import { Image } from "antd";
import Hero from "../../Components/Hero/Hero.js";
import { Modal, notification } from "antd";
import PostApiCall from "../../helpers/PostApi.js";

function MembershipList() {
  let navigate = useNavigate();
  const [memberList, setMemberList] = useState([]);
  const [searchField, setSearchField] = useState("");
  const [searchFieldText, setSearchFieldText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [staff, setStaff] = useState([]);
  const [trainerId, setTrainerId] = useState("");
  useEffect(() => {
    GetApiCall.getRequest("staff").then((res) =>
      res.json().then((data) => setStaff(data.data)),
    );
  }, []);

  useEffect(() => {
    GetApiCall.getRequest("GetMemberList").then((results) => {
      results.json().then((obj) => {
        if (results.status === 200 || results.status === 201) {
          setMemberList(obj.data);
          // setMembershipNumber(obj.membershipNumber);
        }
      });
    });
  }, []);
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

      // Update list locally
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
  const isExpired = (endDate) => {
    return moment(endDate).isBefore(moment(), "day");
  };

  const getTrainerName = (trainerId) => {
    const trainer = staff.find((s) => s.id === trainerId);
    return trainer ? trainer.name : null;
  };

  const today = moment();

  const getExpiryInfo = (endDate) => {
    const end = moment(endDate);
    const diff = end.diff(today, "days");

    if (diff < 0) {
      return { status: "EXPIRED", days: diff };
    }

    if (diff <= 3) {
      return { status: "EXPIRING_SOON", days: diff };
    }

    if (diff <= 7) {
      return { status: "WARNING", days: diff };
    }

    return { status: "ACTIVE", days: diff };
  };

  const getStatusTag = (originalStatus, endDate) => {
    const expiry = getExpiryInfo(endDate);

    if (expiry.status === "EXPIRED") {
      return <Tag color="red">Expired</Tag>;
    }

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

    return <Tag color="green">Active</Tag>;
  };

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
        sorter: (a, b) => a.Membership - b.Membership,
        width: "150px",
      },
      // {
      //   title: "Profile Photo",
      //   dataIndex: "MemberImage",
      //   width: "150px",
      // },
      {
        title: "Name",
        dataIndex: "MemberName",
        sorter: (a, b) => a.MemberName - b.MemberName,
        width: "160px",
      },
      {
        title: "Mobile No.",
        dataIndex: "MobileNo",
        sorter: (a, b) => a.MobileNo - b.MobileNo,
        width: "125px",
      },
      {
        title: "Trainer",
        dataIndex: "Trainer",
        width: "140px",
      },

      {
        title: "Start Date",
        dataIndex: "StartDate",
        sorter: (a, b) => a.StartDate - b.StartDate,
        width: "120px",
      },
      {
        title: "End Date",
        dataIndex: "EndDate",
        sorter: (a, b) => a.StartDate - b.StartDate,
        width: "120px",
      },
      // {
      //   title: "Days Left",
      //   dataIndex: "DaysLeft",
      //   width: "100px",
      // },

      {
        title: "Status",
        dataIndex: "Status",
        sorter: (a, b) => a.Status - b.Status,
        width: "100px",
      },
      {
        title: "Actions",
        dataIndex: "Action",
        width: "110px",
      },
    ],
    rows: memberList
      .filter((item) => {
        if (!searchFieldText) return true;

        const search = searchFieldText.toLowerCase();

        return (
          item.fld_name?.toLowerCase().includes(search) ||
          item.fld_mobile_number?.toString().includes(search) ||
          item.fld_membership_number?.toLowerCase().includes(search)
        );
      })
      .map((data, i) => {
        const expiry = getExpiryInfo(data.fld_end_date);
        return {
          key: data.fld_id,
          SNo: i + 1,
          MemberImage: <Image width={100} src={noimage} />,
          MemberName: data.fld_name,
          Address: data.fld_address,
          StartDate: moment(data.fld_start_date).format("ll"),
          EndDate: moment(data.fld_end_date).format("ll"),
          MobileNo: data.fld_mobile_number,
          Membership: data.fld_membership_number,

          DaysLeft:
            expiry.days < 0
              ? "Expired"
              : `${expiry.days} day${expiry.days !== 1 ? "s" : ""}`,

          Status: getStatusTag(data.fld_status, data.fld_end_date),

          Trainer: data.trainer_id ? (
            <Tag color="blue">{getTrainerName(data.trainer_id)}</Tag>
          ) : (
            <Tag>Not Assigned</Tag>
          ),
          EndDateRaw: data.fld_end_date, // important for row highlight

          Action: (
            <div className="d-flex align-items-center justify-content-start">
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Manage
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/new-membership"
                      state={{ data: data, type: "update" }}
                    >
                      Edit
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/new-membership"
                      state={{ data: data, type: "renew" }}
                    >
                      Renew Membership
                    </Link>
                  </li>
                  {/* <li>
                    <Link
                      className="dropdown-item"
                      to="/new-membership"
                      state={{ data: data, type: "renew" }}
                    >
                      Transfer Membership
                    </Link>
                  </li> */}
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => openTrainerModal(data)}
                    >
                      {data.trainer_id ? "Change Trainer" : "Assign Trainer"}
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          ),
        };
      }),
  };

const handleSearch = () => {
  setSearchFieldText(searchField);
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
                      controlId="floatingInput"
                      label="Search by Name, Membership ID or Mobile Number"
                      className="mb-3"
                      style={{ fontSize: "15px" }}
                    >
                      <Form.Control
                        type="text"
                        placeholder="name@example.com"
                        value={searchField}
                        onChange={(e) => {
                          setSearchField(e.target.value);
                        }}
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
                </Row>
              </Form>
            </Col>
            <Col lg={12}>
              <Table
                size="small"
                bordered={true}
                striped
                scroll={{ x: 400, y: 1000 }}
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
              // onChange={onChange}/
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
              .map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name} - {t.staff_code}
                </option>
              ))}
          </Form.Select>
        </FloatingLabel>
      </Modal>
    </>
  );
}

export default MembershipList;
