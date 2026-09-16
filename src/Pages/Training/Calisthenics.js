import React from 'react';
import { Container } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import Calisthenics from "../../assets/images/trainings/calisthenics.jpg";

function Cardio() {
  return (
    <>
      <section>
        <Container>
          <Row className="justify-content-center mt-5">
            <Col lg={12}>
              <h2 className="section-title">Calisthenics</h2>
              <p className="text-center px-lg-5 px-2 mb-4">
                Build incredible strength, balance, flexibility, and body control using nothing but your own body.
              </p>
            </Col>
          </Row>
        </Container>
        <Container>
          <Row className="justify-content-center ">
            <Col lg={12}>
              <img src={Calisthenics} className="img-fluid w-100 rounded " alt="" />
            </Col>
            <Col lg={12}>
              <div className="my-lg-5 my-4">
                <p className="text-justify">Calisthenics is all about mastering your own body. Using exercises such as push-ups, pull-ups, dips, squats, holds, and advanced bodyweight movements, calisthenics develops functional strength, balance, flexibility, mobility, and body control.</p>
                <p className="text-justify">Unlike traditional resistance training, calisthenics places a strong emphasis on controlling your body through space. As you progress, basic movements can develop into more advanced skills that require significant strength, coordination, and stability.</p>
                <p className="text-justify">It is an ideal training style for anyone who wants to become stronger while improving movement quality and physical control. With consistent practice, calisthenics can help you build a capable, athletic, and well-balanced body.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  )
}

export default Cardio