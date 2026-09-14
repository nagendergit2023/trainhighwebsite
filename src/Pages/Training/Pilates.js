import React from 'react'
import { Container } from 'react-bootstrap';
import Hero from '../../Components/Hero/Hero.js';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import PilatesTraining from "../../assets/images/trainings/pilates.jpg";

function Pilates() {
  return (
    <>
      <section>
        <Container>
          <Row className="justify-content-center mt-5">
            <Col lg={12}>
              <h2 className="section-title">Pilates</h2>
              <p className="text-center px-lg-5 px-2 mb-4">
                Build core strength, improve flexibility, and master controlled movement through purposeful Pilates training.
              </p>
            </Col>
          </Row>
        </Container>
        <Container>
          <Row className="justify-content-center ">
            <Col lg={12}>
              <img src={PilatesTraining} className="img-fluid w-100 rounded " alt="" />
            </Col>
            <Col lg={12}>
              <div className="my-lg-5 my-4">
                <p className="text-justify">Pilates focuses on controlled movement, core strength, stability, flexibility, posture, balance, and body awareness. It emphasizes precision and control rather than simply performing movements quickly.</p>
                <p className="text-justify">A strong core provides a foundation for many other forms of exercise and everyday movement. Pilates can help you develop better control of your body while improving stability and mobility.</p>
                <p className="text-justify">It is also an excellent complement to strength training, cardio, CrossFit, and other high-intensity workouts. By focusing on controlled movement and alignment, Pilates can help create a more balanced approach to overall fitness.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  )
}

export default Pilates