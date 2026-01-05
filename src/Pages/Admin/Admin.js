import { Col, Container, Row, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import user from "../../assets/images/user_5397249.png";
import dashboard from "../../assets/images/dashboard_5397249.png";
import enquiry from "../../assets/images/question_4774995.png";
import addClasses from "../../assets/images/classes_5397250.png";

function Admin() {
  return (
    <>
      {/* <Hero /> */}
      <section className="inner-section">
        <Container>
          <Row className="justify-content-center align-items-center">
            <Col lg={8} className="mb-5">
              <h2 className="section-title">Admin Panel</h2>
              <p className="text-center">
                Centralized control panel to manage membership signup, settings,
                security, and system operations efficiently, reliably, and at
                scale for modern enterprise platforms.
              </p>
            </Col>
          </Row>
        </Container>
        <Container>
          <Row className="justify-content-center align-items-center">
            <Col lg={3} md={6} sm={6} xs={6}>
              <Link to="/dashboard" className="text-decoration-none">
                <Card className="text-center border-0 mb-3 mb-lg-0">
                  <Card.Body>
                    <img
                      alt=""
                      src={dashboard}
                      className="w-lg-50 w-sm-100 mb-2"
                    />
                    <Card.Title className="text-capitalize mb-0 h6">
                      Dashboard
                    </Card.Title>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
            <Col lg={3} md={6} sm={6} xs={6}>
              <Link to="/membership-list" className="text-decoration-none">
                <Card className="text-center border-0 mb-3 mb-lg-0">
                  <Card.Body>
                    <img alt="" src={user} className="w-lg-50 w-sm-100 mb-2" />
                    <Card.Title className="text-capitalize mb-0 h6">
                      members list
                    </Card.Title>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
            <Col lg={3} md={6} sm={6} xs={6}>
              <Link to="/new-membership" className="text-decoration-none">
                <Card className="text-center border-0 mb-3 mb-lg-0">
                  <Card.Body>
                    <img
                      alt=""
                      src={addClasses}
                      className="w-lg-50 w-sm-100 mb-2"
                    />
                    <Card.Title className="text-capitalize mb-0 h6">
                      batches & classes
                    </Card.Title>
                  </Card.Body>
                </Card>
              </Link>
            </Col>

            <Col lg={3} md={6} sm={6} xs={6}>
              <Link to="/enquiry-list" className="text-decoration-none">
                <Card className="text-center border-0 mb-3 mb-lg-0">
                  <Card.Body>
                    <img
                      alt=""
                      src={enquiry}
                      className="w-lg-50 w-sm-100 mb-2"
                    />
                    <Card.Title className="text-capitalize mb-0 h6">
                      enquiry
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
