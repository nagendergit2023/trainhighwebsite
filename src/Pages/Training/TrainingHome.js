import React from 'react'
import { Card, Col, Container, Row } from "react-bootstrap";
import BoxingTraining from "../../assets/images/trainings/boxing.jpg";
import CrossfitTraining from "../../assets/images/trainings/crossfit_training.jpg";
import Aerobics from "../../assets/images/trainings/aerobics_dance.jpg";
import StrengthTraining from "../../assets/images/trainings/strength_training.jpg";
import YogaTraining from "../../assets/images/trainings/yoga.jpg";
import RopeClimbing from "../../assets/images/trainings/rope_climbing.jpg";
import WallClimbing from "../../assets/images/trainings/wall_climbing.jpg";
import PilatesTraining from "../../assets/images/trainings/pilates.jpg";
import KidsFitness from "../../assets/images/trainings/kids_fitness.jpg";
import TaekwondoTraining from "../../assets/images/trainings/taekwondo.jpg";
import CalisthenicsTraining from "../../assets/images/trainings/calisthenics.jpg";
import GymnasticsTraining from "../../assets/images/trainings/gymnastics.jpg";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Link } from "react-router-dom";
import Hero from '../../Components/Hero/Hero.js';

function TrainingHome() {

    return (
        <>
            {/* {window.location.pathname !== "/" ? (
          <Hero />
) : null} */}
            <section className="bg-white text-dark py-lg-5 py-3 trainings-inner">
                <Container>
                    <Row className="justify-content-center ">
                        <Col lg={9}>
                            <h2 className="section-title">our trainings</h2>
                            <p className="text-center px-lg-5 px-2 mb-5">
                                Choose training that matches your goals. Whether for muscle-building, fitness, perfect shape or learning something new, the right training helps you to achieve your goal.
                            </p>
                        </Col>
                    </Row>
                </Container>

                <Container>
                    <Row className="justify-content-center ">
                        <Col lg={4} className='mb-lg-4 mb-3 position-relative'>
                            <img className='img-fluid rounded' src={BoxingTraining} />
                            <h1 className='text-effect text-white'>Boxing</h1>
                        </Col>
                        <Col lg={4} className='mb-lg-4 mb-3 position-relative'>
                            <img className='img-fluid rounded' src={CrossfitTraining} />
                            <h1 className='text-effect text-white'>Crossfit</h1>
                        </Col>
                        <Col lg={4} className='mb-lg-4 mb-3 position-relative'>
                            <img className='img-fluid rounded' src={CalisthenicsTraining} />
                            <h1 className='text-effect text-white'>Calesthanics</h1>
                        </Col>
                        <Col lg={4} className='mb-lg-4 mb-3 position-relative'>
                            <img className='img-fluid rounded' src={GymnasticsTraining} />
                            <h1 className='text-effect text-white'>Gymnatics</h1>
                        </Col>
                        <Col lg={4} className='mb-lg-4 mb-3 position-relative'>
                            <img className='img-fluid rounded' src={PilatesTraining} />
                            <h1 className='text-effect text-white'>Pilates</h1>
                        </Col>
                        <Col lg={4} className='mb-lg-4 mb-3 position-relative'>
                            <img className='img-fluid rounded' src={StrengthTraining} />
                            <h1 className='text-effect text-white'>Strength</h1>
                        </Col>
                        <Col lg={4} className='mb-lg-4 mb-3 position-relative'>
                            <img className='img-fluid rounded' src={YogaTraining} />
                            <h1 className='text-effect text-white'>Yoga</h1>
                        </Col>
                        <Col lg={4} className='mb-lg-4 mb-3 position-relative'>
                            <img className='img-fluid rounded' src={RopeClimbing} />
                            <h1 className='text-effect text-white'>Ropes</h1>
                        </Col>
                        <Col lg={4} className='mb-lg-4 mb-3 position-relative'>
                            <img className='img-fluid rounded' src={WallClimbing} />
                            <h1 className='text-effect text-white'>Wall Climbing</h1>
                        </Col>                        
                        <Col lg={4} className='mb-lg-4 mb-3 position-relative'>
                            <img className='img-fluid rounded' src={Aerobics} />
                            <h1 className='text-effect text-white'>Group</h1>
                        </Col>
                        <Col lg={4} className='mb-lg-4 mb-3 position-relative'>
                            <img className='img-fluid rounded' src={TaekwondoTraining} />
                            <h1 className='text-effect text-white'>Taekwondo</h1>
                        </Col>
                        <Col lg={4} className='mb-lg-4 mb-3 position-relative'>
                            <img className='img-fluid rounded' src={KidsFitness} />
                            <h1 className='text-effect text-white'>Kids</h1>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>

    )
}

export default TrainingHome;