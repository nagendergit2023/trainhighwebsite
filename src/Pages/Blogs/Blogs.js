import React from 'react'
import { Card, Col, Container, Row } from "react-bootstrap";
import CrossfitTraining from "../../assets/images/trainings/crossfit_training.jpg";
import "./Blogs.css";

function Blogs() {
  return (
    <>
    <section className="py-lg-5 py-3">
           <Container>
             <Row className="justify-content-center align-items-center">
               {/* <Col lg={6}>
              <img  src={CardioTraining} className="img-fluid w-100 rounded " alt="" />
             </Col> */}
               <Col lg={12}>
                 <div className="my-lg-0 my-2">
                   <h2 className="section-title text-center">Guide. Support. Unite.</h2>
                   <p className='text-center px-lg-5 px-2 mb-5'>Achieve your fitness goals with expert coaching and a supportive community.</p>
                   </div>
          </Col>
        </Row>
        <Row>
          <Col lg={4}>
          <Card className='border-0 rounded overflow-hidden'>
      <Card.Img variant="top" src={CrossfitTraining}  />
      <Card.Body className='bg-light'>
        <Card.Title className='fw-bold'>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <a href='#'>Read more..</a>
      </Card.Body>
    </Card>
          </Col>
          <Col lg={4}>
          <Card className='border-0 rounded overflow-hidden'>
      <Card.Img variant="top" src={CrossfitTraining}  />
      <Card.Body className='bg-light'>
        <Card.Title className='fw-bold'>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <a href='#'>Read more..</a>
      </Card.Body>
    </Card>
          </Col>
          <Col lg={4}>
          <Card className='border-0 rounded overflow-hidden'>
      <Card.Img variant="top" src={CrossfitTraining}  />
      <Card.Body className='bg-light'>
        <Card.Title className='fw-bold'>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <a href='#'>Read more..</a>
      </Card.Body>
    </Card>
          </Col>
        </Row>
      </Container>
    </section>
    </>    
  )
}

export default Blogs;