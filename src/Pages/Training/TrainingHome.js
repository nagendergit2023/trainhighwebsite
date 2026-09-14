import React from "react";
import { Col, Container, Row } from "react-bootstrap";

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
import { Link } from "react-router-dom";

const trainings = [
    {
        name: "Boxing",
        image: BoxingTraining,
        alt: "Boxing Training",
         slug: "boxing"
    },
    {
        name: "CrossFit",
        image: CrossfitTraining,
        alt: "CrossFit Training",
         slug: "crossfit"
    },
    {
        name: "Calisthenics",
        image: CalisthenicsTraining,
        alt: "Calisthenics Training",
        slug: "calisthenics" 
    },
    {
        name: "Gymnastics",
        image: GymnasticsTraining,
        alt: "Gymnastics Training",
        objectPosition: "bottom",
        slug: "gymnastics"
    },
    {
        name: "Pilates",
        image: PilatesTraining,
        alt: "Pilates Training",
        slug: "pilates" 
    },
    {
        name: "Strength",
        image: StrengthTraining,
        alt: "Strength Training",
        slug: "strength-training"
    },
    {
        name: "Yoga",
        image: YogaTraining,
        alt: "Yoga Training",
         slug: "yoga"
    },
    {
        name: "Ropes",
        image: RopeClimbing,
        alt: "Rope Climbing Training",
        slug: "rope-climbing"
    },
    {
        name: "Wall Climbing",
        image: WallClimbing,
        alt: "Wall Climbing Training",
        slug: "wall-climbing"
    },
    {
        name: "Group",
        image: Aerobics,
        alt: "Group Fitness Classes",
         slug: "group-classes"
    },
    {
        name: "Taekwondo",
        image: TaekwondoTraining,
        alt: "Taekwondo Training",
        slug: "taekwondo" 
    },
    {
        name: "Kids",
        image: KidsFitness,
        alt: "Kids Fitness Training",
        slug: "kids-fitness"
    },
];

function TrainingHome() {
    return (
        <section className="bg-white text-dark py-lg-5 py-3 trainings-inner">
            {/* Section Heading */}
            <Container>
                <Row className="justify-content-center">
                    <Col lg={9}>
                        <h2 className="section-title">Our Trainings</h2>

                        <p className="text-center px-lg-5 px-2 mb-5">
                            Choose training that matches your goals. Whether you're
                            looking to build muscle, improve fitness, get in perfect
                            shape, or learn something new, the right training helps
                            you achieve your goals.
                        </p>
                    </Col>
                </Row>
            </Container>

            {/* Training Cards */}
            <Container>
                <Row className="justify-content-center">
                   {trainings.map((training) => (
    <Col
        key={training.name}
        xs={12}
        lg={4}
        className="mb-lg-4 mb-3"
    >
        <Link
            to={`/trainings/${training.slug}`}
                  key={training.slug}
            className="d-block position-relative training-image-wrapper text-decoration-none"
        >
            <img
                src={training.image}
                alt={training.alt}
                className="img-fluid rounded"
            />

            <h2 className="text-effect text-white">
                {training.name}
            </h2>
        </Link>
    </Col>
))}
                </Row>
            </Container>
        </section>
    );
}

export default TrainingHome;