import React from "react";
import Hero from "./../../Components/Hero/Hero.js";
import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import StrengthTraining from "../../assets/images/trainings/strength_training.jpg";

function Strength() {
  return (
    <>
      <section>
        <Container>
          <Row className="justify-content-center mt-5">
            <Col lg={12}>
              <h2 className="section-title">Strength</h2>
              <p className="text-center px-lg-5 px-2 mb-4">
                Build muscle, increase power, and unlock your full physical potential with focused strength training.
              </p>
            </Col>
          </Row>
        </Container>
        <Container>
          <Row className="justify-content-center">
            <Col lg={12}>
              <img
                src={StrengthTraining}
                className="img-fluid w-100 rounded "
                alt=""
              />
            </Col>
            <Col lg={12}>
              <div className="my-lg-5 my-4">
                <p className="text-justify">
                  Strength training forms the foundation of many fitness goals. It helps build muscle, improve physical strength, increase power, support better movement, and develop a stronger physique.
                </p>
                <p className="text-justify">
                 Our strength training approach focuses on resistance exercises, progressive development, proper technique, and consistent training. Whether you are new to weight training or have years of experience, structured strength workouts can help you continuously improve.
                </p>
                <p className="text-justify">
                 Strength training is not only about lifting heavier weights. It is about developing control, stability, technique, muscular endurance, and functional strength. With the right approach, it can become one of the most valuable components of a long-term fitness lifestyle.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default Strength;
