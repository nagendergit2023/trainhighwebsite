import React from 'react';
import { Container,Row,Col } from 'react-bootstrap';
import Hero from "../../Components/Hero/Hero.js";
import CardioTraining from "../../assets/images/trainings/cardio_training.png";

function About() {
  return (
    <>
    {window.location.pathname !== "/home" ? (
          <Hero />
) : null}    
    <section className="py-lg-5 py-3">      
      <Container>
        <Row className="justify-content-center ">
          <Col lg={6}>
           <img  src={CardioTraining} className="img-fluid w-100 rounded " alt="" />
          </Col>
          <Col lg={6}>
            <div className="my-lg-2 my-4">
            <p className="text-capitalize fw-bold">our mission</p>
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

export default About;