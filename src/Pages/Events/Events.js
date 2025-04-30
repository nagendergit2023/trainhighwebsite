import React from 'react'
import { Card, Col, Container, Row } from "react-bootstrap";
import CrossfitTraining from "../../assets/images/trainings/crossfit_training.jpg";
import "./Events.css";

function Events() {
  return (
    <>
      {/* <section className="py-lg-5 py-3">
        <Container>
          <Row className="justify-content-center align-items-center">
            <Col lg={12}>
              <div className="my-lg-0 my-2">
                <h2 className="section-title text-center">Events & Gallery</h2>
                <p className='text-center px-lg-5 px-2 mb-5'>Unforgettable experiences and cherished memories captured in stunning moments and celebrations.</p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={4}>
              <Card className='border-0 bg-light'>
                <Card.Img variant="top" src={CrossfitTraining} />
                <Card.Body>
                  <Card.Title className='mb-0'>Mountain Camp</Card.Title>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={4}>
              <Card className='border-0 bg-light'>
                <Card.Img variant="top" src={CrossfitTraining} />
                <Card.Body>
                  <Card.Title className='mb-0'>Strength Competition</Card.Title>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={4}>
              <Card className='border-0 bg-light'>
                <Card.Img variant="top" src={CrossfitTraining} />
                <Card.Body>
                  <Card.Title className='mb-0'>Fitness Camp</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section> */}
      <section className=''>
      <Container>
        <Row>
          <Col lg={12} className='text-center text-dark'>
            <h1>Sorry, No events at this moment!</h1>
          </Col>
        </Row>
      </Container>
    </section>
    </>
  )
}

export default Events;