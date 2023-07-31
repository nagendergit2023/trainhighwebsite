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

function Trainers() {
  return (
    <section className="bg-light pt-lg-5 pb-lg-2 pt-3 pb-3">
    <Container fluid>
        <Swiper
            slidesPerView={7}
            spaceBetween={2}
            pagination={{
                clickable: true,
            }}
            modules={[Pagination]}
            className="mySwiper text-center pb-5"
        >
            <SwiperSlide>
                <Link to="/">
                    <Card>
                        <Card.Img variant="top" src={BoxingTraining} />                        
                    </Card></Link>
            </SwiperSlide>
            <SwiperSlide>
                <Link to="/">
                    <Card>
                        <Card.Img variant="top" src={CrossfitTraining} />                       
                    </Card>
                </Link>
            </SwiperSlide>
            <SwiperSlide>
                <Link to="/">
                    <Card>
                        <Card.Img variant="top" src={CardioTraining} />
                    </Card>
                </Link>
            </SwiperSlide>
            <SwiperSlide>
                <Link to="/">
                    <Card>
                        <Card.Img variant="top" src={StrengthTraining} />
                    </Card>
                </Link>
            </SwiperSlide>
            <SwiperSlide>
                <Link to="/">
                    <Card>
                        <Card.Img variant="top" src={BoxingTraining} />
                    </Card>
                </Link>
            </SwiperSlide>
            <SwiperSlide>
                <Link to="/">
                    <Card>
                        <Card.Img variant="top" src={CrossfitTraining} />
                    </Card>
                </Link>
            </SwiperSlide>
            <SwiperSlide>
                <Link to="/">
                    <Card>
                        <Card.Img variant="top" src={CardioTraining} />
                    </Card>
                </Link>
            </SwiperSlide>
            <SwiperSlide>
                <Link to="/">
                    <Card>
                        <Card.Img variant="top" src={StrengthTraining} />
                    </Card>
                </Link>
            </SwiperSlide>
        </Swiper>

    </Container>
</section>
  )
}

export default Trainers