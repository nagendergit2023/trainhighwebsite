import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col, Card, FloatingLabel, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import PostApiCall from "../../helpers/PostApi";
import { notification } from "antd";

function Login() {
  const [mobileNumber, setMobileNumber] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(60);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const otpInputs = useRef([]);

  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.removeItem("access");
  }, []);

  // -----------------------------
  // 🔹 TIMER COUNTDOWN
  // -----------------------------
  useEffect(() => {
    let interval;
    if (otpSent && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpSent, timer]);

  // -----------------------------
  // 🔹 SEND OTP
  // -----------------------------
  const handleSendOtp = (e) => {
    e.preventDefault();

    if (!mobileNumber) {
      return notification.error({
        message: "Error",
        description: "Please enter mobile number or email",
      });
    }

    PostApiCall.postRequest(
      {
        mobileNumber: mobileNumber,
        action: "send_otp",
      },
      "SendOtp"
    ).then((results) => {
      results.json().then((obj) => {
        if (results.status === 200 || results.status === 201) {
          setOtpSent(true);
          setTimer(60); // reset timer

          notification.success({
            message: "OTP Sent",
            description: "Please check your mobile/email.",
          });

          setTimeout(() => otpInputs.current[0]?.focus(), 200);
        } else {
          notification.error({
            message: "Error",
            description: obj.data,
          });
        }
      });
    });
  };

  // -----------------------------
  // 🔹 RESEND OTP
  // -----------------------------
  const handleResendOtp = () => {
    setTimer(60);
    handleSendOtp(new Event("resend"));
  };

  // -----------------------------
  // 🔹 VERIFY OTP
  // -----------------------------
  const handleVerifyOtp = (e) => {
    e.preventDefault();

    const fullOtp = otp.join("");

    if (fullOtp.length !== 6) {
      return notification.error({
        message: "Error",
        description: "Please enter a valid 6-digit OTP",
      });
    }

    PostApiCall.postRequest(
      {
        mobileNumber: mobileNumber,
        otp: fullOtp,
        action: "verify_otp",
      },
      "VerifyOtp"
    ).then((results) => {
      results.json().then((obj) => {
        if (results.status === 200 || results.status === 201) {
          sessionStorage.setItem("access", obj.token);
          navigate("/admin-panel");
        } else {
          notification.error({
            message: "Invalid OTP",
            description: obj.data,
          });
        }
      });
    });
  };

  // -----------------------------
  // 🔹 OTP INPUT HANDLING
  // -----------------------------
  const handleOtpChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // only last digit
    setOtp(newOtp);

    if (value && index < 5) {
      otpInputs.current[index + 1].focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpInputs.current[index - 1].focus();
    }
  };

  const goToWebsite = () => (window.location.href = "/");

  return (
    <section className="inner-section">
      <Container>
        <Row className="justify-content-center align-items-center">
          <Col lg={5}>
            <Card className="rounded shadow-sm">
              <Card.Body>
                <h3 className="fw-bold">Hello,</h3>
                  <h3 className="mb-lg-4 fw-bold">Welcome Back!</h3>

                {!otpSent ? (
                  /* --------------------------
                     STEP 1 — ENTER MOBILE/EMAIL
                  -------------------------- */
                  <Form onSubmit={handleSendOtp}>
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Mobile Number"
                      className="mb-3"
                    >
                      <Form.Control
                        type="text"
                        placeholder="Enter Mobile Number"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                      />
                    </FloatingLabel>

                    <button className="btn btn-dark rounded w-100 py-2 mb-2">
                      Send OTP
                    </button>

                    <button
                      className="btn btn-warning rounded w-100 py-2"
                      onClick={goToWebsite}
                      type="button"
                    >
                      Back to website
                    </button>
                  </Form>
                ) : (
                  /* --------------------------
                     STEP 2 — ENTER OTP
                  -------------------------- */
                  <Form onSubmit={handleVerifyOtp}>
                    <p className="text-muted mb-2">
                      Enter the 6-digit OTP sent to:  
                      <strong> {mobileNumber} </strong>
                    </p>

                    <div className="d-flex justify-content-between mb-3">
                      {otp.map((digit, index) => (
                        <input
                          key={index}
                          type="text"
                          maxLength="1"
                          className="form-control text-center mx-1"
                          style={{
                            width: "45px",
                            fontSize: "24px",
                            padding: "10px",
                          }}
                          value={digit}
                          ref={(el) => (otpInputs.current[index] = el)}
                          onChange={(e) =>
                            handleOtpChange(e.target.value, index)
                          }
                          onKeyDown={(e) => handleOtpKeyDown(e, index)}
                        />
                      ))}
                    </div>

                    <button className="btn btn-dark w-100 py-2 mb-3">
                      Verify OTP
                    </button>

                    <div className="text-center mb-3">
                      {timer > 0 ? (
                        <span className="text-muted">
                          Resend OTP in {timer}s
                        </span>
                      ) : (
                        <button
                          type="button"
                          className="btn btn-link text-danger p-0"
                          onClick={handleResendOtp}
                        >
                          Resend OTP
                        </button>
                      )}
                    </div>

                    <button
                      className="btn btn-warning rounded w-100 py-2"
                      onClick={goToWebsite}
                      type="button"
                    >
                      Back to website
                    </button>
                  </Form>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Login;
