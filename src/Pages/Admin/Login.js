import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { FloatingLabel, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import GetApiCall from "../../helpers/GetApi";
import PostApiCall from "../../helpers/PostApi";

function Login() {
  // useEffect(() => {
  //   console.log("manmeet");
  //   PostApiCall.postRequest(
  //     {
  //       username: "user1",
  //       password:
  //         "$2b$10$2aWrrIweEzUV8e43llzex.ayVf75Q5BGdTs5uRZwH5T7ndVyHKZfe",
  //       action: "",
  //       actiondate: "",
  //       userid: "",
  //     },
  //     "AuthenticateUser"
  //   ).then((results) => {
  //     results.json().then((obj) => {
  //       if (results.status == 200 || results.status == 201) {
  //         //   console.log(obj.data[0].VariantImage.split("#")[2]);
  //       }
  //     });
  //   });
  // });
  return (
    <section className="py-5 inner-section">
      <Container>
        <Row className="justify-content-center align-items-center">
          <Col lg={5}>
            <Card>
              <Card.Body className="text-center">
                <h4 className="mb-lg-4">Admin Login</h4>
                <Form>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Email address"
                    className="mb-3"
                  >
                    <Form.Control type="email" placeholder="name@example.com" />
                  </FloatingLabel>
                  <FloatingLabel
                    controlId="floatingPassword"
                    label="Password"
                    className="mb-3"
                  >
                    <Form.Control type="password" placeholder="Password" />
                  </FloatingLabel>
                  <Link
                    to="/admin-panel"
                    className="btn btn-secondary w-100 py-2"
                  >
                    Login
                  </Link>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Login;
