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
import { Eye, EyeSlash } from "react-bootstrap-icons";
import { Modal } from "react-bootstrap";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
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

  const goToWebsite = () => {
    window.location.href = "/";
  }

  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const handleOpenPasswordModal = () => setShowPasswordModal(true);
  const handleClosePasswordModal = () => setShowPasswordModal(false);

  return (
    <>
      {/* <Hero /> */}
      <section className="inner-section">
        <Container>
          <Row className="justify-content-center align-items-center">
            <Col lg={5}>
              <Card className="rounded shadow-sm">
                <Card.Body className="">
                  <h3 className="fw-bold">Hello,</h3>
                  <h3 className="mb-lg-4 fw-bold">Welcome Back!</h3>
                  <Form onSubmit={onlogin}>
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Mobile Number or Email address"
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
                      className="mb-3 position-relative"
                    >
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <span
                        onClick={() => setShowPassword(!showPassword)}
                        style={{
                          position: "absolute",
                          right: "15px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          cursor: "pointer",
                          color: "#6c757d",
                        }}
                      >
                        {showPassword ? <Eye size={20} /> : <EyeSlash size={20} />}
                      </span>
                    </FloatingLabel>

                    <a
                    href=""
                      onClick={(e) => {
                        e.preventDefault();
                        handleOpenPasswordModal();
                      }} className="d-block text-danger mb-3">Lost your password?</a>
                    <button
                      className="btn btn-dark rounded w-100 py-2 mb-2"
                      onClick={onlogin}
                    >
                      Login
                    </button>
                    <button
                      className="btn btn-warning rounded w-100 py-2"
                      onClick={goToWebsite}
                    >
                      Back to website
                    </button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
      <Modal show={showPasswordModal} onHide={handleClosePasswordModal} centered>
  <Modal.Header closeButton>
    <Modal.Title>Password Reset Request</Modal.Title>
  </Modal.Header>

  <Modal.Body className="text-center">
    <p className="mb-4">
      Your request has been sent to the administrator.
    </p>

    <button
      className="btn btn-dark px-4"
      onClick={handleClosePasswordModal}
    >
      Close
    </button>
  </Modal.Body>
</Modal>
    </>
  );
}

export default Login;
