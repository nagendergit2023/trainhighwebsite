import React from 'react'
import { Col, Container, Row } from "react-bootstrap";
import "./Quotes.css";

function Quotes() {
  return (
    <section className="py-5 bg-dark text-white parallax">
        <Container>
            <Row className="justify-content-center align-items-center">
                <Col lg={12} className="">
                    <h1 className="text-center text-white text-uppercase">"TRAIN HIGH. LIVE HIGH."</h1>
                </Col>
            </Row>
        </Container>
    </section>

  )
}

export default Quotes;