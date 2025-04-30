import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Hero from "../../Components/Hero/Hero.js";
import Membership from "../../assets/images/facilities/train_high_gym_membership.jpg";
import WorldClassMachines from "../../assets/images/facilities/worldClass_machines.jpg";
import WorkshopsOutdoorActivities from "../../assets/images/facilities/workshops_outdoor_activities.jpg";
import TrainersCoaches from "../../assets/images/facilities/trainers_coaches.jpg";
import DiverseTrainingOptions from "../../assets/images/facilities/rope_climbing.jpg";
import DedicatedFloors from "../../assets/images/facilities/dedicated_floors.jpg";
import { Link } from 'react-router-dom';
import { RiFoggyLine } from 'react-icons/ri';
import { LuParkingSquare, LuShowerHead } from 'react-icons/lu';
import { PiLockers } from 'react-icons/pi';
import { TbRulerMeasure } from 'react-icons/tb';
import './Whyjoin.css';

function Whyjoin() {
  return (
    <>
      {/* {window.location.pathname !== "/" ? (
        <Hero />
      ) : null} */}
      <section className="py-lg-5 py-3">
        <Container>
          <Row className="justify-content-center align-items-center">
            {/* <Col lg={6}>
           <img  src={CardioTraining} className="img-fluid w-100 rounded " alt="" />
          </Col> */}
            <Col lg={8}>
              <div className="my-lg-0 my-2">
                <h2 className="section-title text-center">Why Choose Membership?</h2>
                <p className="text-center px-lg-5 px-2 mb-5">A Train High Gym membership is your gateway to a premium fitness experience designed for everyone—from beginners to professional athletes.</p>
                {/* <ul>
                  <li><strong>World-Class Equipment:</strong> Train High Gym is equipped with cutting-edge, biomechanically correct machines that target specific muscle groups. This ensures effective workouts, improved muscle activation, and enhanced fitness results.</li>
                  <li>
                    <strong>Comprehensive Facilities:</strong>
                    <ol>
                      <li><strong>Spacious Workout Areas:</strong> Our gym is spread across three dedicated floors, each tailored to different training needs. Whether you’re into boxing, strength training, or cardio, we have a space designed just for you.</li>
                      <li><strong>Premium Locker Rooms & Showers:</strong> Enjoy clean, modern, and well-maintained locker rooms equipped with showers and personal storage, ensuring comfort and convenience.</li>
                      <li>
                        <strong>Recovery & Wellness Zone:</strong> We understand that recovery is just as important as training. Our wellness area offers stretching zones, and recovery tools to help you optimize your performance.
                      </li>
                    </ol>
                  </li>
                  <li><strong>Three Dedicated Floors:</strong>
                    <ol>
                      <li><strong>Boxing & Functional Training Zone:</strong> A high-energy space equipped with punching bags, speed bags, and functional training tools—perfect for explosive workouts, agility drills, and skill development.</li>
                      <li><strong>Cardio & Pilates Floor:</strong> Featuring state-of-the-art cardio machines and a tranquil Pilates area to enhance core strength, flexibility, and overall endurance.</li>
                      <li><strong>Strength Training Area:</strong> Fully stocked with cutting-edge weightlifting machines, free weights, and functional equipment to support beginners and advanced lifters alike.</li>
                    </ol>
                  </li>
                  <li>
                    <strong>Workshops & Outdoor Activities:</strong> We go beyond the gym with lifestyle workshops and outdoor events, keeping fitness engaging and sustainable.
                  </li>
                  <li>
                    <strong>Diverse Training Options:</strong> From boxing and strength training to cardio and functional workouts, we have everything you need to meet your fitness goals.
                  </li>
                </ul>
                <p className="text-justify mb-lg-1 mb-3">Train High Gym offers a holistic approach to fitness, combining advanced technology, expert guidance, and an environment that inspires results. Join us and take your fitness journey to the next level!</p> */}
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={4} className='mb-4'>
              <Card className='border-0 bg-light'>
                <Card.Img variant="top" src={Membership} />
                <Card.Body>
                  <Card.Title>Flexible Membership Options</Card.Title>
                  <p className='mb-0 small'>We offer fexible membership options to suit your schedule and goals. Stay committed to your fitness journey without any hassle.</p>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={4} className='mb-4'>
              <Card className='border-0 bg-light'>
                <Card.Img variant="top" src={WorldClassMachines} />
                <Card.Body>
                  <Card.Title>World-Class Equipments</Card.Title>
                  <p className='mb-0 small'>Train High Gym provides World-Class equipments to target specific muscles to achieve your fitness goal.</p>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={4} className='mb-4'>
              <Card className='border-0 bg-light'>
                <Card.Img variant="top" src={DedicatedFloors} />
                <Card.Body>
                  <Card.Title>Dedicated Floors</Card.Title>
                  <p className='mb-0 small'>
                  Train High Gym has 3 dedicated floors for Cardio/Yoga/Aerobics, Boxing/Crossfit Training, Strength Training.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={4} className='mb-4'>
              <Card className='border-0 bg-light'>
                <Card.Img variant="top" src={WorkshopsOutdoorActivities} />
                <Card.Body>
                  <Card.Title>Workshops & Outdoor Activities</Card.Title>
                  <p className='mb-0 small'>
                    Train High Gym organises functional training boot camps, yoga and strength workshops to outdoor endurance runs and team fitness challenges.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={4} className='mb-4'>
              <Card className='border-0 bg-light'>
                <Card.Img variant="top" src={DiverseTrainingOptions} />
                <Card.Body>
                  <Card.Title>Diverse Training Options</Card.Title>
                  <p className='mb-0 small'>From boxing and strength training to cardio and functional workouts, Train High Gym have everything you need to meet your fitness goals.</p>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={4} className='mb-4'>
              <Card className='border-0 bg-light'>
                <Card.Img variant="top" src={TrainersCoaches} />
                <Card.Body>
                  <Card.Title>Trainers & Coaches</Card.Title>
                  <p className='mb-0 small'>
                  Our Trainers & Coaches are your partners in progress with years of experience and expertise they tailor workouts to achieve your fitness goal.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="trainings">
        <h2 className="section-title text-center mb-4">facilties</h2>
        <Container className="">
          <Row className=" justify-content-center">
            <Col
              lg
              xs={6}
              className="d-flex justify-content-center align-items-center mb-4"
            >
              <div className="text-center">
                <a
                  rel="noreferrer"
                  href="https://instagram.com/trainhighgym?igshid=NjIwNzIyMDk2Mg=="
                  className="social-icon-wrapper text-white"
                  target="_blank"
                >
                  <TbRulerMeasure className="social-icon" />
                </a>
                <p className="text-dark text-center mt-2">20,000 Sq. Ft.</p>
              </div>
            </Col>
            <Col
              lg
              xs={6}
              className="d-flex justify-content-center align-items-center mb-4"
            >
              <div className="text-center">
                <a
                  href="#"
                  // onClick="myFunction(); return false;"
                  rel="noreferrer"
                  className="social-icon-wrapper text-white"
                >
                  <LuShowerHead className="social-icon" />
                </a>
                <p className="text-dark text-center mt-2">Showers</p>
              </div>
            </Col>
            <Col
              lg
              xs={6}
              className="d-flex justify-content-center align-items-center mb-4"
            >
              <div className="text-center">
                <a
                  href="#"
                  rel="noreferrer"
                  className="social-icon-wrapper text-dark"
                >
                  <PiLockers className="social-icon" />
                </a>
                <p className="text-dark text-center mt-2">Lockers</p>
              </div>
            </Col>
            <Col
              lg
              xs={6}
              className="d-flex justify-content-center align-items-center mb-4"
            >
              <div className="text-center">
                <a
                  href="#"
                  // onClick="myFunction(); return false;"
                  rel="noreferrer"
                  className="social-icon-wrapper text-dark"
                >
                  <LuParkingSquare className="social-icon" />
                </a>
                <p className="text-dark text-center mt-2">Parking</p>
              </div>
            </Col>
            <Col
              lg
              xs={6}
              className="d-flex justify-content-center align-items-center mb-4"
            >
              <div className="text-center">
                <a
                  href="#"
                  // onClick="myFunction(); return false;"
                  rel="noreferrer"
                  className="social-icon-wrapper text-dark"
                >
                  <RiFoggyLine className="social-icon" />
                </a>
                <p className="text-dark text-center mt-2">Steam Bath</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section>
        <Container className='mb-5'>
          <Row>
            <Col lg={12} className='text-center pb-lg-5 d-lg-block d-none'>
              <Link to="/contact-us" className="btn btn-rounded-pill2 border btn-lg">
                Enquire About Gym Membership Now
              </Link>
            </Col>
            <Col lg={12} className='text-center pb-lg-5 d-lg-none d-block'>
              <a href="tel:+918076751741" className="btn btn-rounded-pill2 border btn-lg">
                Enquire About Gym Membership Now
              </a>
            </Col>
          </Row>
        </Container>
      </section>
    </>

  )
}

export default Whyjoin;