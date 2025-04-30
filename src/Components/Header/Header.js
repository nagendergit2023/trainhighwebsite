import React, { useEffect, useState } from "react";
import {
  Navbar,
  Nav,
  Offcanvas,
  Container,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import image1 from "../../assets/images/train_high_gym_logo.png";
import "./Header.css";

function Header() {
  const [scroll, setScroll] = useState(false);
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 300 );
    });
  }, []);

  const handleClose = () => setShowOffcanvas(false);
  const handleShow = () => setShowOffcanvas(true);

  return (
    <Navbar
      expand="lg"
      data-bs-theme="dark"
      className={scroll ? "py-0 sticky-top shadow bg-black" : "py-0 bg-black"}
      style={{ transition: "all 0.3s ease-in-out" }}
    >
      <Container>
        <Navbar.Brand href="/">
          <img src={image1} className="navbar-logo" alt="Logo" />
        </Navbar.Brand>
        <Navbar.Toggle onClick={handleShow} />
        <Navbar.Offcanvas
          show={showOffcanvas}
          onHide={handleClose}
          placement="end"
          className="text-bg-dark"
        >
          <Offcanvas.Header closeButton className="btn-close-light">
            <Offcanvas.Title className="text-uppercase">Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3 text-uppercase fw-bold">
              <Link to="/trainings" className="nav-link px-3 mx-2 py-lg-0 py-3" onClick={handleClose}>
                Trainings
              </Link>
              <Link to="/why-to-join" className="nav-link px-3 mx-2 py-lg-0 py-3" onClick={handleClose}>
                Why to Join
              </Link>
              <Link to="/events" className="nav-link px-3 mx-2 py-lg-0 py-3" onClick={handleClose}>
                Events
              </Link>
              <Link to="/franchise" className="nav-link px-3 mx-2 py-lg-0 py-3" onClick={handleClose}>
              Franchise
              </Link>
              <Link to="/careers" className="nav-link px-3 mx-2 py-lg-0 py-3" onClick={handleClose}>
                Careers
              </Link>
              <Link to="/contact-us" className="nav-link px-3 mx-2 py-lg-0 py-3" onClick={handleClose}>
                Contact Us
              </Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default Header;
