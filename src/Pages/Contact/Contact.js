import React from 'react'
import Col from 'react-bootstrap/esm/Col'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/esm/Row'
import Hero from './../../Components/Hero/Hero';

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
  )
}

export default Contact