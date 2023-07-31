import React from 'react';
import { Col, Container, Row } from "react-bootstrap";
import './Hero.css';

function Hero() {
  return (
    <div className="hero-section">
        <Container>
            <Row>
                <Col lg={12} className="text-center position-relative ">
                    <h2>Page Name</h2>
                </Col>
            </Row>
        </Container>
        </div>
  )
}

export default Hero