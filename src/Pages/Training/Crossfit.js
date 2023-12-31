import React from 'react'
import Hero from './../../Components/Hero/Hero.js';
import { Container } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import CrossfitTraining from "../../assets/images/trainings/crossfit_training.png";

function Crossfit() {
  return (
    <>
    <Hero />
    <section className="py-lg-5 py-3">      
      <Container>
        <Row className="justify-content-center ">
          <Col lg={6}>
           <img  src={CrossfitTraining} className="img-fluid w-100 rounded " alt="" />
          </Col>
          <Col lg={6}>
            <div className="my-lg-2 my-4">
            <p className="text-capitalize fw-bold">Crossfit Training</p>
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

export default Crossfit