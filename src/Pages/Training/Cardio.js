import React from 'react'
import { Container } from 'react-bootstrap';
import Hero from './../../Components/Hero/Hero.js';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import CardioTraining from "../../assets/images/trainings/cardio_training.jpg";

function Cardio() {
  return (
    <>
    <Hero />
    <section className="py-lg-5 py-3">      
      <Container>
        <Row className="justify-content-center ">
          <Col lg={6}>
           <img  src={CardioTraining} className="img-fluid w-100 rounded " alt="" />
          </Col>
          <Col lg={6}>
            <div className="my-lg-2 my-4">
            <p className="text-capitalize fw-bold">Cardio Training</p>
            <p className="text-justify">Lorem ipsum dolor sit amet, consectetur  elit. Quisque eget augue. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eget augue. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eget augue. Lorem dolor sit amet, adipiscing elit. Quisque eget ipsum dolor sit amet, consectetur adipiscing elit. Quisque eget augue.</p>
            <p className="text-justify">Lorem ipsum dolor sit amet, consectetur  elit. Quisque eget augue. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eget augue. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <p className="text-justify">Lorem ipsum dolor sit amet, consectetur  elit. Quisque eget augue. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eget augue. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eget augue. Lorem dolor sit amet, adipiscing elit. Quisque eget ipsum dolor sit amet, consectetur adipiscing elit. Quisque eget augue.</p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
    </>
  )
}

export default Cardio