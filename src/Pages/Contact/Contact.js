import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Location from "../../Components/Location/Location";
import HeadOffice from "../../assets/images/head_office_icon.jpg";
import CallUs from "../../assets/images/call_us_icon.jpg";
import EmailUs from "../../assets/images/email_us_icon.jpg";
import PostApiCall from "../../helpers/PostApi";
import { notification } from "antd";
import Notiflix from "notiflix";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState(null);
  const [message, setMessage] = useState("");

  const contactus = () => {
    if (name != "" && mobile != null && mobile != "" && email != "") {
      Notiflix.Loading.circle();
      PostApiCall.postRequest(
        {
          name: name,
          mobile: mobile,
          email: "trainhighgym@gmail.com",
          senderemail: email,
          desciption: message,
        },
        "contactus"
      ).then((results) => {
        results.json().then((obj) => {
          if (results.status === 200 || results.status === 201) {
            setName("");
            setEmail("");
            setMobile(null);
            setMessage("");
            Notiflix.Loading.remove();
            notification.success({
              message: `Thanks for your interest! We’ll be in touch shortly to help you get started.`,
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
    <>
      <Location />
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
          <Row className="justify-content-center">
            <Col lg={12} className="text-center my-4">
              <h1 className="section-title px-lg-0 px-3">
                get in touch with us
              </h1>
              <p>WE ARE ALWAYS READY TO HEAR FROM YOU</p>
            </Col>
            <Col lg={4}>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <label for="floatingInput">Full Name *</label>
              </div>
            </Col>
            <Col lg={4}>
              <div className="form-floating mb-3">
                <input
                  type="number"
                  className="form-control"
                  id="floatingInput"
                  placeholder="Mobile Number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
                <label for="floatingInput">Mobile Number *</label>
              </div>
            </Col>
            <Col lg={4}>
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label for="floatingInput">Email address *</label>
              </div>
            </Col>
            <Col lg={12}>
              <div className="form-floating mb-3">
                <textarea
                  className="form-control block w-full"
                  placeholder="Leave a message here"
                  id="floatingTextarea2"
                  style={{ height: "100px" }}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
                <label for="floatingTextarea2">Message</label>
              </div>
            </Col>
            <Col lg={12} className="text-end mb-3">
              <button
                onClick={() => contactus()}
                className="btn btn-dark btn-lg rounded"
              >
                Submit
              </button>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default Contact;
