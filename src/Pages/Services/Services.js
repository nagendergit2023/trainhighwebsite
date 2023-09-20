import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Hero from "../../Components/Hero/Hero.js";

function Services() {
  return (
    <>
      <Hero />
      <section>
        <Container>
          <Row>
            <Col lg={12}>
              <h1>Services</h1>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default Services;
