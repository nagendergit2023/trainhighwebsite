import React from 'react';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Hero from "../../Components/Hero/Hero";

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
    
  )
}

export default Services