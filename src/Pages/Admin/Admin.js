import { Col, Container, Row, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import user from "../../assets/images/user_5397249.png";
import dashboard from "../../assets/images/dashboard_5397249.png";
import enquiry from "../../assets/images/question_4774995.png";
import addClasses from "../../assets/images/classes_5397250.png";
import staff from "../../assets/images/staff_5397249.png";
import attendence from "../../assets/images/attendence_5397249.png";
import dsr from "../../assets/images/dsr_5397251.png";

function Admin() {
  const userData =
    localStorage.getItem("user") && JSON.parse(localStorage.getItem("user"));
  const userRole = String(userData?.role || "").toUpperCase();
  const userBranchId = userData?.branch_id || userData?.fld_branch_id || "";
  const canViewStaff = userRole === "SUPER ADMIN" || userRole === "ADMIN";
  const canViewAllBranches = userRole === "SUPER ADMIN";
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
          <Row className="justify-content-start align-items-center">
            {canViewStaff && (
              <Col lg={3} md={6} sm={6} xs={6} className="mb-3">
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
            )}
            <Col lg={3} md={6} sm={6} xs={6} className="mb-3">
              <Link to="/membership-list" className="text-decoration-none">
                <Card className="text-center border-0 mb-3 mb-lg-0">
                  <Card.Body>
                    <img alt="" src={user} className="w-lg-50 w-sm-100 mb-2" />
                    <Card.Title className="text-capitalize mb-0 h6">
                      members
                    </Card.Title>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
            <Col lg={3} md={6} sm={6} xs={6} className="mb-3">
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

            <Col lg={3} md={6} sm={6} xs={6} className="mb-3">
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
            {canViewStaff && (
              <Col lg={3} md={6} sm={6} xs={6} className="mb-3">
                <Link to="/staff-list" className="text-decoration-none">
                  <Card className="text-center border-0 mb-3 mb-lg-0">
                    <Card.Body>
                      <img
                        alt=""
                        src={staff}
                        className="w-lg-50 w-sm-100 mb-2"
                      />
                      <Card.Title className="text-capitalize mb-0 h6">
                        staff
                      </Card.Title>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            )}

            <Col lg={3} md={6} sm={6} xs={6} className="mb-3">
              <Link to="/attendence" className="text-decoration-none">
                <Card className="text-center border-0 mb-3 mb-lg-0">
                  <Card.Body>
                    <img
                      alt=""
                      src={attendence}
                      className="w-lg-50 w-sm-100 mb-2"
                    />
                    <Card.Title className="text-capitalize mb-0 h6">
                      attendence
                    </Card.Title>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
            {canViewAllBranches && (
              <Col lg={3} md={6} sm={6} xs={6} className="mb-3">
                <Link to="/dsr-report" className="text-decoration-none">
                  <Card className="text-center border-0 mb-3 mb-lg-0">
                    <Card.Body>
                      <img alt="" src={dsr} className="w-lg-50 w-sm-100 mb-2" />
                      <Card.Title className="text-capitalize mb-0 h6">
                        Daily Sales Report
                      </Card.Title>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            )}
          </Row>
        </Container>
      </section>
    </>
  );
}

export default Admin;
