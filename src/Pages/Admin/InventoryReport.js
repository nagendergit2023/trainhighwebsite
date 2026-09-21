import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

function InventoryReport() {
    return (
        <>
            <section className="pb-5 inner-section">
                <Container>
                    <Row className="justify-content-center mb-3">
                        <Col lg={9}>
                            <h2 className="section-title">Inventory Report</h2>
                            <p className="text-muted text-center">
                                Manage and monitor your inventory efficiently.
                            </p>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default InventoryReport