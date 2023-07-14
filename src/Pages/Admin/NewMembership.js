import React, { useState } from 'react'
import { Col, Container, FloatingLabel, Form, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
// import CustomerPhoto from "../../assets/images/customer_photo.png";
import CustomerPhoto from "../../assets/images/train_high_gym_coming_soon_1.webp";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function NewMembership() {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <section className="py-5 inner-section">
      <Container>
        <Row className="justify-content-center align-items-center">
          <Col lg={12}>
            <Form>
              <Row>
                <Col lg={12} className="text-center mb-3">
                <a href="#" className="customer-photo">
                <Image src={CustomerPhoto} thumbnail />
                </a>
                </Col>
                <Col lg={6}>
                <FloatingLabel
        controlId="floatingInput"
        label="Application Number"
        className="mb-3"
      >
        <Form.Control type="text" value="123456789" disabled />
      </FloatingLabel>
                </Col>
                <Col lg={6}>
                <FloatingLabel
        controlId="floatingInput"
        label="Membership Number"
        className="mb-3"
      >
        <Form.Control type="text" value="123456789" disabled />
      </FloatingLabel>
                </Col>
                <Col lg={6}>
                <FloatingLabel
        controlId="floatingInput"
        label="Full Name"
        className="mb-3"
      >
        <Form.Control type="text" placeholder="name@example.com" />
      </FloatingLabel>
                </Col>
                <Col lg={6}>
                <FloatingLabel
        controlId="floatingInput"
        label="Mobile Number"
        className="mb-3"
      >
        <Form.Control type="text" placeholder="name@example.com" />
      </FloatingLabel>
                </Col>
                <Col lg={6}>
                <FloatingLabel
        controlId="floatingInput"
        label="Full Address"
        className="mb-3"
      >
        <Form.Control type="email" placeholder="name@example.com" />
      </FloatingLabel>
                </Col>
                <Col lg={2}>
                <FloatingLabel
        controlId="floatingInput"
        label="Pincode"
        className="mb-3"
      >
        <Form.Control type="text" placeholder="name@example.com" />
      </FloatingLabel>
                </Col>
                <Col lg={2}>
                <FloatingLabel controlId="floatingSelect" label="Select State" className="mb-3">
      <Form.Select aria-label="Floating label select example">
        <option value="1">Delhi</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </Form.Select>
    </FloatingLabel>
                </Col>
                <Col lg={2}>
                <FloatingLabel controlId="floatingSelect" label="Select City" className="mb-3">
      <Form.Select aria-label="Floating label select example">
        <option value="1">New Delhi</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </Form.Select>
    </FloatingLabel>
                </Col>
                
                <Col lg={6}>
                <FloatingLabel controlId="floatingSelect" label="Select Membership" className="mb-3">
      <Form.Select aria-label="Floating label select example">
        <option value="1">1 Month</option>
        <option value="2">3 Months</option>
        <option value="3">6 Month</option>
        <option value="4">12 Month</option>
      </Form.Select>
    </FloatingLabel>
                </Col>
                <Col lg={3}>
                {/* <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /> */}
                <FloatingLabel
        controlId="floatingInput"
        label="Start Date"
        className="mb-3"
      >
        <Form.Control type="text" placeholder="Start Date" />
      </FloatingLabel>
                </Col>
                <Col lg={3}>
                <FloatingLabel
        controlId="floatingInput"
        label="End Date"
        className="mb-3"
      >
        <Form.Control type="text" placeholder="End Date" />
      </FloatingLabel>
                </Col>
                <Col lg={4} className="mx-auto my-4">
                <Link to="/new-membership" className="btn btn-secondary w-100 py-2">Add New Member</Link>
                </Col>
              </Row>
            </Form>
          </Col>
          </Row>
          </Container>
          </section>
  )
}

export default NewMembership;