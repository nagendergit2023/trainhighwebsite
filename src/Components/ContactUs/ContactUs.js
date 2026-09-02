import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import PostApiCall from "../../helpers/PostApi";
import { notification } from "antd";
import Notiflix from "notiflix";

function ContactUs({
  title = "Get in touch",
  subtitle = "We are always ready to hear from you.",
  bgClass = "bg-white",
  textClass = "text-black"
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState(null);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

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
          type:type
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
              message: `Thanks for your interest! We'll be in touch shortly to help you get started.`,
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
    <section className={`py-lg-3 py-5 ${bgClass}`}>
      <Container>
        <Row className="justify-content-center">
          <Col lg={12} className="text-center my-4">
            <h1 className={`section-title px-lg-0 px-3 ${textClass}`}>{title}</h1>
            <p className={`${textClass}`}>{subtitle}</p>
          </Col>
          <Col lg={3}>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label htmlFor="floatingInput">Full Name *</label>
            </div>
          </Col>
          <Col lg={3}>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder="Mobile Number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
              <label htmlFor="floatingInput">Mobile Number *</label>
            </div>
          </Col>
          <Col lg={3}>
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="floatingInput">Email address *</label>
            </div>
          </Col>
          <Col lg={3}>
            <div className="form-floating mb-3">
              <select
                className="form-control"
                id="floatingInput"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="Franchise">Franchise</option>
                <option value="Membership">Membership</option>
              </select>
              <label htmlFor="floatingInput">Enquiry For *</label>
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
              <label htmlFor="floatingTextarea2">Message</label>
            </div>
          </Col>
          <Col lg={3} className="text-end mb-5">
            <button
              onClick={() => contactus()}
              className="w-100 py-2 btn-lg rounded btn btn-dark border-white"
            >
              Submit
            </button>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default ContactUs;
