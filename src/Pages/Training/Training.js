import React, { useEffect } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import BoxingTraining from "../../assets/images/trainings/boxing.jpg";
import CrossfitTraining from "../../assets/images/trainings/crossfit_training.jpg";
import Aerobics from "../../assets/images/trainings/aerobics_dance.jpg";
import StrengthTraining from "../../assets/images/trainings/strength_training.jpg";
import YogaTraining from "../../assets/images/trainings/yoga.jpg";
import RopeClimbing from "../../assets/images/trainings/rope_climbing.jpg";
import WallClimbing from "../../assets/images/trainings/wall_climbing.jpg";
import PilatesTraining from "../../assets/images/trainings/pilates.jpg";
import TaekwondoTraining from "../../assets/images/trainings/taekwondo.jpg";
import CalisthenicsTraining from "../../assets/images/trainings/calisthenics.jpg";
import GymnasticsTraining from "../../assets/images/trainings/gymnastics.jpg";
import KidsFitness from "../../assets/images/trainings/kids_fitness.jpg";
import { Link } from "react-router-dom";

function Training() {
  return (
    <>
      <section className="bg-black text-white py-lg-5 py-3 trainings">
        <Container>
          <Row className="justify-content-center">
            <Col lg={9}>
              <h2 className="section-title">our trainings</h2>
              <p className="text-center px-lg-5 px-2 mb-5">
                Choose training that matches your goals. Whether for
                muscle-building, fitness, perfect shape or learning something
                new, the right training helps you to achieve your goal.
              </p>
            </Col>
          </Row>
        </Container>

        <Container>
          <Row className="justify-content-center">
            <Col
              xs={6}
              md={6}
              lg={4}
              className="mb-lg-4 mb-3 position-relative wow animate__fadeInUp"
              data-wow-delay="0.1s"
            >
              <Link to="" className="text-white">
                <img className="img-fluid rounded" src={BoxingTraining} />
                <h3 className="text-effect">Boxing</h3>
              </Link>
            </Col>

            <Col
              xs={6}
              md={6}
              lg={4}
              className="mb-lg-4 mb-3 position-relative wow animate__fadeInUp"
              data-wow-delay="0.2s"
            >
              <Link to="" className="text-white">
                <img className="img-fluid rounded" src={CrossfitTraining} />
                <h3 className="text-effect">Crossfit</h3>
              </Link>
            </Col>

            <Col
              xs={6}
              md={6}
              lg={4}
              className="mb-lg-4 mb-3 position-relative wow animate__fadeInUp"
              data-wow-delay="0.3s"
            >
              <Link to="" className="text-white">
                <img className="img-fluid rounded" src={CalisthenicsTraining} />
                <h3 className="text-effect">Calesthanics</h3>
              </Link>
            </Col>

            <Col
              xs={6}
              md={6}
              lg={4}
              className="mb-lg-4 mb-3 position-relative wow animate__fadeInUp"
              data-wow-delay="0.4s"
            >
              <Link to="" className="text-white">
                <img className="img-fluid rounded" src={GymnasticsTraining} />
                <h3 className="text-effect">Gymnatics</h3>
              </Link>
            </Col>

            <Col
              xs={6}
              md={6}
              lg={4}
              className="mb-lg-4 mb-3 position-relative wow animate__fadeInUp"
              data-wow-delay="0.5s"
            >
              <Link to="" className="text-white">
                <img className="img-fluid rounded" src={PilatesTraining} />
                <h3 className="text-effect">Pilates</h3>
              </Link>
            </Col>

            <Col
              xs={6}
              md={6}
              lg={4}
              className="mb-lg-4 mb-3 position-relative wow animate__fadeInUp"
              data-wow-delay="0.6s"
            >
              <Link to="" className="text-white">
                <img className="img-fluid rounded" src={StrengthTraining} />
                <h3 className="text-effect">Strength</h3>
              </Link>
            </Col>

            <Col
              xs={6}
              md={6}
              lg={4}
              className="mb-lg-4 mb-3 position-relative wow animate__fadeInUp"
              data-wow-delay="0.7s"
            >
              <Link to="" className="text-white">
                <img className="img-fluid rounded" src={YogaTraining} />
                <h3 className="text-effect">Yoga</h3>
              </Link>
            </Col>

            <Col
              xs={6}
              md={6}
              lg={4}
              className="mb-lg-4 mb-3 position-relative wow animate__fadeInUp"
              data-wow-delay="0.8s"
            >
              <Link to="" className="text-white">
                <img className="img-fluid rounded" src={RopeClimbing} />
                <h3 className="text-effect">Ropes</h3>
              </Link>
            </Col>

            <Col
              xs={6}
              md={6}
              lg={4}
              className="mb-lg-4 mb-3 position-relative wow animate__fadeInUp"
              data-wow-delay="0.9s"
            >
              <Link to="" className="text-white">
                <img className="img-fluid rounded" src={WallClimbing} />
                <h3 className="text-effect">Wall Climbing</h3>
              </Link>
            </Col>

            <Col
              xs={6}
              md={6}
              lg={4}
              className="mb-lg-4 mb-3 position-relative wow animate__fadeInUp"
              data-wow-delay="1.0s"
            >
              <Link to="" className="text-white">
                <img className="img-fluid rounded" src={Aerobics} />
                <h3 className="text-effect">Group Classes</h3>
              </Link>
            </Col>

            <Col
              xs={6}
              md={6}
              lg={4}
              className="mb-lg-4 mb-3 position-relative wow animate__fadeInUp"
              data-wow-delay="1.1s"
            >
              <Link to="" className="text-white">
                <img className="img-fluid rounded" src={TaekwondoTraining} />
                <h3 className="text-effect">Taekwondo</h3>
              </Link>
            </Col>

            <Col
              xs={6}
              md={6}
              lg={4}
              className="mb-lg-4 mb-3 position-relative wow animate__fadeInUp"
              data-wow-delay="1.2s"
            >
              <Link to="" className="text-white">
                <img className="img-fluid rounded" src={KidsFitness} />
                <h3 className="text-effect">Kids</h3>
              </Link>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default Training;
