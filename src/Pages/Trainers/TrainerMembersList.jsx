import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row, Badge } from "react-bootstrap";
import GetApiCall from "../../helpers/GetApi";
import noimage from "../../assets/images/No_Image_Available.jpg";
import { Link, useNavigate } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";
import "./Members.css";

const TrainerMembersList = () => {
  const [members, setMembers] = useState([]);
  const navigate = useNavigate();
  let localdata = localStorage.getItem("user");
  let user = JSON.parse(localdata);
  useEffect(() => {
    GetApiCall.getRequest(`GetMemberList?trainerId=${user?.staffId}`)
      .then((res) => res.json())
      .then((data) => setMembers(data.data || []));
  }, []);

  return (
    <>
      <Container className="mb-5 mt-3">
        <h2 className="weekly-title mb-4 text-center">My Clients</h2>
        <Row>
          {members.map((member) => (
            <Col lg={4} md={6} sm={12} key={member.fld_id} className="mb-3">
              <Card className="h-100 border-1 d-flex">
                <Card.Body>
                  <div className="fw-bold d-flex justify-content-between align-items-center">
                    <div className="d-flex justify-content-start align-items-center gap-3">
                      <Card.Img
                        variant="top"
                        src={member.fld_image || noimage}
                        className="rounded-circle client-profile-img"
                      />
                      <span>
                        <h5 className="d-block fw-bold">{member.fld_name}</h5>
                        <Badge
                          pill
                          bg={
                            member.fld_status !== "Active"
                              ? "danger"
                              : "success"
                          }
                          className=""
                        >
                          {member.fld_status}
                        </Badge>
                      </span>
                    </div>
                    <span>
                      <div className="dropdown">
                        <button
                          className="dropdown-toggle"
                          type="button"
                          id="dropdownMenuButton1"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <BsThreeDots />
                        </button>
                        <ul
                          className="dropdown-menu"
                          aria-labelledby="dropdownMenuButton1"
                        >
                          <li>
                            <Link
                              className="dropdown-item"
                              to={`/trainers/member/${member.fld_id}/attendance`}
                              state={member}
                            >
                              Attendence
                            </Link>
                          </li>
                          <li>
                            <Link
                              className="dropdown-item"
                              to={`/trainers/member/${member.fld_id}/plans`}
                              state={member}
                            >
                              Manage
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </span>
                  </div>
                  {/* <p className="mb-1 text-muted">
                      📞 {member.fld_mobile_number}                      
                    </p> */}
                  {/* <p className="mb-1">
                      🏷 Membership: <strong>{member.fld_status}</strong>
                    </p> */}
                  {/* <p className="mb-2">
                      ⏳ Valid Till: {moment(member.fld_end_date).format("ll")}
                    </p> */}

                  {/* <Row>
                          <Col xs={6}>
                            <Button
                              className="w-100"
                              variant="outline-secondary"
                              onClick={() =>
                                navigate(
                                  `/trainers/member/${member.fld_id}/attendance`
                                )
                              }
                            >
                              Attendance
                            </Button>
                          </Col>
                          <Col xs={6}>
                            <Button
                              className="w-100"
                              variant="warning"
                              onClick={() =>
                                navigate(`/trainers/member/${member.fld_id}/plans`, {
                                  state: member,
                                })
                              }
                            >
                              Manage
                            </Button>
                          </Col>

                        </Row> */}
                </Card.Body>
              </Card>
            </Col>
          ))}

          {members.length === 0 && (
            <p className="text-muted text-center">No members assigned yet</p>
          )}
        </Row>
      </Container>
    </>
  );
};

export default TrainerMembersList;
