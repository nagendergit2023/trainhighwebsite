import React, { useEffect, useState } from "react";
import { Col, Container, Row, Button, Offcanvas, Form } from "react-bootstrap";
import "./HeroMain.css";
import FranchiseVideo from "../../assets/images/FranchiseVideo.mp4";
import FranchiseVideoPoster from "../../assets/images/franchise_image.jpg"

function HeroMain() {
  const [show, setShow] = useState(false);
  const [displayed, setDisplayed] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const text = "Elevate Fitness, Expand Your Business";

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

  const smoothScrollTo = (targetId, duration = 1600, offset = 0) => {
  const target = document.getElementById(targetId);
  if (!target) return;

  const targetPosition =
    target.getBoundingClientRect().top + window.pageYOffset - offset;

  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;

  let startTime = null;

  const easeInOut = (t) => {
    return t < 0.5
      ? 2 * t * t
      : 1 - Math.pow(-2 * t + 2, 2) / 2;
  };

  const animation = (currentTime) => {
    if (!startTime) startTime = currentTime;

    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);

    const run = startPosition + distance * easeInOut(progress);
    window.scrollTo(0, run);

    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  };

  requestAnimationFrame(animation);
};

useEffect(() => {
  const video = document.querySelector(".hero-bg-video");
  video?.play().catch(() => {});
}, []);

  return (
    <div className="hero-section-main-franchise">
    <video className="hero-bg-video"
        autoplay="autoplay"
        muted
        loop
        playsinline
        preload="">
        <source src={FranchiseVideo} type="video/mp4" />
    </video>
      <Container className="hero-content">
        <Row className="justify-content-center">
          <Col lg={12} className="text-center position-relative">
            <h2 className="section-title">
              {displayed}
              <span className="cursor">|</span>
            </h2>
            <h5 className="my-4">
              Invest in Train High Gym franchise and bring elite fitness to your community!
            </h5>
            <a
              className="btn btn-rounded-pill border btn-lg"
              onClick={() => smoothScrollTo("franchiseDetails", 1800, 100)}
            >
              Own a Train High Gym
            </a>
          </Col>
        </Row>
      </Container>

      {/* Offcanvas Component */}
      {/* <Offcanvas
        show={show}
        onHide={handleClose}
        placement="end"
        className="bg-dark text-white"
      >
        <Offcanvas.Header
          closeButton
          className="btn-close-light"
          closeVariant="white"
        >
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

            <Button
              type="submit"
              className="btn btn-dark btn-rounded-pill border btn-lg"
            >
              Submit
            </Button>
          </Form>
        </Offcanvas.Body>
      </Offcanvas> */}
    </div>
  );
}

export default HeroMain;
