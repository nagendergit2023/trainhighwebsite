import React from 'react';
import { Col, Container, Row } from "react-bootstrap";
import HeadOffice from "../../assets/images/head_office_icon.jpg";
import CallUs from "../../assets/images/call_us_icon.jpg";
import EmailUs from "../../assets/images/email_us_icon.jpg";

function ContactInfo({ address, contact, email }) {
  return (
    <section>
      <Container>
        <Row>
          <Col lg={4} className="text-center my-4">
            <img src={HeadOffice} className="w-25" />
            <h4 className="my-2">
              <strong>Address</strong>
            </h4>
            <p>
              {address}
            </p>
          </Col>
          <Col lg={4} className="text-center my-4">
            <img src={CallUs} className="w-25" />
            <h4 className="my-2">
              <strong>Contact</strong>
            </h4>
            <p>{contact}</p>
          </Col>
          <Col lg={4} className="text-center my-4">
            <img src={EmailUs} className="w-25" />
            <h4 className="my-2">
              <strong>E-mail</strong>
            </h4>
            <p>{email}</p>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default ContactInfo;