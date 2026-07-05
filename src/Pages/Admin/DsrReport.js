import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

function DsrReport() {
    return (
        <>
            <section className="pb-5 inner-section">
                <Container>
                    <Row className="justify-content-center mb-3">
                        <Col lg={9}>
                            <h2 className="section-title">Daily Sales Report</h2>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default DsrReport