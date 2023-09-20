import React, { useEffect } from "react";
import { Col, Container, Row, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
// import { AiOutlineUnorderedList, AiOutlineUserAdd } from "react-icons/ai";
import Hero from "../../Components/Hero/Hero.js";

function Admin() {
  return (
    <>
      <Hero />
      <section className="py-5 inner-section">
        <Container>
          <Row className="justify-content-center align-items-center">
            <Col lg={3}>
              <Link to="/membership-list" className="text-decoration-none">
                <Card className="text-center shadow mb-3 mb-lg-0">
                  <Card.Body>
                    {/* <AiOutlineUnorderedList className="card-icon" /> */}
                    <Card.Title className="text-capitalize mb-0">
                      view all
                    </Card.Title>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
            <Col lg={3}>
              <Link to="/new-membership" className="text-decoration-none">
                <Card className="text-center shadow">
                  <Card.Body>
                    {/* <AiOutlineUserAdd className="card-icon" /> */}
                    <Card.Title className="text-capitalize mb-0">
                      new membership
                    </Card.Title>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default Admin;
