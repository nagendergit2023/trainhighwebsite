import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row, Button, Badge } from "react-bootstrap";
import GetApiCall from "../../helpers/GetApi";
import moment from "moment";
import noimage from "../../assets/images/No_Image_Available.jpg";
import { useNavigate } from "react-router-dom";
import Hero from "../../Components/Hero/Hero";

const TrainerMembersList = () => {
  const [members, setMembers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    GetApiCall.getRequest("GetMemberList")
      .then((res) => res.json())
      .then((data) => setMembers(data.data || []));
  }, []);

  return (
    <>
      <section className="inner-section pb-5">
        <Container>
          <h2 class="weekly-title text-center">My Clients</h2>
          <Row>
            {members.map((member) => (
              <Col lg={4} md={6} sm={12} key={member.fld_id} className="mb-4">
                <Card className="h-100 shadow-sm border-0 d-flex">
                  <Row className="g-0">
                    {/* <Col xs={4}>
                    <Card.Img
                    variant="top"
                    src={member.fld_image || noimage}
                    style={{
                      height: "220px",
                      objectFit: "cover",
                    }}
                  />
                    </Col> */}
                    <Col xs={12}>
                      <Card.Body>
                        <h5 className="fw-bold d-flex justify-content-between">
                          <span>{member.fld_name}</span>
                          <Badge pill bg={member.fld_status !== "Active" ? "danger" : "success"} className="">{member.fld_status}</Badge>
                        </h5>
                        {/* <p className="mb-1 text-muted">
                      📞 {member.fld_mobile_number}                      
                    </p> */}
                        {/* <p className="mb-1">
                      🏷 Membership: <strong>{member.fld_status}</strong>
                    </p> */}
                        {/* <p className="mb-2">
                      ⏳ Valid Till: {moment(member.fld_end_date).format("ll")}
                    </p> */}

                        <Row>
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
                              View Attendance
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
                         
                        </Row>
                      </Card.Body>
                    </Col>
                  </Row>
                </Card>
              </Col>
            ))}

            {members.length === 0 && (
              <p className="text-muted text-center">No members assigned yet</p>
            )}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default TrainerMembersList;
