import React from 'react';
import { Container } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import RopeTraining from "../../assets/images/trainings/rope_climbing.jpg";

function RopeClimbing() {
  return (
    <>
    <section>
       <Container>
                <Row className="justify-content-center mt-5">
                  <Col lg={12}>
                    <h2 className="section-title">Rope Climbing</h2>
                    <p className="text-center px-lg-5 px-2 mb-4">
                      Build powerful grip strength, upper-body endurance, and total-body control with every climb.
                    </p>
                  </Col>
                </Row>
              </Container>      
      <Container>
        <Row className="justify-content-center ">
          <Col lg={12}>
           <img  src={RopeTraining} className="img-fluid w-100 rounded " alt="" />
          </Col>
          <Col lg={12}>
            <div className="my-lg-5 my-4">
            <p className="text-justify">Rope climbing is a demanding functional activity that challenges your grip, upper-body strength, core stability, coordination, and endurance. Every climb requires you to control your body while using strength and technique to move upward.</p>
            <p className="text-justify">It is not simply about pulling yourself toward the top. Efficient rope climbing requires proper grip, body positioning, coordination, and controlled movement. With practice, you can progressively improve your strength and climbing ability.</p>
            <p className="text-justify">Rope climbing is a great addition to functional fitness because it challenges multiple muscle groups while testing your determination and endurance.</p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
    </>
    
  )
}

export default RopeClimbing