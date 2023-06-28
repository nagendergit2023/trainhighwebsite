import React from 'react';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Card from 'react-bootstrap/esm/Card';
import { Link } from 'react-router-dom';
import { AiOutlineUnorderedList, AiOutlineUserAdd } from "react-icons/ai";

function Admin() {
  return (
    <section>
      <Container>
        <Row className="justify-content-center align-items-center">
          <Col lg={3}>
            <Link to="/membership-list" className="text-decoration-none">
              <Card className="text-center shadow">
                <Card.Body>
                  <AiOutlineUnorderedList className="card-icon" />   
                  <Card.Title className="text-capitalize mb-0">view all</Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </Col>
          <Col lg={3}>
            <Link to="/new-membership" className="text-decoration-none">
              <Card className="text-center shadow">
                <Card.Body>
                  <AiOutlineUserAdd className="card-icon" />                  
                  <Card.Title className="text-capitalize mb-0">new membership</Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Admin;