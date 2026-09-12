import React from 'react'
import { Container } from 'react-bootstrap';
import Hero from './../../Components/Hero/Hero.js';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import CardioTraining from "../../assets/images/trainings/cardio_training.jpg";

function Cardio() {
  return (
    <>
      <section>
        <Container>
          <Row className="justify-content-center mt-5">
            <Col lg={12}>
              <h2 className="section-title">Cardio</h2>
              <p className="text-center px-lg-5 px-2 mb-5">
                Elevate your stamina, improve cardiovascular fitness, and keep your body performing at its best.
              </p>
            </Col>
          </Row>
        </Container>
        <Container>
          <Row className="justify-content-center ">
            <Col lg={12}>
              <img src={CardioTraining} className="img-fluid w-100 rounded " alt="" />
            </Col>
            <Col lg={12}>
              <div className="my-lg-5 my-4">
                <p className="text-justify">Cardiovascular training is an essential part of a complete fitness program. Regular cardio can help improve endurance, stamina, heart health, energy levels, and overall physical conditioning.</p>
                <p className="text-justify">At Train High Gym, cardio training can become an important part of your fitness routine, whether you prefer running, cycling, cross-training, or other cardiovascular activities. It can also complement strength training by improving your ability to perform workouts with greater endurance.</p>
                <p className="text-justify">Whether you are working toward better stamina, supporting your weight-management goals, or simply looking to become more active, consistent cardio training can help you build a stronger and healthier foundation.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  )
}

export default Cardio