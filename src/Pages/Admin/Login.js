import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { FloatingLabel, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
// import GetApiCall from "../../helpers/GetApi";
import PostApiCall from "../../helpers/PostApi.js";
import Hero from "../../Components/Hero/Hero.js";
import { notification } from "antd";

function Login() {
  let navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    sessionStorage.removeItem("access");
  }, []);
  const onlogin = (event) => {
    event.preventDefault()
    if (userName !== "") {
      if (password !== "") {
        onsubmit();
      } else {
        notification.error({
          message: `Notification error`,
          description: "Please Enter Password",
        });
      }
    } else {
      notification.error({
        message: `Notification error`,
        description: "Please Enter Name",
      });
    }
  };
  const onsubmit = () => {
    PostApiCall.postRequest(
      {
        username: userName,
        password: password,
        action: "login",
        actiondate: "",
      },
      "AuthenticateUser"
    ).then((results) => {
      results.json().then((obj) => {
        if (results.status === 200 || results.status === 201) {
          sessionStorage.setItem("access", obj.token);
          navigate("/admin-panel");
        } else {
          notification.error({
            message: `Notification error`,
            description: obj.data,
          });
        }
      });
    });
  };
  return (
    <>
      <Hero />
      <section className="inner-section">
        <Container>
          <Row className="justify-content-center align-items-center">
            <Col lg={5}>
              <Card>
                <Card.Body className="text-center">
                  <h4 className="mb-lg-4">Admin Login</h4>
                  <Form onSubmit={onlogin}>
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Email address"
                      className="mb-3"
                    >
                      <Form.Control
                        type="email"
                        placeholder="name@example.com"
                        value={userName}
                        onChange={(e) => {
                          setUserName(e.target.value);
                        }}
                      />
                    </FloatingLabel>
                    <FloatingLabel
                      controlId="floatingPassword"
                      label="Password"
                      className="mb-3"
                    >
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                      />
                    </FloatingLabel>
                    <button
                      className="btn btn-secondary w-100 py-2"
                      onClick={onlogin}
                    >
                      Login
                    </button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default Login;
