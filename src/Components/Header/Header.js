import React from 'react';
import { Navbar, Nav, Offcanvas, Container } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { GrUserAdmin } from "react-icons/gr";

function Header() {
  return (
        <Navbar expand="lg" bg="dark" data-bs-theme="dark" className="fixed-top py-lg-3">
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
                  <Link to="/home" className="nav-link px-3 mx-2 fw-bold">Home</Link>
                  <Link to="/about-us" className="nav-link px-3 mx-2 fw-bold">About Us</Link>
                  <Link to="/training" className="nav-link px-3 mx-2 fw-bold">Training</Link>
                  <Link to="/careers" className="nav-link px-3 mx-2 fw-bold">Careers</Link>
                  <Link to="/contact-us" className="nav-link px-3 mx-2 fw-bold">Contact Us</Link>
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