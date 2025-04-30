import React from 'react';
import { Card, Col, Container, Row } from "react-bootstrap";
import BoxingTraining from "../../assets/images/trainings/boxing.jpg";
import CrossfitTraining from "../../assets/images/trainings/crossfit_training.jpg";
import CardioTraining from "../../assets/images/trainings/cardio_training.jpg";
import StrengthTraining from "../../assets/images/trainings/strength_training.jpg";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import { Link } from "react-router-dom";

function Trainers() {
  return (
    <section className="bg-light pt-lg-2 pb-lg-2 pt-3 pb-3">
    <Container fluid>
        <Swiper
             breakpoints={{
                390: {
                    width: 390,
                    slidesPerView: 4,
                  }, 
                640: {
                  width: 640,
                  slidesPerView: 5,
                },                        
                1600: {
                  width: 1600,
                  slidesPerView: 8,
                },
              }}
              autoplay={true}
            spaceBetween={3}
            // pagination={{
            //     clickable: true,
            // }}
            modules={[Autoplay]}
            className="mySwiper text-center"
            showsPagination={false}
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