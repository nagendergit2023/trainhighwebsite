import React from 'react'
import Hero from '../../Components/Hero/Hero';
import { Col, Container, Row } from 'react-bootstrap';

function StaffList() {
    return (
        <>
            <Hero />
            <section className="py-5 inner-section">
                <Container>
                    <Row>
                        <Col lg={12} className="mb-lg-4">
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default StaffList;