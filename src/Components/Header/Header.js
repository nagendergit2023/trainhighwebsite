import React from 'react';
import { Navbar, Nav, Offcanvas, Container } from 'react-bootstrap';

function Header() {
  return (
        <Navbar expand="lg" className="bg-light shadow sticky-top">
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
                  <Nav.Link href="/" className="px-3 mx-2">Home</Nav.Link>
                  <Nav.Link href="/about-us" className="px-3 mx-2">About Us</Nav.Link>
                  <Nav.Link href="/services" className="px-3 mx-2">Services</Nav.Link>
                  <Nav.Link href="/contact-us" className="px-3 mx-2">Contact Us</Nav.Link>
                  <Nav.Link href="/admin-panel" className="px-3 mx-2">Admin</Nav.Link>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
  )
}

export default Header;