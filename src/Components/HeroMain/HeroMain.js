import React, { useEffect, useState } from "react";
import { Col, Container, Row, Button, Offcanvas, Form } from "react-bootstrap";
import "./HeroMain.css";

function HeroMain() {
  const [show, setShow] = useState(false);
  const [displayed, setDisplayed] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const text = "one day free trial";

   useEffect(() => {
    let i = 0;

    function startTyping() {
      setDisplayed(""); // clear text first
      i = 0;

      const typingInterval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1));
        i++;

        if (i === text.length) {
          clearInterval(typingInterval);
        }
      }, 70); // typing speed
    }

    // Start initial typing
    startTyping();

    // Restart typing every 20 seconds (20000 ms)
    const restartInterval = setInterval(() => {
      startTyping();
    }, 20000);

    return () => clearInterval(restartInterval);
  }, []);

  return (
    <div className="hero-section-main">
      <Container>
        <Row className="justify-content-center">
          <Col lg={7} className="text-center position-relative">
            <h2 className="section-title">
              {displayed}
              <span className="cursor">|</span>
              </h2>
            <h5 className="my-4">
              Take your time to get to know Train High Gym. The pass is FREE, and we would love to show you around our Gym!
            </h5>
            <a className="btn btn-rounded-pill border btn-lg" onClick={handleShow}>
              Get Your Pass
            </a>
          </Col>
        </Row>
      </Container>

      {/* Offcanvas Component */}
      <Offcanvas show={show} onHide={handleClose} placement="end" className="bg-dark text-white">
        <Offcanvas.Header closeButton className="btn-close-light" closeVariant="white">
          <Offcanvas.Title></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <h4 className="mt-5">Get Your Free Pass</h4>
          <p>Fill in your details to claim your free trial pass.</p>
          <Form>
            <Form.Group className="mb-3 text-dark" controlId="formName">
              <Form.FloatingLabel label="Name">
                <Form.Control type="text" placeholder="Enter your name" />
              </Form.FloatingLabel>
            </Form.Group>
            
            <Form.Group className="mb-3 text-dark" controlId="formMobile">
              <Form.FloatingLabel label="Mobile">
                <Form.Control type="text" placeholder="Enter your mobile" />
              </Form.FloatingLabel>
            </Form.Group>
            
            <Button type="submit" className="btn btn-dark btn-rounded-pill border btn-lg">
              Submit
            </Button>
            </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default HeroMain;