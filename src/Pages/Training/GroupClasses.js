import React from 'react'
import Hero from '../../Components/Hero/Hero.js';
import { Container } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import AerobicsTraining from "../../assets/images/trainings/aerobics_dance.jpg";

function GroupClasses() {
  return (
    <>
      <section>
        <Container>
          <Row className="justify-content-center mt-5">
            <Col lg={12}>
              <h2 className="section-title">Group Classes</h2>
              <p className="text-center px-lg-5 px-2 mb-4">
                Join high-energy group workouts, stay motivated, and achieve your fitness goals together.
              </p>
            </Col>
          </Row>
        </Container>
        <Container>
          <Row className="justify-content-center">
            <Col lg={12}>
              <img src={AerobicsTraining} className="img-fluid w-100 rounded " alt="" />
            </Col>
            <Col lg={12}>
              <div className="my-lg-5 my-4">
                <p className="text-justify">Fitness becomes even more motivating when you train with others. Our group classes bring together energy, community, expert instruction, and challenging workouts to create an engaging training experience.</p>
                <p className="text-justify">Group training can help you stay accountable while introducing variety into your workout routine. Working alongside others can provide additional motivation and create an environment where members encourage one another to keep moving forward.</p>
                <p className="text-justify">Whether you enjoy energetic workouts, structured sessions, or simply want to make your fitness journey more social, group classes provide an exciting way to train, connect, and progress.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  )
}

export default GroupClasses