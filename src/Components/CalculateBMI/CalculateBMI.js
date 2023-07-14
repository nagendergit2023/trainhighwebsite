import React from 'react'
import { Button, Col, Container, FloatingLabel, Form, Row, Table } from "react-bootstrap"

function CalculateBMI() {
  return (
    <section className="py-lg-5 py-3">
      <Container>
        <Row className="justify-content-center ">
          <Col lg={6}>
            <h2 className="section-title">calculate your BMI</h2>
            <p className="text-center px-lg-5 px-2 mb-5">Lorem ipsum dolor sit amet, consectetur adipiscing elit, orbi egestas lacus ac suscipit ovallis.</p>
          </Col>
        </Row>
        <Row>
            <Col lg={6}>
                <Table striped bordered hover>
      <thead>
        <tr>
          <th>BMI</th>
          <th>WEIGHT STATUS</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Below 18.5</td>
          <td>Underweight</td>
        </tr>
        <tr>
          <td>18.5 - 24.9</td>
          <td>Healthy</td>
        </tr>
        <tr>
          <td>25.0 - 29.9</td>
          <td>Overweight</td>
        </tr>
        <tr>
          <td>30.0 - and Above</td>
          <td>Obese</td>
        </tr>
        <tr>
            <td colSpan={2} className="text-center">
            BMR - Body Metabolic Rate / BMI - Body Mass Index
            </td>
        </tr>
      </tbody>
    </Table>
            </Col>
            <Col lg={6}>
                <Form>
                    <Row>
                        <Col lg={6}>
                        <FloatingLabel
        controlId="floatingInput"
        label="Height (in cm)"
        className="mb-3"
      >
        <Form.Control type="text" placeholder="180" />
      </FloatingLabel>
                        </Col>
                        <Col lg={6}>
                        <FloatingLabel controlId="floatingPassword" label="Weight (in kg)" className="mb-3">
        <Form.Control type="text" placeholder="175" />
      </FloatingLabel>
                        </Col>
                        <Col lg={6}>
                        <FloatingLabel controlId="floatingPassword" label="Age" className="mb-3">
        <Form.Control type="text" placeholder="25" />
      </FloatingLabel>
                        </Col>
                        <Col lg={6}>
                        <FloatingLabel
          controlId="floatingSelectGrid"
          label="Gender"
        >
          <Form.Select aria-label="">
            <option value="1">Male</option>
            <option value="2">Female</option>
            <option value="3">Other</option>
          </Form.Select>
        </FloatingLabel>
                        </Col>
                        <Col lg={12}>
                        <FloatingLabel
          controlId="floatingSelectGrid"
          label="Select your activity level"
          className="mb-3"
        >
          <Form.Select aria-label="">
            <option value="1">Light exercise / sports 1 – 3 days/ week</option>
            <option value="2">Little or no Exercise / desk job</option>
            <option value="3">Light exercise / sports 1 – 3 days/ week</option>
            <option value="4">Moderate Exercise, sports 3 – 5 days / week</option>
            <option value="5">Heavy Exercise / sports 6 – 7 days / week</option>
            <option value="6">Very heavy exercise/ physical job / training 2 x / day</option>
          </Form.Select>
        </FloatingLabel>
                        </Col>
                        <Col lg={6}>
                            <Button variant="dark" className="text-capitalize py-lg-2 w-100">
                                calculate
                            </Button>
                        </Col>
                    </Row>
                
      
                </Form>
            </Col>
        </Row>
      </Container>
    </section>
  )
}

export default CalculateBMI