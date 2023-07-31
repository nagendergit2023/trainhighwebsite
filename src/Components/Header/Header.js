import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Offcanvas, Container } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { GrUserAdmin } from "react-icons/gr";

function Header() {
  const [scroll, setScroll] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 100);
    });
  }, []); 
  return (
    <Navbar expand="lg" data-bs-theme="dark" className={scroll ? "py-lg-3 fixed-top shadow bg-black " : "fixed-top py-lg-3 bg-transparent"}>
      <Container>
        <Navbar.Brand href="/">Logo</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Offcanvas
          id=""
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="">
              Menu
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Link to="/home" className="nav-link px-3 mx-2">Home</Link>
              <Link to="/about-us" className="nav-link px-3 mx-2">About Us</Link>
              <div class="nav-item show dropdown">
                <Link class="dropdown-toggle nav-link mx-2" to="/training">Training</Link>
                <div class="dropdown-menu">
                  <Link to="/training" class="dropdown-item">Action</Link>
                  <Link to="/training" class="dropdown-item">Another action</Link>
                  <Link to="/training" class="dropdown-item">Something else here</Link>
                  <Link to="/training" class="dropdown-item">Something else here</Link>
                  <Link to="/training" class="dropdown-item">Something else here</Link>
                </div>
              </div>
              <Link to="/careers" className="nav-link px-3 mx-2">Careers</Link>
              <Link to="/contact-us" className="nav-link px-3 mx-2">Contact Us</Link>
              <Link to="/login" className="btn btn-dark px-3 mx-2 border border-light text-white">
                <GrUserAdmin className="admin-icon" />Admin
              </Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  )
}

export default Header;