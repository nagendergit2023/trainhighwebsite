import React from 'react'
import Hero from "../../Components/Hero/Hero.js"
import { Container } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import BoxingTraining from "../../assets/images/trainings/boxing.jpg";

function Boxing() {
  return (
    <>
    <section>
      <Container>
                <Row className="justify-content-center mt-5">
                  <Col lg={12}>
                    <h2 className="section-title">Boxing</h2>
                    <p className="text-center px-lg-5 px-2 mb-4">
                      Master the art of boxing with expert training, professional equipment, and a fighter’s mindset.
                    </p>
                  </Col>
                </Row>
              </Container>      
      <Container>
        <Row className="justify-content-center ">
          <Col lg={12}>
           <img  src={BoxingTraining} className="img-fluid w-100 rounded " alt="" />
          </Col>
          <Col lg={12}>
            <div className="my-lg-5 my-4">
            <p className="text-justify">Boxing is an excellent full-body workout that combines strength, speed, endurance, coordination, and mental discipline. At Train High Gym, boxing training focuses on developing proper technique, footwork, punching combinations, defensive movements, conditioning, and overall body control.</p>
            <p className="text-justify">Every session can challenge multiple aspects of fitness, from cardiovascular endurance and muscular strength to reaction time and coordination. Boxing also provides an effective way to release stress, improve confidence, and develop mental toughness.</p>
            <p className="text-justify">Whether you are interested in learning the fundamentals, improving your fitness, or developing your boxing skills, our training environment gives you the opportunity to progress at your own pace while continuously challenging your limits.</p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
    </>
    
  )
}

export default Boxing