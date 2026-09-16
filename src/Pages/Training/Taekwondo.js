import React from 'react'
import { Container } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import TaekwondoTraining from "../../assets/images/trainings/taekwondo.jpg";

function Taekwondo() {
  return (
    <>
      <section>
        <Container>
          <Row className="justify-content-center mt-5">
            <Col lg={12}>
              <h2 className="section-title">Taekwondo</h2>
              <p className="text-center px-lg-5 px-2 mb-4">
                Develop strength, speed, focus, and confidence through the disciplined art of Taekwondo.
              </p>
            </Col>
          </Row>
        </Container>
        <Container>
          <Row className="justify-content-center ">
            <Col lg={12}>
              <img src={TaekwondoTraining} className="img-fluid w-100 rounded " alt="" />
            </Col>
            <Col lg={12}>
              <div className="my-lg-5 my-4">
                <p className="text-justify">Taekwondo is a dynamic martial art that combines discipline, technique, speed, flexibility, coordination, and physical conditioning. Training involves controlled movements, kicks, strikes, footwork, and structured techniques.</p>
                <p className="text-justify">Beyond physical fitness, Taekwondo encourages focus, confidence, discipline, respect, and perseverance. Learning and improving techniques requires consistent practice and concentration.</p>
                <p className="text-justify">Whether you are interested in martial arts, fitness, discipline, or learning new physical skills, Taekwondo provides a challenging and rewarding training experience that develops both physical and mental qualities.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  )
}

export default Taekwondo