import React, { useState } from "react";
import { Col, Container, Row, Button, Offcanvas, Form } from "react-bootstrap";
import "./HeroMain.css";
import PostApiCall from "../../helpers/PostApi";
import { notification } from "antd";
import Notiflix from "notiflix";

function HeroMain() {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const contactus = () => {
    if (name != "" && mobile != null && mobile != "") {
      Notiflix.Loading.circle();
      PostApiCall.postRequest(
        {
          name: name,
          mobile: mobile,
          email: "trainhighgym@gmail.com",
        },
        "contactus"
      ).then((results) => {
        results.json().then((obj) => {
          if (results.status === 200 || results.status === 201) {
            setName("");
            setMobile(null);
            handleClose();
            Notiflix.Loading.remove();
            notification.success({
              message: `Your free trial request has been submitted. Our team will connect with you soon!`,
            });
          } else {
            notification.error({
              message: `Please Contact Team`,
            });
          }
        });
      });
    } else {
      notification.error({
        message: `Please Fill Mandatory Fields`,
      });
      return;
    }
  };
  return (
    <div className="hero-section-main">
      <Container>
        <Row className="justify-content-center">
          <Col lg={6} className="text-center position-relative">
            <h2 className="section-title">one day free trial</h2>
            <p className="my-4">
              Take your time to get to know Train High Gym. The pass is FREE,
              and we would love to show you around our Gym!
            </p>
            <a
              className="btn btn-rounded-pill border btn-lg"
              onClick={handleShow}
            >
              Get Your Pass
            </a>
          </Col>
        </Row>
      </Container>

      {/* Offcanvas Component */}
      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="end"
        className="bg-dark text-white"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <h4 className="mt-5">Get Your Free Pass</h4>
          <p>Fill in your details to claim your free trial pass.</p>

          <Form.Group className="mb-3 text-dark" controlId="formName">
            <Form.FloatingLabel label="Name *">
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </Form.FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-3 text-dark" controlId="formMobile">
            <Form.FloatingLabel label="Mobile *">
              <Form.Control
                type="number"
                placeholder="Enter your mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </Form.FloatingLabel>
          </Form.Group>

          <Button
            type="submit"
            className="btn btn-dark btn-rounded-pill border btn-lg"
            onClick={contactus}
          >
            Submit
          </Button>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default HeroMain;
