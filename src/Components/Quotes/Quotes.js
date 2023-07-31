import React from 'react'
import { Col, Container, Row } from "react-bootstrap";

function Quotes() {
  return (
    <section className="py-5 bg-dark text-white">
        <Container>
            <Row className="justify-content-center align-items-center">
                <Col lg={6} className="">
                    <h2 className="text-uppercase text-center">for me exercise is more than just physical - it's therapeutic.</h2>
                </Col>
            </Row>
        </Container>
    </section>

  )
}

export default Quotes;