import React from 'react';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';

function About() {
  return (
    <section className="py-lg-5 py-3">
      <Container>
        <Row className="justify-content-center ">
          <Col lg={6}>
           
          </Col>
          <Col lg={6}>
            <div className="mb-2">
            <p className="text-capitalize mb-0 fw-bold">our story</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eget augue.</p>
            </div>
            <div className="mb-2">
            <p className="text-capitalize mb-0 fw-bold">our mission</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eget augue.</p>
            </div>
            <div className="mb-2">
            <p className="text-capitalize mb-0 fw-bold">equipment</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eget augue.</p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default About;