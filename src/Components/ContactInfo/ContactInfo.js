import React from 'react';
import { Col, Container, Row } from "react-bootstrap";
import HeadOffice from "../../assets/images/head_office_icon.jpg";
import CallUs from "../../assets/images/call_us_icon.jpg";
import EmailUs from "../../assets/images/email_us_icon.jpg";

function ContactInfo() {
  return (
    <section>
        <Container>
            <Row>
            <Col lg={4} className="text-center my-4">
              <img src={HeadOffice} className="w-25" />
              <h4 className="my-2">
                <strong>Head Office</strong>
              </h4>
              <p>
                A-3/30, Block A3, Janakpuri,
                <br /> New Delhi - 110058
              </p>
            </Col>
            <Col lg={4} className="text-center my-4">
              <img src={CallUs} className="w-25" />
              <h4 className="my-2">
                <strong>Call Us</strong>
              </h4>
              <p>+91-80767 51741</p>
            </Col>
            <Col lg={4} className="text-center my-4">
              <img src={EmailUs} className="w-25" />
              <h4 className="my-2">
                <strong>E-mail Us</strong>
              </h4>
              <p>trainhighgym@gmail.com</p>
            </Col>
          </Row>
        </Container>
    </section>
  )
}

export default ContactInfo;