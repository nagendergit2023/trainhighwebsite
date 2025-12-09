import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Location from "../../Components/Location/Location";
import HeadOffice from "../../assets/images/head_office_icon.jpg";
import CallUs from "../../assets/images/call_us_icon.jpg";
import EmailUs from "../../assets/images/email_us_icon.jpg";

function Contact() {
  return (
    <>
      <Location />
      <section>
        <Container>
          <Row>
            <Col lg={4} className="text-center my-4">
              <img src={HeadOffice} className="w-25" />
              <h4 className="my-2"><strong>Head Office</strong></h4>
              <p>
                <a href="https://maps.app.goo.gl/u9eLfsZ9rGaGxudPA" className="text-dark">A-3/30, Block A3, Janakpuri,<br /> New Delhi - 110058</a>
              </p>
            </Col>
            <Col lg={4} className="text-center my-4">
              <img src={CallUs} className="w-25" />
              <h4 className="my-2"><strong>Call Us</strong></h4>
              <p>
                <a href="tel:+918076751741" className="text-dark">+91-80767 51741</a>
              </p>
            </Col>
            <Col lg={4} className="text-center my-4">
              <img src={EmailUs} className="w-25" />
              <h4 className="my-2"><strong>E-mail Us</strong></h4>
              <p>
                <a href="mailto:trainhighgym@gmail.com" className="text-dark">trainhighgym@gmail.com</a>
              </p>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col lg={12} className="text-center my-4">
              <h1 className="section-title px-lg-0 px-3">get in touch with us</h1>
              <p>WE ARE ALWAYS READY TO HEAR FROM YOU</p>
            </Col>
            <Col lg={4}>
              <div className="form-floating mb-3">
                <input type="text" className="form-control" id="floatingInput" placeholder="Full Name" />
                <label for="floatingInput">Full Name</label>
              </div>
            </Col>
            <Col lg={4}>
              <div className="form-floating mb-3">
                <input type="text" className="form-control" id="floatingInput" placeholder="Mobile Number" />
                <label for="floatingInput">Mobile Number</label>
              </div>
            </Col>
            <Col lg={4}>
              <div className="form-floating mb-3">
                <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
                <label for="floatingInput">Email address</label>
              </div>
            </Col>
            <Col lg={12}>
              <div className="form-floating mb-3">
                <textarea className="form-control block w-full" placeholder="Leave a message here" id="floatingTextarea2" style={{ height: '100px' }}></textarea>
                <label for="floatingTextarea2">Message</label>
              </div>
            </Col>
            <Col lg={12} className="text-end mb-3">
              <a href="" className="btn btn-dark btn-lg rounded">Submit</a>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default Contact;
