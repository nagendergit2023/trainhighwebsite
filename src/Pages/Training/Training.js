import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

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

const items = [
  { img: BoxingTraining, title: "Boxing" },
  { img: CrossfitTraining, title: "Crossfit" },
  { img: CalisthenicsTraining, title: "Calisthenics" },
  { img: GymnasticsTraining, title: "Gymnastics" },
  { img: PilatesTraining, title: "Pilates" },
  { img: StrengthTraining, title: "Strength" },
  { img: YogaTraining, title: "Yoga" },
  { img: RopeClimbing, title: "Rope Climbing" },
  { img: WallClimbing, title: "Wall Climbing" },
  { img: Aerobics, title: "Group Classes" },
  { img: TaekwondoTraining, title: "Taekwondo" },
  { img: KidsFitness, title: "Kids Fitness" },
];

const responsive = {
  mobile: {
    breakpoint: { max: 480, min: 0 },
    items: 2,
  },
  tablet: {
    breakpoint: { max: 768, min: 480 },
    items: 3,
  },
  desktop: {
    breakpoint: { max: 1200, min: 768 },
    items: 4,
  },
  largeDesktop: {
    breakpoint: { max: 3000, min: 1200 },
    items: 4,
  },
};

function Training() {
  return (
    <section className="bg-black text-white py-lg-5 py-5 trainings">
      <Container>
        <Row className="justify-content-center align-items-center">
          <Col lg={8} className="mb-3">
            <h2 className="section-title">our trainings</h2>
            <p className="text-center">
              Choose training that matches your goals. Whether for
              muscle-building, fitness, perfect shape or learning something new,
              the right training helps you to achieve your goal.
            </p>
          </Col>
          <Col lg={12}>
          <Carousel
            responsive={responsive}
            autoPlay
            autoPlaySpeed={2500}
            infinite
            arrows
            showDots={false}
            transitionDuration={500}
            containerClass="pb-10"
            itemClass="px-2"
          >
            {items.map((item, index) => (
              <Link to="" key={index}>
                <div className="shadow-xl overflow-hidden transition-transform position-relative">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="rounded carousel-img"
                  />
                  <div className="py-4 ps-3 text-center bg-transparent text-white carousel-title">
                    <h5 className="text-sm font-semibold tracking-wide">
                      {item.title}
                    </h5>
                  </div>
                </div>
              </Link>
            ))}
          </Carousel>
        </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Training;
