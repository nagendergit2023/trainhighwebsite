import React from 'react';
import "./ComingSoon.css";
import TrainHighGymLogo from "../../assets/images/train_high_gym_logo.png";
import BoxingTraining from "../../assets/images/trainings/boxing.png";
import CrossfitTraining from "../../assets/images/trainings/crossfit_training.png";
import CardioTraining from "../../assets/images/trainings/cardio_training.png";
import StrengthTraining from "../../assets/images/trainings/strength_training.png";
// import { BiLogoInstagram
// import { TbRulerMeasure } from "react-icons/tb";
// import { PiLockers } from "react-icons/pi";
// import { LuShowerHead, LuParkingSquare } from "react-icons/lu";
// import { RiFoggyLine } from "react-icons/ri";
import { Card, Col, Container, Row } from "react-bootstrap";
import Location from "../../Components/Location/Location.js";
// import { AiOutlineInstagram } from 'react-icons/ai';

function ComingSoon() {
  return (
    <div className="comingsoon_body">
      <section className="comingsoon_screen">
        {/* <img src={TrainHighGymLogo} className="main_title img-fluid w-25 rounded-circle infinite-flip" /> */}
        <p className="main_title">OPENING SOON!</p>
        <div className="d-flex align-items-center gap-4 position-relative z-1 ">
          <a href="https://instagram.com/trainhighgym?igshid=NjIwNzIyMDk2Mg==" className="social-icon-wrapper text-white" target="_blank">
          {/* <BiLogoInstagram className="social-icon" /> */}
            {/* <AiOutlineInstagram className="social-icon" /> */}
          </a>
          {/* <a href="" className="social-icon-wrapper text-white">
          <BiLogoFacebook className="social-icon" /> 
          </a>
          <a href="" className="social-icon-wrapper text-white">
          <BiPhoneCall className="social-icon" /> 
          </a>
          <a href="" className="social-icon-wrapper text-white">
          <BiLogoWhatsapp className="social-icon" /> 
          </a> */}
        </div>

      </section>
      <section className="trainings">
        <h4 className="main_title py-lg-5 py-4 small">our trainings</h4>
        <Container className="mb-5">
          <Row>
            <Col lg={3} xs={6} className="mb-4">
              <Card>
                <Card.Img variant="top" src={BoxingTraining} />
                <Card.Body>
                  <Card.Title className="text-center mb-0">Boxing</Card.Title>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={3} xs={6}>
              <Card>
                <Card.Img variant="top" src={CrossfitTraining} />
                <Card.Body>
                  <Card.Title className="text-center mb-0">Crossfit</Card.Title>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={3} xs={6}>
              <Card>
                <Card.Img variant="top" src={CardioTraining} />
                <Card.Body>
                  <Card.Title className="text-center mb-0">Cardio</Card.Title>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={3} xs={6}>
              <Card>
                <Card.Img variant="top" src={StrengthTraining} />
                <Card.Body>
                  <Card.Title className="text-center mb-0">Strength</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="trainings">
      <h4 className="main_title py-lg-5 py-4 small">facilties</h4>
        <Container className="mb-5">
        <Row className=" justify-content-center">
          <Col lg xs={6} className="d-flex justify-content-center align-items-center mb-4">
          <div className="text-center">
          <a href="https://instagram.com/trainhighgym?igshid=NjIwNzIyMDk2Mg==" className="social-icon-wrapper text-white" target="_blank">
            {/* <TbRulerMeasure className="social-icon" /> */}
          </a>
          <p className="text-white text-center mt-2">20,000 Sq. Ft.</p>
          </div>
          </Col>
          <Col lg xs={6} className="d-flex justify-content-center align-items-center mb-4">
          <div className="text-center">
            <a href="" className="social-icon-wrapper text-white">
          {/* <LuShowerHead className="social-icon" />  */}
          </a>
            <p className="text-white text-center mt-2">Showers</p>
            </div>
          
         </Col>
         <Col lg xs={6} className="d-flex justify-content-center align-items-center mb-4">
         <div className="text-center">
        <a href="" className="social-icon-wrapper text-white">
          {/* <PiLockers className="social-icon" />  */}
          </a>
          <p className="text-white text-center mt-2">Lockers</p>
        </div>
          </Col>
          <Col lg xs={6} className="d-flex justify-content-center align-items-center mb-4">
          <div className="text-center">
          <a href="" className="social-icon-wrapper text-white">
          {/* <LuParkingSquare className="social-icon" />  */}
          </a>
          <p className="text-white text-center mt-2">Parking</p>
          </div>
          </Col>
          <Col lg xs={6} className="d-flex justify-content-center align-items-center mb-4">
          <div className="text-center">
          <a href="" className="social-icon-wrapper text-white">
          {/* <RiFoggyLine className="social-icon" />  */}
          </a>
          <p className="text-white text-center mt-2">Steam Bath</p>
          </div>
          </Col>
        </Row>
        </Container>
      </section>      
      <div className="dark_overlay"></div>
      <Location />
    </div>
  )
}

export default ComingSoon;