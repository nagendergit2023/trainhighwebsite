import React from 'react';
import { Container } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import KidsTraining from "../../assets/images/trainings/kids_fitness.jpg";

function KidsFitness() {
  return (
    <>
      <section>
        <Container>
          <Row className="justify-content-center mt-5">
            <Col lg={12}>
              <h2 className="section-title">Kids Fitness</h2>
              <p className="text-center px-lg-5 px-2 mb-4">
                Fun, active, and engaging fitness programs designed to help children build strength, confidence, coordination, and healthy habits.
              </p>
            </Col>
          </Row>
        </Container>
        <Container>
          <Row className="justify-content-center ">
            <Col lg={12}>
              <img src={KidsTraining} className="img-fluid w-100 rounded " alt="" />
            </Col>
            <Col lg={12}>
              <div className="my-lg-5 my-4">
                <p className="text-justify">Kids Fitness at Train High Gym is designed to make physical activity fun, engaging, and age-appropriate. Our programs encourage children to stay active while developing essential physical abilities such as strength, coordination, balance, flexibility, agility, and endurance.</p>
                <p className="text-justify">Through a combination of playful exercises, movement-based activities, functional training, and age-appropriate challenges, children can develop better body awareness and confidence in an enjoyable environment. The focus is not simply on exercise, but on helping children develop healthy movement habits from an early age.</p>
                <p className="text-justify">Regular physical activity can support an active lifestyle while encouraging discipline, teamwork, confidence, and a positive attitude toward fitness. Our goal is to create an environment where children can move, play, learn, and grow stronger while enjoying every session.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>

  )
}

export default KidsFitness