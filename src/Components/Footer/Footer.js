
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { AiOutlineYoutube } from "react-icons/ai";
import {
  BiLogoFacebook,
  BiLogoInstagram,
  BiLogoLinkedin,
} from "react-icons/bi";
import moment from "moment";
import { useLocation } from "react-router-dom";

function Footer() {
  const location = useLocation();

  const pathname = location.pathname
    .toLowerCase()
    .replace(/\/+$/, "") || "/";

  const instagramLinks = [
    {
      url: "https://www.instagram.com/trainhighgym/",
      slug: "/locations/janakpuri",
      icon: <BiLogoInstagram className="social-icon text-white" />,
      className: "text-instagram",
    },
    {
      url: "https://www.instagram.com/trainhighgym_rajourigarden/",
      slug: "/locations/rajouri-garden",
      icon: <BiLogoInstagram className="social-icon text-white" />,
      className: "text-instagram",
    },
  ];

  const filteredInstagramLinks = pathname.startsWith("/locations/")
    ? instagramLinks.filter((social) => pathname === social.slug)
    : instagramLinks;

  const socialLinks = [
    ...filteredInstagramLinks,
    {
      url: "https://in.linkedin.com/in/train-high-gym-266a86370",
      icon: <BiLogoLinkedin className="social-icon text-white" />,
      className: "text-linkedin",
    },
    {
      url: "https://www.youtube.com/@TrainHighGym",
      icon: <AiOutlineYoutube className="social-icon text-white" />,
      className: "text-linkedin",
    },
    {
      url: "https://www.facebook.com/p/TRAIN-HIGH-GYM-61550363817019/",
      icon: <BiLogoFacebook className="social-icon text-white" />,
      className: "text-facebook",
    },
  ];

  return (
    <footer className="bg-black text-white pt-4 border-top">
      <Container>
        <Row className="justify-content-center align-items-start py-4">

          <Col lg={4}>
            <p className="fw-bold">USEFUL LINKS</p>
            <ul className="text-primary-hover mt-3 list-unstyled ps-0">
              <li className="mb-1">
                <a className="text-light small text-uppercase" href="/trainings">
                  Trainings
                </a>
              </li>
              <li className="mb-1">
                <a className="text-light small text-uppercase" href="/events">
                  Events
                </a>
              </li>
              <li className="mb-1">
                <a className="text-light small text-uppercase" href="mailto:trainhighgym@gmail.com">
                  Career
                </a>
              </li>
              <li className="mb-1">
                <a className="text-light small text-uppercase" href="/contact-us">
                  Contact us
                </a>
              </li>
            </ul>
          </Col>

          <Col lg={4}>
            <p className="fw-bold">COMPANY</p>
            <ul className="text-primary-hover mt-3 list-unstyled ps-0">
              <li className="mb-1">
                <a className="text-light small text-uppercase" href="/why-to-join">
                  Why to Join
                </a>
              </li>
              <li className="mb-1">
                <a className="text-light small text-uppercase" href="/franchise">
                  Franchise
                </a>
              </li>
              <li className="mb-1">
                <a className="text-light small text-uppercase" href="/frequently-asked-questions">
                  FAQs
                </a>
              </li>
              <li className="mb-1">
                <a className="text-light small text-uppercase" href="/blogs">
                  Blogs
                </a>
              </li>
            </ul>
          </Col>

          <Col lg={4}>
            <p className="fw-bold">FOLLOW US</p>

            <ul className="list-inline mt-0 mb-0">
              {socialLinks.map((social, index) =>
                <li className="list-inline-item" key={index}>
                  <a
                    className={`btn btn-white btn-sm shadow px-2 bg-dark social-icon-wrap cursor-box copy ${social.className}`}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Follow Train High Gym"
                  >
                    {social.icon}
                  </a>
                </li>
              )}
            </ul>
          </Col>

        </Row>
      </Container>

      <div className="bg-dark py-3 text-center small">
        Copyright ©{moment().format("YYYY")} Train High Gym. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;