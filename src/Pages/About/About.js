import React from 'react';
import { Container,Row,Col } from 'react-bootstrap';
import Hero from "../../Components/Hero/Hero.js";
import AbouTrainHighGym from "../../assets/images/trainings/about_trainhigh.png";

function About() {
  return (
    <>
    {/* {window.location.pathname !== "/" ? (
          <Hero />
) : null}     */}
    <section className="py-lg-5 py-3">      
      <Container>
        <Row className="justify-content-center align-items-center">
          <Col lg={6}>
           <img  src={AbouTrainHighGym} className="img-fluid w-100 rounded " alt="" />
          </Col>
          <Col lg={6}>
            <div className="my-lg-0 my-2">
            <h2 className="section-title text-start">welcome to<br/>train high gym</h2>
            <p className="text-justify mb-lg-1 mb-3">The ultimate fitness destination in Janakpuri, New Delhi. Spanning an impressive 20,000 square feet, Train High Gym is one of the largest and most advanced fitness facilities in India. With Cutting-Edge Equipment, Expert Trainers, and a Welcoming Environment, we aim to provide a Premium Fitness experience for everyone, from beginners to seasoned athletes.</p>
            <p className="text-justify mb-lg-1 mb-3">Our mission is to redefine the fitness industry by creating a gym that offers all the essential amenities, ensuring a comprehensive and fulfilling workout experience. We are committed to building a fitness community that inspires and empowers individuals to achieve their health and fitness goals.</p>
            <p className="text-justify mb-lg-1 mb-3">At Train High Gym, our ultimate goal is to become a global fitness leader by opening the world’s biggest gym. We strive to set a new benchmark in the fitness industry, making world-class fitness facilities accessible to all.</p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
    </>
    
  )
}

export default About;