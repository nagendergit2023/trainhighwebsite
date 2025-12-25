import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row, Button } from "react-bootstrap";
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
      <Hero />
      <section className="py-5 inner-section">
        <Container>
          <h3 className="mb-4 fw-bold">My Members</h3>

          <Row>
            {members.map((member) => (
              <Col lg={4} md={6} sm={12} key={member.fld_id} className="mb-4">
                <Card className="h-100 shadow-sm border-0">
                  <Card.Img
                    variant="top"
                    src={member.fld_image || noimage}
                    style={{
                      height: "220px",
                      objectFit: "cover",
                    }}
                  />

                  <Card.Body>
                    <h5 className="fw-bold">{member.fld_name}</h5>
                    <p className="mb-1 text-muted">
                      📞 {member.fld_mobile_number}
                    </p>
                    <p className="mb-1">
                      🏷 Membership: <strong>{member.fld_status}</strong>
                    </p>
                    <p className="mb-2">
                      ⏳ Valid Till: {moment(member.fld_end_date).format("ll")}
                    </p>

                    <div className="d-grid gap-2">
                      <Button
                        variant="warning"
                        onClick={() =>
                          navigate(`/trainer/member/${member.fld_id}/plans`, {
                            state: member,
                          })
                        }
                      >
                        Manage Workout & Diet
                      </Button>

                      <Button
                        variant="outline-secondary"
                        onClick={() =>
                          navigate(
                            `/trainer/member/${member.fld_id}/attendance`
                          )
                        }
                      >
                        View Attendance
                      </Button>
                    </div>
                  </Card.Body>
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
