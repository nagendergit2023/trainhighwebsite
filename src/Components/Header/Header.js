import React, { useEffect, useState } from "react";
import {
  Navbar,
  Nav,
  Offcanvas,
  Container,
  NavDropdown,
} from "react-bootstrap";
import { Link } from "react-router-dom";
// import { GrUserAdmin } from "react-icons/gr";
import image1 from "../../assets/images/train_high_gym_logo.png";

function Header() {
  const [scroll, setScroll] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 100);
    });
  }, []);
  return (
    <Navbar
      expand="lg"
      data-bs-theme="dark"
      className={
        scroll
          ? "py-lg-3 fixed-top shadow bg-black "
          : "fixed-top py-lg-3 bg-transparent"
      }
    >
      <Container>
        <Navbar.Brand href="/">
          <img src={image1} className="navbar-logo" />
        </Navbar.Brand>
        {/* <Navbar.Toggle /> */}
        {/* <Navbar.Offcanvas id="" placement="end">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="">Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Link to="/home" className="nav-link px-3 mx-2">
                Home
              </Link>
              <Link to="/about-us" className="nav-link px-3 mx-2">
                About Us
              </Link>
              <NavDropdown title="Trainings" id="collasible-nav-dropdown">
                <NavDropdown.Item href="/boxing-training">
                  Boxing
                </NavDropdown.Item>
                <NavDropdown.Item href="/crossfit-training">
                  Crossfit
                </NavDropdown.Item>
                <NavDropdown.Item href="/cardio-training">
                  Cardio
                </NavDropdown.Item>
                <NavDropdown.Item href="/strength-training">
                  Strength
                </NavDropdown.Item>
              </NavDropdown>
              <Link to="/careers" className="nav-link px-3 mx-2">
                Careers
              </Link>
              <Link to="/contact-us" className="nav-link px-3 mx-2">
                Contact Us
              </Link>
              <Link
                to="/login"
                className="nav-link mx-4 text-white rounded border-0"
                title="Admin Login"
              >
                <GrUserAdmin className="admin-icon me-0" />
              </Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas> */}
      </Container>
    </Navbar>
  );
}

export default Header;
