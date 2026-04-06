import React from 'react'
import { Card, Col, Container, Row } from "react-bootstrap";
import FranchiseImage from "../../assets/images/franchise_image.jpg";
import "./Franchise.css";
import { Link } from 'react-router-dom';
import HeroMain from "../../Components/HeroMainFranchise/HeroMain.js";
import ContactUs from '../../Components/ContactUs/ContactUs.js';
import { FaDumbbell, FaChartLine, FaUsers, FaHandsHelping } from "react-icons/fa";

const steps = [
  {
    title: "Consultation",
    desc: "Fill out our franchise inquiry form with your investment range and preferred location."
  },
  {
    title: "Site Setup",
    desc: "Our franchise advisor will walk you through the business model and answer your questions."
  },
  {
    title: "Training and Development",
    desc: "Complete documentation, finalize the agreement, and start store setup and training."
  },
  {
    title: "Launch & Support",
    desc: "Open your franchise with marketing support and full operational guidance."
  }
];

function Franchise() {
  return (
    <>
      <HeroMain />
      <section className="py-lg-5 pt-5 pb-3 bg-black text-white" id='franchiseDetails'>
        <Container>
          <Row className="justify-content-center align-items-center">
            {/* <Col lg={6}>
              <img  src={CardioTraining} className="img-fluid w-100 rounded " alt="" />
             </Col> */}
            {/* <Col lg={12}>
                 <div className="my-lg-0 my-2">
                   <h2 className="section-title text-center">Elevate Fitness, Expand Your Business</h2>
                   <p className='text-center px-lg-5 px-2 mb-5'>Invest in Train High Gym franchise and bring elite fitness to your community!</p>
                   </div>
                   
          </Col> */}
         
            <Col lg={12} className='mb-lg-5 mb-5'>
              {/* <div className='text-center mb-lg-5 mb-4'>
          <img src={FranchiseImage} className='img-fluid w-100' />
          </div> */}
              <div className='mb-lg-5 mb-5'>
                <h2>Fitness is no longer just a hobby — it's a global movement!</h2>
                <p className=''>
                  Over the past few years, millions of people around the world have embraced fitness as a core part of their lifestyle. From home workouts to gym memberships, yoga classes to running clubs, the focus on personal health and well-being has never been stronger. This growing passion for fitness has led to a massive boom in the global fitness industry and it’s only getting bigger! With more people investing in their health, the industry is set to grow even faster in the near future.
                </p>
                <p>Whether you're just getting started or you're already on your fitness journey, there’s never been a better time to be part of this exciting movement.</p>
                <p>Get ready to be stronger, healthier, and more energized — because the future of fitness is here!</p>
              </div>
              <Row>
                <Col lg={3} xs={6} className='text-center mb-3'>
                  <div>
                    <h2 className='fw-bold'>$87.23 B</h2>
                    <h6>Global Health Club Industry</h6>
                    <h6>(As Of 2019)</h6>
                  </div>
                </Col>
                <Col lg={3} xs={6} className='text-center mb-3'>
                  <div>
                    <h2 className='fw-bold'>6 B+</h2>
                    <h6>Annual Global Health Club Visits</h6>
                    <h6>(As Of 2018)</h6>
                  </div>
                </Col>
                <Col lg={3} xs={6} className='text-center mb-3'>
                  <div>
                    <h2 className='fw-bold'>174 M+</h2>
                    <h6>Club Members Worldwide</h6>
                    <h6>(As Of 2020)</h6>
                  </div>
                </Col>
                <Col lg={3} xs={6} className='text-center mb-3'>
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
             <Col lg={12} className='mb-lg-5 mb-5'>
          <h2 className='text-center'>Why own a Train High Gym Franchise?</h2>
          <div className='py-lg-3 py-3'>
            <div className="horizontal-scroll">
              <Card className="feature-card bg-dark text-white text-center border-0 shadow-sm h-100 p-4">
              <div className="feature-logo mb-3">
                <FaDumbbell />
              </div>
              <h5 className="fw-semibold">Strong Fitness Brand</h5>
              <p className="text-white mb-0">
                Launch your gym with a trusted brand known for quality training
                programs and modern fitness equipment.
              </p>
            </Card>
             <Card className="feature-card bg-dark text-white text-center border-0 shadow-sm h-100 p-4">
              <div className="feature-logo mb-3">
                <FaChartLine />
              </div>
              <h5 className="fw-semibold">Proven Business Model</h5>
              <p className="text-white mb-0">
                Our tested franchise system helps you grow faster with
                structured operations and profitable strategies.
              </p>
            </Card>
             <Card className="feature-card bg-dark text-white text-center border-0 shadow-sm h-100 p-4">
              <div className="feature-logo mb-3">
                <FaUsers />
              </div>
              <h5 className="fw-semibold">Strong Member Community</h5>
              <p className="text-white mb-0">
                Become part of a vibrant community of members, trainers and
                fitness enthusiasts.
              </p>
            </Card>
             <Card className="feature-card bg-dark text-white text-center border-0 shadow-sm h-100 p-4">
              <div className="feature-logo mb-3">
                <FaHandsHelping />
              </div>
              <h5 className="fw-semibold">Complete Franchise Support</h5>
              <p className="text-white mb-0">
                From setup and marketing to trainer hiring and growth
                strategies, we support you at every step.
              </p>
            </Card>
            </div>
          </div>
          </Col>
          </Row>
          <Row>
            <Col lg={12}>
            <div className="timeline-section">
      <h2 className="timeline-title">Path to Launch Your Franchise</h2>

      <div className="timeline">

        {steps.map((step, index) => (
          <div
            key={index}
            className={`timeline-item ${index % 2 === 0 ? "left" : "right"}`}
          >
            <div className="timeline-content">

              <div className="timeline-step">{index + 1}</div>

              <h4>{step.title}</h4>
              <p>{step.desc}</p>

            </div>
          </div>
        ))}

      </div>
    </div>
            </Col>
          </Row>
          {/* <Row>
         <Col lg={12} className='mb-lg-4'>
         <h3 className='text-center'>INVEST IN A FRANCHISE MODEL DESIGNED FOR MAXIMUM PROFITS</h3>
         </Col>
         <Col lg={12} className='text-center pb-lg-5'>
                       <Link to="/contact-us" className="btn btn-rounded-pill2 border btn-lg">
                       Open your Train High Gym
                       </Link>
                     </Col>
        </Row> */}
        </Container>
      </section>
      <ContactUs
        title="Franchise Enquiry"
        subtitle="Invest in a franchise designed for maximum profits"
        bgClass="bg-black"
        textClass="text-white"
        id="franchiseForm"
      />
    </>
  )
}

export default Franchise;