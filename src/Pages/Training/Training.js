import React, { useEffect } from 'react';
import WOW from 'wowjs';
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
import './animate.css';

function Training() {

   useEffect(() => {
        new WOW.WOW({
          live: false,
        }).init();
      }, []); 

    return (
        <>
        <section className="bg-black text-white py-lg-5 py-3 trainings">
            <Container>
                <Row className="justify-content-center">
                    <Col lg={9} className="wow fadeInUp" data-wow-delay="0.2s">
                        <h2 className="section-title">our trainings</h2>
                        <p className="text-center px-lg-5 px-2 mb-5">
                            Choose training that matches your goals. Whether for muscle-building, fitness, perfect shape or learning something new, the right training helps you to achieve your goal.
                        </p>
                    </Col>
                </Row>
            </Container>

            <Container>
                <Row className="justify-content-center">

                    <Col lg={6} className='mb-lg-4 mb-3 position-relative wow animate__fadeInUp' data-wow-delay="0.1s">
                        <Link to='/boxing' className='text-white'>
                            <img className='img-fluid rounded' src={BoxingTraining} />
                            <h1 className='text-effect'>Boxing</h1>
                        </Link>
                    </Col>

                    <Col lg={6} className='mb-lg-4 mb-3 position-relative wow animate__fadeInUp' data-wow-delay="0.2s">
                        <Link to='/crossfit' className='text-white'>
                            <img className='img-fluid rounded' src={CrossfitTraining} />
                            <h1 className='text-effect'>Crossfit</h1>
                        </Link>
                    </Col>

                    <Col lg={6} className='mb-lg-4 mb-3 position-relative wow animate__fadeInUp' data-wow-delay="0.3s">
                        <Link to='/calesthanics' className='text-white'>
                            <img className='img-fluid rounded' src={CalisthenicsTraining} />
                            <h1 className='text-effect'>Calesthanics</h1>
                        </Link>
                    </Col>

                    <Col lg={6} className='mb-lg-4 mb-3 position-relative wow animate__fadeInUp' data-wow-delay="0.4s">
                        <Link to='/gymnatics' className='text-white'>
                            <img className='img-fluid rounded' src={GymnasticsTraining} />
                            <h1 className='text-effect'>Gymnatics</h1>
                        </Link>
                    </Col>

                    <Col lg={6} className='mb-lg-4 mb-3 position-relative wow animate__fadeInUp' data-wow-delay="0.5s">
                        <Link to='/pilates' className='text-white'>
                            <img className='img-fluid rounded' src={PilatesTraining} />
                            <h1 className='text-effect'>Pilates</h1>
                        </Link>
                    </Col>

                    <Col lg={6} className='mb-lg-4 mb-3 position-relative wow animate__fadeInUp' data-wow-delay="0.6s">
                        <Link to='/strength' className='text-white'>
                            <img className='img-fluid rounded' src={StrengthTraining} />
                            <h1 className='text-effect'>Strength</h1>
                        </Link>
                    </Col>

                    <Col lg={6} className='mb-lg-4 mb-3 position-relative wow animate__fadeInUp' data-wow-delay="0.7s">
                        <Link to='/yoga' className='text-white'>
                            <img className='img-fluid rounded' src={YogaTraining} />
                            <h1 className='text-effect'>Yoga</h1>
                        </Link>
                    </Col>

                    <Col lg={6} className='mb-lg-4 mb-3 position-relative wow animate__fadeInUp' data-wow-delay="0.8s">
                        <Link to='/ropes' className='text-white'>
                            <img className='img-fluid rounded' src={RopeClimbing} />
                            <h1 className='text-effect'>Ropes</h1>
                        </Link>
                    </Col>

                    <Col lg={6} className='mb-lg-4 mb-3 position-relative wow animate__fadeInUp' data-wow-delay="0.9s">
                        <Link to='/wall-climbing' className='text-white'>
                            <img className='img-fluid rounded' src={WallClimbing} />
                            <h1 className='text-effect'>Wall Climbing</h1>
                        </Link>
                    </Col>

                    <Col lg={6} className='mb-lg-4 mb-3 position-relative wow animate__fadeInUp' data-wow-delay="1.0s">
                        <Link to='/group-classes' className='text-white'>
                            <img className='img-fluid rounded' src={Aerobics} />
                            <h1 className='text-effect'>Group Classes</h1>
                        </Link>
                    </Col>

                    <Col lg={6} className='mb-lg-4 mb-3 position-relative wow animate__fadeInUp' data-wow-delay="1.1s">
                        <Link to='/taekwondo' className='text-white'>
                            <img className='img-fluid rounded' src={TaekwondoTraining} />
                            <h1 className='text-effect'>Taekwondo</h1>
                        </Link>
                    </Col>

                    <Col lg={6} className='mb-lg-4 mb-3 position-relative wow animate__fadeInUp' data-wow-delay="1.2s">
                        <Link to='/kids-fitness' className='text-white'>
                            <img className='img-fluid rounded' src={KidsFitness} />
                            <h1 className='text-effect'>Kids</h1>
                        </Link>
                    </Col>

                </Row>
            </Container>
        </section>
        </>
    );
}

export default Training;
