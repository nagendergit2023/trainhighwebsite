import React from 'react';
import { Button, Col, Container, FloatingLabel, Form, Row, Table } from "react-bootstrap";

function MembershipList() {
  return (
    <section>
      <Container>
        <Row>
          <Col lg={12} className="mb-lg-4">
          <Form>
            <Row>
            <Col lg={10}>
            <FloatingLabel
        controlId="floatingInput"
        label="Search by Name, Membership ID or Mobile Number"
        className="mb-3"
      >
        <Form.Control type="email" placeholder="name@example.com" />
      </FloatingLabel>
            </Col>
            <Col lg={2}>
            <Button variant="secondary" className="w-100 py-3">Search</Button>
            </Col>
            </Row>
          </Form>
          </Col>
          <Col lg={12}>
          <Table striped bordered hover className="w-100">
      <thead>
        <tr>
          <th>S No.</th>
          <th>Member Name</th>
          <th>Address</th>
          <th>Start Date</th>
          <th>Mobile No.</th>
          <th>Membership</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>
          <div className="d-flex align-items-center gap-2 justify-content-evenly">
          <Button variant="secondary" className="" size="sm">Renew</Button>
          <Button variant="secondary" className="" size="sm">Edit</Button>
          </div>
          </td>
        </tr>
        <tr>
        <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>
          <div className="d-flex align-items-center gap-2 justify-content-evenly">
          <Button variant="secondary" className="" size="sm">Renew</Button>
          <Button variant="secondary" className="" size="sm">Edit</Button>
          </div>
          </td>
        </tr>
        <tr>
        <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>
          <div className="d-flex align-items-center gap-2 justify-content-evenly">
          <Button variant="secondary" className="" size="sm">Renew</Button>
          <Button variant="secondary" className="" size="sm">Edit</Button>
          </div>
          </td>
        </tr>
      </tbody>
    </Table>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default MembershipList