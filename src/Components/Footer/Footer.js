import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { AiOutlineYoutube } from "react-icons/ai";
import {
  BiLogoFacebook,
  BiLogoInstagram,
  BiLogoLinkedin,
} from "react-icons/bi";
import TrainHighGymLogo from "../../assets/images/train_high_gym_logo.png";
import moment from "moment";

function Footer() {
  return (
    <>
      <footer className="bg-black text-white pt-4 border-top">
        <Container>
          <Row className="justify-content-center align-items-start py-4">
            <Col lg={4}>
              {/* <img className="rounded-circle footer-logo" src={TrainHighGymLogo} alt="logo" />  */}
              <p className="fw-bold">USEFUL LINKS</p>
              <ul className="text-primary-hover mt-3 mt-md-0 list-unstyled ps-0">
                <li className="mb-1">
                  <a
                    className="text-light small text-uppercase"
                    href="/contact-us"
                  >
                    Contact us
                  </a>
                </li>
                <li className="mb-1">
                  <a
                    className="text-light small text-uppercase"
                    href="/careers"
                  >
                    Career
                  </a>
                </li>
                <li className="mb-1">
                  <a className="text-light small text-uppercase" href="/events">
                    Events & Gallery
                  </a>
                </li>
                <li className="mb-1">
                  <a
                    className="text-light small text-uppercase"
                    href="/frequently-asked-questions"
                  >
                    FAQs
                  </a>
                </li>
                <li className="mb-1">
                  <a
                    className="text-light small text-uppercase"
                    href="/franchise"
                  >
                    Franchise
                  </a>
                </li>
                <li className="mb-1">
                  <a
                    className="text-light small text-uppercase"
                    href="/why-to-join"
                  >
                    Why To Join
                  </a>
                </li>
              </ul>
            </Col>
            <Col lg={4}>
              <p className="fw-bold">COMPANY</p>
              <ul className="text-primary-hover mt-3 mt-md-0 list-unstyled ps-0">
                <li className="mb-1">
                  <a
                    className="text-light small text-uppercase"
                    href="/about-us"
                  >
                    About
                  </a>
                </li>
                <li className="mb-1">
                  <a className="text-light small text-uppercase" href="/blogs">
                    Blogs
                  </a>
                </li>
                <li className="mb-1">
                  <a className="text-light small text-uppercase" href="#">
                    Terms & Conditions
                  </a>
                </li>
                <li className="mb-1">
                  <a className="text-light small text-uppercase" href="#">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </Col>
            <Col lg={4}>
              <p className="fw-bold">FOLLOW US</p>
              <ul className="list-inline mt-0 mb-0">
                <li className="list-inline-item">
                  <a
                    className="btn btn-white btn-sm shadow px-2 text-instagram bg-dark social-icon-wrap"
                    href="https://instagram.com/trainhighgym?igshid=NjIwNzIyMDk2Mg=="
                    target="_blank"
                  >
                    <BiLogoInstagram className="social-icon text-white" />
                  </a>
                </li>
                <li className="list-inline-item">
                  <a
                    className="btn btn-white btn-sm shadow px-2 text-linkedin bg-dark social-icon-wrap"
                    href="#"
                    target="_blank"
                  >
                    <BiLogoLinkedin className="social-icon text-white" />
                  </a>
                </li>
                <li className="list-inline-item">
                  <a
                    className="btn btn-white btn-sm shadow px-2 text-linkedin bg-dark social-icon-wrap"
                    href="https://www.youtube.com/@TrainHighGym"
                    target="_blank"
                  >
                    <AiOutlineYoutube className="social-icon text-white" />
                  </a>
                </li>
                <li className="list-inline-item">
                  <a
                    className="btn btn-white btn-sm shadow px-2 text-facebook bg-dark social-icon-wrap"
                    href="https://www.facebook.com/p/TRAIN-HIGH-GYM-61550363817019/"
                    target="_blank"
                  >
                    <BiLogoFacebook className="social-icon text-white" />
                  </a>
                </li>
              </ul>
            </Col>
          </Row>
        </Container>
        {/* <div className="bg-black py-3 text-center mt-lg-5 small"> */}
        <div className="bg-dark py-3 text-center small">
          Copyright ©{moment().format("YYYY")} Train High Gym. All Rights
          Reserved.
        </div>
      </footer>
    </>
  );
}

export default Footer;
