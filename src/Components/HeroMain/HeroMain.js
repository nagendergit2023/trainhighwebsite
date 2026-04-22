import React, { useEffect, useState } from "react";
import {
  Col,
  Container,
  Row,
  Button,
  Offcanvas,
  Form,
  Spinner,
  FloatingLabel,
} from "react-bootstrap";
import axios from "axios";
import "./HeroMain.css";
import PostApiCall from "../../helpers/PostApi";

function HeroMain() {
  const [show, setShow] = useState(false);
  const [displayed, setDisplayed] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    location: "",
  });

  const text = "one day gym trial";

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    let i = 0;

    function startTyping() {
      setDisplayed("");
      i = 0;

      const typingInterval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1));
        i++;
        if (i === text.length) clearInterval(typingInterval);
      }, 70);
    }

    startTyping();
    const restartInterval = setInterval(startTyping, 20000);
    return () => clearInterval(restartInterval);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.mobile || !formData.location) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      await PostApiCall.postRequest(
        {
          name: formData.name,
          mobile: formData.mobile,
          desciption: `Trial Location: ${formData.location}`,
          subject: "One Day Gym Trial",
          type: "Trial",
          source: "website",
          email:
            formData.location == "Janakpuri"
              ? "trainhighgym@gmail.com"
              : "trainhighrajouri@gmail.com",
        },
        "contactus",
      );

      alert("Your trial pass request has been sent!");
      setFormData({ name: "", mobile: "", location: "" });
      handleClose();
    } catch (error) {
      alert("Something went wrong. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hero-section-main">
      <Container>
        <Row className="justify-content-center">
          <Col lg={8} className="text-center position-relative">
            <h2 className="section-title">
              {displayed}
              <span className="cursor">|</span>
            </h2>
            <h5 className="mt-4">
              Take your time to get to know Train High Gym.
            </h5>
            <h5 className="mb-4">We would love to show you around!</h5>
            <a
              className="btn btn-rounded-pill border btn-lg"
              onClick={handleShow}
            >
              Get Your Pass
            </a>
          </Col>
        </Row>
      </Container>

      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="end"
        className="bg-dark text-white"
      >
        <Offcanvas.Header closeButton closeVariant="white" />
        <Offcanvas.Body>
          <h4 className="mt-5">Get Your Pass</h4>
          <h6 className="mb-5">Fill in your details to claim your trial pass.</h6>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3 text-dark">
              <Form.FloatingLabel label="Name">
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                />
              </Form.FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3 text-dark">
              <Form.FloatingLabel label="Mobile">
                <Form.Control
                  type="text"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="Enter your mobile"
                />
              </Form.FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3 text-dark">
              <FloatingLabel
                controlId="floatingSelect"
                label="Select your nearest location"
              >
                <Form.Select
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                >
                  <option value="Janakpuri">Janakpuri</option>
                  <option value="Rajouri Garden">Rajouri Garden</option>
                </Form.Select>
              </FloatingLabel>
            </Form.Group>

            <Button
              type="submit"
              className="btn btn-dark btn-rounded-pill border btn-lg w-100"
              disabled={loading}
            >
              {loading ? <Spinner size="sm" /> : "Submit"}
            </Button>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default HeroMain;
