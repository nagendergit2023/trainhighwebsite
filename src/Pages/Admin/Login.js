import React from 'react';
import { Container } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import { FloatingLabel, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

function Login() {
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
                  <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
                    <Form.Control type="password" placeholder="Password" />
                  </FloatingLabel>
                  <Link to="/new-membership" className="btn btn-secondary w-100 py-2">Login</Link>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Login;