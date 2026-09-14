import React from 'react'
import Hero from './../../Components/Hero/Hero.js';
import { Container } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import CrossfitTraining from "../../assets/images/trainings/crossfit_training.jpg";

function Crossfit() {
  return (
    <>
      <section>
        <Container>
          <Row className="justify-content-center mt-5">
            <Col lg={12}>
              <h2 className="section-title">Crossfit</h2>
              <p className="text-center px-lg-5 px-2 mb-4">
                High-intensity functional training designed to challenge your limits and build all-around performance.
              </p>
            </Col>
          </Row>
        </Container>
        <Container>
          <Row className="justify-content-center">
            <Col lg={12}>
              <img src={CrossfitTraining} className="img-fluid w-100 rounded " alt="" />
            </Col>
            <Col lg={12}>
              <div className="my-lg-5 my-4">
                <p className="text-justify">CrossFit combines functional movements, strength training, cardiovascular conditioning, endurance, speed, and agility into challenging workouts. Each session is designed to push your physical capabilities while keeping training varied and engaging.</p>
                <p className="text-justify">CrossFit can include movements such as squats, lifts, jumps, presses, carries, rowing, running, and bodyweight exercises. The combination of different movements allows you to work on multiple aspects of fitness rather than focusing on only one area.</p>
                <p className="text-justify">Whether your goal is to improve athletic performance, increase strength, lose body fat, or develop better overall conditioning, CrossFit offers a dynamic training experience that encourages continuous improvement.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  )
}

export default Crossfit