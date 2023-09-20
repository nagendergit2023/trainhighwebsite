import React from 'react'
import { Card, Col, Container, Row } from "react-bootstrap";
import BoxingTraining from "../../assets/images/trainings/boxing.png";
import CrossfitTraining from "../../assets/images/trainings/crossfit_training.png";
import CardioTraining from "../../assets/images/trainings/cardio_training.png";
import StrengthTraining from "../../assets/images/trainings/strength_training.png";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Link } from "react-router-dom";
import Hero from './../../Components/Hero/Hero.js';

function Training() {
    
    return (
        <>
        {window.location.pathname !== "/home" ? (
          <Hero />
) : null}
        <section className="bg-dark text-white py-lg-5 py-3">
            <Container>
                <Row className="justify-content-center ">
                    <Col lg={6}>
                        <h2 className="section-title">our trainings</h2>
                        <p className="text-center px-lg-5 px-2 mb-5">Choose training according to your goal.</p>
                    </Col>
                </Row>
            </Container>

            <Container>
                <Swiper
                    breakpoints={{
                        640: {
                          width: 640,
                          slidesPerView: 1,
                        },                        
                        768: {
                          width: 768,
                          slidesPerView: 3,
                        },
                      }}
                    spaceBetween={30}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Pagination]}
                    className="mySwiper text-center pb-5"
                >
                    <SwiperSlide>
                        <Link to="/boxing-training">
                            <Card>
                                <Card.Img variant="top" src={BoxingTraining} />
                                <Card.Body>
                                    <Card.Title className="text-center mb-0">Boxing</Card.Title>
                                </Card.Body>
                            </Card></Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Link to="/crossfit-training">
                            <Card>
                                <Card.Img variant="top" src={CrossfitTraining} />
                                <Card.Body>
                                    <Card.Title className="text-center mb-0">Crossfit</Card.Title>
                                </Card.Body>
                            </Card>
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Link to="/cardio-training">
                            <Card>
                                <Card.Img variant="top" src={CardioTraining} />
                                <Card.Body>
                                    <Card.Title className="text-center mb-0">Cardio</Card.Title>
                                </Card.Body>
                            </Card>
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Link to="/strength-training">
                            <Card>
                                <Card.Img variant="top" src={StrengthTraining} />
                                <Card.Body>
                                    <Card.Title className="text-center mb-0">Strength</Card.Title>
                                </Card.Body>
                            </Card>
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Link to="/boxing-training">
                            <Card>
                                <Card.Img variant="top" src={BoxingTraining} />
                                <Card.Body>
                                    <Card.Title className="text-center mb-0">Boxing</Card.Title>
                                </Card.Body>
                            </Card></Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Link to="/crossfit-training">
                            <Card>
                                <Card.Img variant="top" src={CrossfitTraining} />
                                <Card.Body>
                                    <Card.Title className="text-center mb-0">Crossfit</Card.Title>
                                </Card.Body>
                            </Card>
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Link to="/cardio-training">
                            <Card>
                                <Card.Img variant="top" src={CardioTraining} />
                                <Card.Body>
                                    <Card.Title className="text-center mb-0">Cardio</Card.Title>
                                </Card.Body>
                            </Card>
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Link to="/strength-training">
                            <Card>
                                <Card.Img variant="top" src={StrengthTraining} />
                                <Card.Body>
                                    <Card.Title className="text-center mb-0">Strength</Card.Title>
                                </Card.Body>
                            </Card>
                        </Link>
                    </SwiperSlide>
                </Swiper>

            </Container>
        </section>
        </>
        
    )
}

export default Training;