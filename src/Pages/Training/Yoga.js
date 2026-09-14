import React from 'react'
import Hero from "../../Components/Hero/Hero.js"
import { Container } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import YogaTraining from "../../assets/images/trainings/yoga.jpg";

function Yoga() {
  return (
    <>
      <section>
        <Container>
          <Row className="justify-content-center mt-5">
            <Col lg={12}>
              <h2 className="section-title">Yoga</h2>
              <p className="text-center px-lg-5 px-2 mb-4">
                Strengthen your body, calm your mind, and restore your balance through mindful movement and breath.
              </p>
            </Col>
          </Row>
        </Container>
        <Container>
          <Row className="justify-content-center ">
            <Col lg={12}>
              <img src={YogaTraining} className="img-fluid w-100 rounded " alt="" />
            </Col>
            <Col lg={12}>
              <div className="my-lg-5 my-4">
                <p className="text-justify">Yoga creates a connection between movement, breathing, flexibility, balance, and mindfulness. It can help improve mobility, posture, body awareness, and relaxation while complementing more intense forms of training.</p>
                <p className="text-justify">Regular yoga practice can be particularly valuable for people who participate in strength training, functional workouts, or high-intensity exercise. Stretching and controlled movement can support mobility and help you become more aware of how your body moves.</p>
                <p className="text-justify">Yoga is also an opportunity to slow down, focus on breathing, and create a sense of balance between physical training and mental relaxation.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>

  )
}

export default Yoga