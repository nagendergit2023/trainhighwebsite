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
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Link } from "react-router-dom";
import Hero from './../../Components/Hero/Hero.js';

function Training() {
    
    return (
        <>
        {/* {window.location.pathname !== "/" ? (
          <Hero />
) : null} */}
        <section className="bg-black text-white py-lg-5 py-3 trainings">
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
            <Col lg={6} className='mb-lg-4 mb-3 position-relative'>
            <img className='img-fluid rounded' src={BoxingTraining} />
            <h1 className='text-effect'>Boxing</h1>
            </Col>
            <Col lg={6} className='mb-lg-4 mb-3 position-relative'>
            <img className='img-fluid rounded' src={CrossfitTraining} />
            <h1 className='text-effect'>Crossfit</h1>
            </Col>
            <Col lg={6} className='mb-lg-4 mb-3 position-relative'>
            <img className='img-fluid rounded' src={Aerobics} />
            <h1 className='text-effect'>Aerobics</h1>
            </Col>
            <Col lg={6} className='mb-lg-4 mb-3 position-relative'>
            <img className='img-fluid rounded' src={StrengthTraining} />
            <h1 className='text-effect'>Strength</h1>
            </Col>
            <Col lg={6} className='mb-lg-4 mb-3 position-relative'>
            <img className='img-fluid rounded' src={YogaTraining} />
            <h1 className='text-effect'>Yoga</h1>
            </Col>
            <Col lg={6} className='mb-lg-4 mb-3 position-relative'>
            <img className='img-fluid rounded' src={RopeClimbing} />
            <h1 className='text-effect'>Ropes</h1>
            </Col>
            <Col lg={6} className='mb-lg-4 mb-3 position-relative'>
            <img className='img-fluid rounded' src={WallClimbing} />
            <h1 className='text-effect'>Wall Climbing</h1>
            </Col>
            <Col lg={6} className='mb-lg-4 mb-3 position-relative'>
            <img className='img-fluid rounded' src={PilatesTraining} />
            <h1 className='text-effect'>Pilates</h1>
            </Col>
            </Row>
            </Container>
        </section>
        </>
        
    )
}

export default Training;