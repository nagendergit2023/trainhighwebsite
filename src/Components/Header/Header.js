import React, { useEffect, useState } from "react";
import {
  Navbar,
  Nav,
  Offcanvas,
  Container,
  Col,
  NavDropdown,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import image1 from "../../assets/images/train_high_gym_logo.png";
import "./Header.css";
import {
  BiLogoFacebook,
  BiLogoInstagram,
  BiLogoLinkedin,
} from "react-icons/bi";
import { AiOutlineYoutube } from "react-icons/ai";
import { Dropdown } from "bootstrap/dist/js/bootstrap.bundle.min";
import { FaBars, FaChevronDown, FaUser, FaUserAlt, FaUserCircle } from "react-icons/fa";

function Header() {
  const userData =
    localStorage.getItem("user") && JSON.parse(localStorage.getItem("user"));
  const userRole = String(userData?.role || "").toUpperCase();
  const userBranchId = userData?.branch_id || userData?.fld_branch_id || "";
  const canViewStaff = userRole === "SUPER ADMIN" || userRole === "ADMIN";
  const canViewAllBranches = userRole === "SUPER ADMIN";
  const [scroll, setScroll] = useState(false);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [showOffcanvasUser, setShowOffcanvasUser] = useState(false);
  const [visible, setVisible] = useState(true); // 👈 Track navbar visibility

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    // setUser(null);
    window.location.href = "/login";
  };

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Add shadow and sticky style
      if (currentScrollY > 0 && !scroll) {
        setScroll(true);
      } else if (currentScrollY <= 0 && scroll) {
        setScroll(false);
      }

      // 👇 Hide navbar when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 0) {
        // scrolling down
        setVisible(false);
      } else {
        // scrolling up
        setVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [scroll]);

  const handleClose = () => setShowOffcanvas(false);
  const handleShow = () => setShowOffcanvas(true);
  const handleCloseUser = () => setShowOffcanvasUser(false);
  const handleShowUser = () => setShowOffcanvasUser(true);

  return (
    <Navbar
      expand="lg"
      data-bs-theme="dark"
      className={`py-0 bg-black ${scroll ? "shadow sticky-top" : ""} ${visible ? "navbar-show" : "navbar-hide"
        }`} // 👈 Toggle visibility classes
      style={{
        transition:
          "transform 0.3s ease-in-out, background-color 0.3s ease-in-out",
      }}
    >
      <Container>
        <Navbar.Brand href="/">
          <img src={image1} className="navbar-logo" alt="Logo" />
        </Navbar.Brand>
        <div className="d-flex">
          <Navbar.Toggle onClick={handleShowUser}>
            <FaUserCircle size={34} />
          </Navbar.Toggle>
          <Navbar.Toggle onClick={handleShow}>
            <FaBars size={34} />
          </Navbar.Toggle>
        </div>
        <Navbar.Offcanvas
          show={showOffcanvas}
          onHide={handleClose}
          placement="end"
          className="text-bg-dark"
        >
          <Offcanvas.Header
            closeButton
            className="btn-close-light"
            closeVariant="white"
          >
            <Offcanvas.Title className="text-uppercase">Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3 text-uppercase fw-bold">
              <Link
                to="/trainings"
                className="nav-link py-lg-0 py-3"
                onClick={handleClose}
              >
                Trainings
              </Link>
              <Link
                to="/why-to-join"
                className="nav-link py-lg-0 py-3"
                onClick={handleClose}
              >
                Why to Join
              </Link>
              <Link
                to="/events"
                className="nav-link py-lg-0 py-3"
                onClick={handleClose}
              >
                Events
              </Link>
              <Link
                to="/franchise"
                className="nav-link py-lg-0 py-3"
                onClick={handleClose}
              >
                Franchise
              </Link>
              <a
                href="mailto:trainhighgym@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link py-lg-0 py-3"
                onClick={handleClose}
              >
                Careers
              </a>
              <Link
                to="/contact-us"
                className="nav-link py-lg-0 py-3"
                onClick={handleClose}
              >
                Contact Us
              </Link>

              {/* Mobile Login Button */}
              {/* <Link
                to="/login"
                className="d-flex d-lg-none nav-link px-3 mx-2 py-lg-0 py-3"
                onClick={handleClose}
              >
                Login
              </Link> */}
              <Col lg={12} className="pt-4 d-lg-none d-block">
                <p className="fw-bold">FOLLOW US</p>
                <ul className="list-inline mt-0 mb-0">
                  <li className="list-inline-item">
                    <a
                      className="btn btn-white btn-sm shadow px-2 text-instagram bg-dark social-icon-wrap"
                      href="https://instagram.com/trainhighgym?igshid=NjIwNzIyMDk2Mg=="
                      target="_blank"
                    >
                      <BiLogoInstagram className="social-icon text-white" />
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a
                      className="btn btn-white btn-sm shadow px-2 text-linkedin bg-dark social-icon-wrap"
                      href="https://in.linkedin.com/in/train-high-gym-266a86370"
                      target="_blank"
                    >
                      <BiLogoLinkedin className="social-icon text-white" />
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a
                      className="btn btn-white btn-sm shadow px-2 text-linkedin bg-dark social-icon-wrap"
                      href="https://www.youtube.com/@TrainHighGym"
                      target="_blank"
                    >
                      <AiOutlineYoutube className="social-icon text-white" />
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a
                      className="btn btn-white btn-sm shadow px-2 text-facebook bg-dark social-icon-wrap"
                      href="https://www.facebook.com/p/TRAIN-HIGH-GYM-61550363817019/"
                      target="_blank"
                    >
                      <BiLogoFacebook className="social-icon text-white" />
                    </a>
                  </li>
                </ul>
              </Col>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
        <Navbar.Offcanvas
          show={showOffcanvasUser}
          onHide={handleCloseUser}
          placement="end"
          className="text-bg-dark d-lg-none d-block"
        >
          <Offcanvas.Header
            closeButton
            className="btn-close-light"
            closeVariant="white"
          >
            <Offcanvas.Title className="text-uppercase">{userRole}</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="flex-column text-uppercase fw-bold">
              {userData ? (
                <>
                  <h2 className="py-2 fw-bold border-bottom" onClick={handleCloseUser}>
                    THG-Janakpuri
                  </h2>

                  <Nav.Link as={Link} to="/admin-panel" onClick={handleCloseUser}>
                    Admin Panel
                  </Nav.Link>

                  {canViewStaff && (
                    <Nav.Link as={Link} to="/dashboard" onClick={handleCloseUser}>
                      Dashboard
                    </Nav.Link>
                  )}

                  <Nav.Link as={Link} to="/membership-list" onClick={handleCloseUser}>
                    Members
                  </Nav.Link>

                  <Nav.Link as={Link} to="/batches" onClick={handleCloseUser}>
                    Batches & Classes
                  </Nav.Link>

                  <Nav.Link as={Link} to="/enquiry-list" onClick={handleCloseUser}>
                    Enquiry
                  </Nav.Link>

                  {canViewStaff && (
                    <Nav.Link as={Link} to="/staff-list" onClick={handleCloseUser}>
                      Staff
                    </Nav.Link>
                  )}

                  <Nav.Link as={Link} to="/attendence" onClick={handleCloseUser}>
                    Attendance
                  </Nav.Link>

                  {canViewAllBranches && (
                    <Nav.Link as={Link} to="/dsr-report" onClick={handleCloseUser}>
                      Daily Sales Report
                    </Nav.Link>
                  )}

                  <hr />

                  <Nav.Link
                    onClick={handleLogout}
                    className="text-danger"
                    style={{ cursor: "pointer" }}
                  >
                    Logout
                  </Nav.Link>
                </>
              ) : (
                <Link
                  to="/login"
                  className="btn btn-outline-light ms-3 px-4 py-2 fw-bold"
                  style={{ borderRadius: "30px" }}
                >
                  Login
                </Link>
              )}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
        {/* Desktop Login Button */}
        <div className="d-none d-lg-flex ms-auto">
          {userData ? (
            <Nav>
              <NavDropdown
                title={
                  <>
                    THG-Janakpuri <FaChevronDown size={12} className="ms-1" />
                  </>
                }
                id="user-dropdown"
                align="end"
                className="btn border"
                style={{ borderRadius: "30px" }}
              >
                <NavDropdown.Item as={Link} to="/admin-panel">
                  Admin Panel
                </NavDropdown.Item>
                {canViewStaff && (
                  <NavDropdown.Item as={Link} to="/dashboard">
                    Dashboard
                  </NavDropdown.Item>
                )}
                <NavDropdown.Item as={Link} to="/membership-list">
                  Members
                </NavDropdown.Item>

                <NavDropdown.Item as={Link} to="/batches">
                  Batches & Classes
                </NavDropdown.Item>

                <NavDropdown.Item as={Link} to="/enquiry-list">
                  Enquiry
                </NavDropdown.Item>
                {canViewStaff && (
                  <NavDropdown.Item as={Link} to="/staff-list">
                    Staff
                  </NavDropdown.Item>
                )}
                <NavDropdown.Item as={Link} to="/attendence">
                  Attendence
                </NavDropdown.Item>
                {canViewAllBranches && (
                  <NavDropdown.Item as={Link} to="/dsr-report">
                    Daily Sales Report
                  </NavDropdown.Item>
                )}
                <NavDropdown.Divider />

                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          ) : (
            <Link
              to="/login"
              className="btn btn-outline-light ms-3 px-4 py-2 fw-bold"
              style={{ borderRadius: "30px" }}
            >
              Login
            </Link>
          )}
        </div>
      </Container>
    </Navbar>
  );
}

export default Header;
