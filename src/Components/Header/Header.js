import React from 'react';
import { Navbar, Nav, Offcanvas, Container } from 'react-bootstrap';
import { Link } from "react-router-dom";

function Header() {
  return (
        <Navbar expand="lg" bg="dark" data-bs-theme="dark" className="shadow sticky-top py-lg-3">
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
                  <Link to="/services" className="nav-link px-3 mx-2">Services</Link>
                  <Link to="/contact-us" className="nav-link px-3 mx-2">Contact Us</Link>
                  <Link to="/login" className="nav-link px-3 mx-2">Admin</Link>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
  )
}

export default Header;