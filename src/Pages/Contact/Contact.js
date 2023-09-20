import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Hero from "./../../Components/Hero/Hero.js";

function Contact() {
  return (
    <>
      <Hero />
      <section>
        <Container>
          <Row>
            <Col lg={12}>
              <h1>Contact</h1>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default Contact;
