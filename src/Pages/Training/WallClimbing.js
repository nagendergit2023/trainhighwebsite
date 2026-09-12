import React from 'react'
import Hero from "../../Components/Hero/Hero.js"
import { Container } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import WallTraining from "../../assets/images/trainings/wall_climbing.jpg";

function WallClimbing() {
  return (
    <>
    <section>      
       <Container>
                <Row className="justify-content-center mt-5">
                  <Col lg={12}>
                    <h2 className="section-title">Wall Climbing</h2>
                    <p className="text-center px-lg-5 px-2 mb-5">
                      Challenge your strength, agility, grip, and endurance as you climb beyond your limits.
                    </p>
                  </Col>
                </Row>
              </Container>
      <Container>
        <Row className="justify-content-center ">
          <Col lg={12}>
           <img  src={WallTraining} className="img-fluid w-100 rounded " alt="" />
          </Col>
          <Col lg={12}>
            <div className="my-lg-2 my-4">
            <p className="text-justify">Wall climbing combines strength, agility, balance, coordination, grip, and problem-solving. Every route presents a different challenge, requiring you to think about where to place your hands and feet while controlling your body.</p>
            <p className="text-justify">Climbing engages the upper body, core, and lower body while challenging your ability to maintain balance and control. It can also be mentally engaging because successfully completing a route requires concentration and strategic movement.</p>
            <p className="text-justify">Whether you are attempting your first climb or working toward more challenging routes, wall climbing offers a unique way to train your body while having fun and pushing your limits.</p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
    </>
    
  )
}

export default WallClimbing