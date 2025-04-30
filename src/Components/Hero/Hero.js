import React from "react";
import { useLocation } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import "./Hero.css";

function Hero() {
  const location = useLocation();
  return (
    <div className="hero-section">
      <Container>
        <Row>
          <Col lg={12} className="text-center position-relative ">
            <h2 className="text-capitalize">
              {location.pathname.replace("/", "").replace(/-/g, " ")}
            </h2>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Hero;
