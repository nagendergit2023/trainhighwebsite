import React from 'react';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';

function About() {
  return (
    <section>
      <Container>
        <Row>
          <Col lg={12}>
            <h1>About</h1>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default About;