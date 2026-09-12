import React from 'react'
import { Container } from 'react-bootstrap';
import Hero from '../../Components/Hero/Hero.js';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import GymnasticsTraining from "../../assets/images/trainings/gymnastics.jpg";

function Gymnastics() {
  return (
    <>
      <section>
        <Container>
          <Row className="justify-content-center mt-5">
            <Col lg={12}>
              <h2 className="section-title">Gymnastics</h2>
              <p className="text-center px-lg-5 px-2 mb-5">
                Develop exceptional body control, balance, mobility, and strength through expert gymnastics training.
              </p>
            </Col>
          </Row>
        </Container>
        <Container>
          <Row className="justify-content-center ">
            <Col lg={12}>
              <img src={GymnasticsTraining} className="img-fluid w-100 rounded " alt="" />
            </Col>
            <Col lg={12}>
              <div className="my-lg-5 my-4">
                <p className="text-justify">Gymnastics develops a unique combination of strength, flexibility, balance, coordination, agility, mobility, and body awareness. It requires control over your body and teaches you how to move with precision.</p>
                <p className="text-justify">Training can include fundamental movements as well as progressively challenging skills. Gymnastics can benefit people of different fitness levels by helping them develop better movement patterns, stability, flexibility, and physical confidence.</p>
                <p className="text-justify">Beyond physical strength, gymnastics encourages patience and concentration. Learning a new movement takes practice, consistency, and determination, making it a rewarding discipline for anyone who enjoys challenging themselves.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  )
}

export default Gymnastics