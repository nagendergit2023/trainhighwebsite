import React from 'react'
import { Card, Col, Container, Row } from "react-bootstrap";
import FranchiseImage from "../../assets/images/franchise_image.jpg";
import "./Franchise.css";
import { Link } from 'react-router-dom';

function Franchise() {
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
                   <h2 className="section-title text-center">Elevate Fitness, Expand Your Business</h2>
                   <p className='text-center px-lg-5 px-2 mb-5'>Invest in Train High Gym franchise and bring elite fitness to your community!</p>
                   </div>
                   
          </Col>
          <Col lg={12} className='mb-lg-5 mb-4'>
          <div className='text-center mb-lg-5 mb-4'>
          <img src={FranchiseImage} className='img-fluid w-100' />
          </div>
          <div className='mb-lg-5 mb-4'>
            <h5>Fitness is no longer just a hobby — it's a global movement!</h5>
                    <p className=''>
                    Over the past few years, millions of people around the world have embraced fitness as a core part of their lifestyle. From home workouts to gym memberships, yoga classes to running clubs, the focus on personal health and well-being has never been stronger. This growing passion for fitness has led to a massive boom in the global fitness industry and it’s only getting bigger! With more people investing in their health, the industry is set to grow even faster in the near future.
                    </p>
                    <p>Whether you're just getting started or you're already on your fitness journey, there’s never been a better time to be part of this exciting movement.</p>
                    <p>Get ready to be stronger, healthier, and more energized — because the future of fitness is here!</p>
                   </div>
                   <Row>
                    <Col lg={3} className='text-center'>
                    <div>
                      <h2 className='fw-bold'>$87.23 B</h2>
                      <h6>Global Health Club Industry</h6>
                      <h6>(As Of 2019)</h6>
                    </div>
                    </Col>
                    <Col lg={3} className='text-center'>
                    <div>
                      <h2 className='fw-bold'>6 B+</h2>
                      <h6>Annual Global Health Club Visits</h6>
                      <h6>(As Of 2018)</h6>
                    </div>
                    </Col>
                    <Col lg={3} className='text-center'>
                    <div>
                      <h2 className='fw-bold'>174 M+</h2>
                      <h6>Club Members Worldwide</h6>
                      <h6>(As Of 2020)</h6>
                    </div>
                    </Col>
                    <Col lg={3} className='text-center'>
                    <div>
                      <h2 className='fw-bold'>230 M+</h2>
                      <h6>Members Expected By 2030</h6>
                      <h6>(As Of 2020)</h6>
                    </div>
                    </Col>
                   </Row>
                   </Col>
        </Row>
        <Row>
         <Col lg={12} className='mb-lg-4'>
         <h3 className='text-center'>INVEST IN A FRANCHISE MODEL DESIGNED FOR MAXIMUM PROFITS</h3>
         </Col>
         <Col lg={12} className='text-center pb-lg-5'>
                       <Link to="/contact-us" className="btn btn-rounded-pill2 border btn-lg">
                       Open your Train High Gym
                       </Link>
                     </Col>
        </Row>
      </Container>
    </section>
    </>    
  )
}

export default Franchise;