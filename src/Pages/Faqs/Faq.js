import React from 'react';
import { Accordion, Col, Container, Row } from "react-bootstrap";

function FAQs() {
  return (
    <>
      <section className=''>
        <Container>
          <Row className="justify-content-center mt-5">
            <Col lg={9}>
              <h2 className="section-title">frequently asked questions</h2>
              <p className="text-center px-lg-5 px-2 mb-5">
                Seeking swift, precise answers? I deliver clear, concise information to ensure a seamless, effortless experience. Ask me anything for hassle-free solutions.
              </p>
            </Col>
          </Row>
        </Container>
        <Container>
          <Row>
            <Col lg={12} className='text-start text-dark mb-5'>
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                  <Accordion.Header><h4 className='mb-0'>Gym Information & Facilities</h4></Accordion.Header>
                  <Accordion.Body>
                    <div className="mb-3">
                      <h5>1. What are the operating hours of Train High Gym?</h5>
                      <p>Train High Gym is open daily from <strong>6:00 AM to 11:00 PM</strong>, including weekends.</p>
                    </div>

                    <div className="mb-3">
                      <h5>2. Where is Train High Gym located?</h5>
                      <p>You can find us at <strong>A3/30, Block A3, Janakpuri, New Delhi</strong>.</p>
                    </div>

                    <div className="mb-3">
                      <h5>3. What facilities does Train High Gym offer?</h5>
                      <ul>
                        <li>A boxing and functional training zone</li>
                        <li>A dedicated cardio and Pilates floor</li>
                        <li>A fully equipped strength training area</li>
                        <li>Workshops and outdoor fitness activities</li>
                      </ul>
                    </div>

                    <div className="mb-3">
                      <h5>4. Do you offer personal training?</h5>
                      <p>Yes! Our certified trainers offer personalized one-on-one training tailored to your fitness goals.</p>
                    </div>

                    <div className="mb-3">
                      <h5>5. What membership options are available?</h5>
                      <p>We offer monthly, quarterly, and annual memberships. Contact us for pricing and package details.</p>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header><h4 className='mb-0'>Workout & Training</h4></Accordion.Header>
                  <Accordion.Body>
                    <div className="mb-3">
                      <h5>6. Do I need prior gym experience to join?</h5>
                      <p>No, our gym welcomes beginners, and our trainers will guide you throughout your fitness journey.</p>
                    </div>

                    <div className="mb-3">
                      <h5>7. What is functional training?</h5>
                      <p>Functional training includes exercises that enhance strength, mobility, and stability for everyday movements.</p>
                    </div>

                    <div className="mb-3">
                      <h5>8. How often should I work out?</h5>
                      <p>It depends on your fitness goals, but generally, 3–5 workouts per week are recommended.</p>
                    </div>

                    <div className="mb-3">
                      <h5>9. What’s the difference between strength training and cardio?</h5>
                      <ul>
                        <li><strong>Strength Training:</strong> Builds muscle and improves endurance.</li>
                        <li><strong>Cardio:</strong> Boosts heart health and burns calories.</li>
                      </ul>
                      <p>Both are essential for overall fitness.</p>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header><h4 className='mb-0'>Health & Nutrition</h4></Accordion.Header>
                  <Accordion.Body>
                    <div className="mb-3">
                      <h5>10. Do you offer nutrition guidance?</h5>
                      <p>Yes, we provide basic nutrition advice and can connect you with professional nutritionists for personalized plans.</p>
                    </div>

                    <div className="mb-3">
                      <h5>11. Can I lose weight just by working out?</h5>
                      <p>Exercise is crucial, but pairing it with a balanced diet yields the best weight-loss results.</p>
                    </div>

                    <div className="mb-3">
                      <h5>12. What’s the best time to work out?</h5>
                      <p>The best time is whenever you feel most energetic and can maintain consistency.</p>
                    </div>

                    <div className="mb-3">
                      <h5>13. Can I build muscle while losing fat?</h5>
                      <p>Yes! With a mix of strength training, cardio, and proper nutrition, you can achieve both.</p>
                    </div>

                    <div className="mb-3">
                      <h5>14. Do I need supplements to see results?</h5>
                      <p>Supplements are optional. A well-balanced diet and effective training are enough for most goals.</p>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                  <Accordion.Header><h4 className='mb-0'>Membership & Services</h4></Accordion.Header>
                  <Accordion.Body>
                    <div className="mb-3">
                      <h5>15. Can I pause or transfer my membership?</h5>
                      <p>Yes, we offer flexible options for pausing or transferring memberships. Terms and conditions apply.</p>
                    </div>

                    <div className="mb-3">
                      <h5>16. Do you offer trial sessions?</h5>
                      <p>Yes! We provide trial sessions for new members. Contact us to book yours.</p>
                    </div>

                    <div className="mb-3">
                      <h5>17. Are group classes included in the membership?</h5>
                      <p>Yes, most group classes like boxing and Pilates are included. Some specialized workshops may have additional fees.</p>
                    </div>

                    <div className="mb-3">
                      <h5>18. What safety measures are in place?</h5>
                      <p>We follow strict sanitization protocols, maintain safe equipment spacing, and have trained staff for emergencies.</p>
                    </div>

                    <div className="mb-3">
                      <h5>19. What payment methods do you accept?</h5>
                      <p>We accept cash, credit/debit cards, UPI, and online transfers.</p>
                    </div>

                    <div className="mb-3">
                      <h5>20. How do I book a session or workshop?</h5>
                      <p>You can book sessions and workshops through our website or at the gym reception.</p>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  )
}

export default FAQs;