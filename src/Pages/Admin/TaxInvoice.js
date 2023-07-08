import React from 'react'
import { Col, Container, Row, Table } from "react-bootstrap";
import TrainHighGymLogo from "../../assets/images/train_high_gym_logo.png";

function TaxInvoice() {
  return (
    <section className="py-5 inner-section">
        <Container>
            <Row className="border">
                <Col className="mt-3">
                <img src={TrainHighGymLogo} className="w-25" />
                </Col>
                <Col className="mt-3 text-end">
                <h4 className="fw-bold mb-2">INVOICE</h4>
                <p className="mb-2">GSTIN - </p>
                <p className="mb-2">Invoice Date - </p>
                <p className="mb-2">Invoice Number - </p>
                </Col>
                <Col lg={12}>
                <hr/>
                </Col>
                <Col lg={12}> 
                <p className="mb-2"><span className="d-inline-block fw-bold" style={{width: "150px"}}>Membership ID</span>{" "}-{" "}</p>               
                <p className="mb-2"><span className="d-inline-block fw-bold" style={{width: "150px"}}>Name</span>{" "}-{" "}</p>
                <p className="mb-2"><span className="d-inline-block fw-bold" style={{width: "150px"}}>Address</span>{" "}-{" "}</p>
                <p className="mb-2"><span className="d-inline-block fw-bold" style={{width: "150px"}}>Mobile</span>{" "}-{" "}</p>
                <p className="mb-2"><span className="d-inline-block fw-bold" style={{width: "150px"}}>E-mail</span>{" "}-{" "}</p>
                </Col>
                <Col lg={12}>
                <hr/>
                </Col>
                <Col lg={12}>
                    <p className="fw-bold text-center">Payment Summary</p>
                    <Table striped>
                    <tbody>
                        <tr>
                            <td>Subtotal</td>
                            <td className="text-end fw-bold">Rs.{" "}<span>9000.00</span></td>
                        </tr>
                        <tr>
                            <td>SGST 5%</td>
                            <td className="text-end fw-bold">Rs.{" "}<span>500.00</span></td>
                        </tr>
                        <tr>
                        <td>CGST 5%</td>
                            <td className="text-end fw-bold">Rs.{" "}<span>500.00</span></td>
                        </tr>
                        <tr>
                            <td className="fw-bold">Total</td>
                            <td className="text-end fw-bold">Rs.{" "}<span>10000.00</span></td>
                        </tr>
                        </tbody>
                    </Table>
                </Col>
                <Col lg={12} className="mt-3">
                    <p className="small">This is a computer generated invoice no signature required.</p>
                </Col>
            </Row>
        </Container>
    </section>
  )
}

export default TaxInvoice