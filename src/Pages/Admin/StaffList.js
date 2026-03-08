import React, { useEffect, useState } from "react";
import Hero from "../../Components/Hero/Hero";
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Modal,
  Row,
} from "react-bootstrap";
import { notification, Table } from "antd";
import GetApiCall from "../../helpers/GetApi";
import PostApiCall from "../../helpers/PostApi";

function StaffList() {
  const [staff, setStaff] = useState([]);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    mobile: "",
    email: "",
    role: "",
    status: "Active",
  });

  const loadStaff = () => {
    GetApiCall.getRequest("staff").then((res) =>
      res.json().then((data) => setStaff(data.data))
    );
  };

  useEffect(() => {
    loadStaff();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    PostApiCall.postRequest(formData, "staff").then(() => {
      setShow(false);
      setFormData({
        id: "",
        name: "",
        mobile: "",
        email: "",
        role: "",
        status: "Active",
      });
      loadStaff();
      notification.success({
        message: "Staff Details Updated Successfully",
        description: "",
      });
    });
  };

  const columns = [
    { title: "S No.", render: (_, __, i) => i + 1 },
    { title: "Code", dataIndex: "staff_code" },
    { title: "Name", dataIndex: "name" },
    { title: "Mobile", dataIndex: "mobile" },
    { title: "Email", dataIndex: "email" },
    { title: "Role", dataIndex: "role" },
    { title: "Status", dataIndex: "status" },
    {
      title: "Action",
      render: (record) => (
        <Button
          size="sm"
          variant="secondary"
          onClick={() => {
            setFormData(record);
            setShow(true);
          }}
        >
          Edit
        </Button>
      ),
    },
  ];

  return (
    <>
      <section className="pb-5 inner-section">
        <Container>
          <Row className="justify-content-center mb-3">
                              <Col lg={9}>
                                <h2 className="section-title">My Staff</h2>
                              </Col>
                            </Row>
          <Row>
            <Col lg={12} className="mb-3 text-end">
              <Button variant="secondary" onClick={() => setShow(true)}>
                Add Staff
              </Button>
            </Col>

            <Col lg={12}>
              <Table columns={columns} dataSource={staff} rowKey="id" />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Modal */}
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{formData.id ? "Edit Staff" : "Add Staff"}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <FloatingLabel label="Name" className="mb-3">
            <Form.Control
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </FloatingLabel>

          <FloatingLabel label="Mobile" className="mb-3">
            <Form.Control
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
            />
          </FloatingLabel>

          <FloatingLabel label="Email" className="mb-3">
            <Form.Control
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </FloatingLabel>

          <FloatingLabel label="Role" className="mb-3">
            <Form.Select
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="Super Admin">Super Admin</option>
              <option value="Admin">Admin</option>
              <option value="Sales">Sales</option>
              <option value="Trainer">Trainer</option>
            </Form.Select>
          </FloatingLabel>

          <FloatingLabel label="Status">
            <Form.Select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </Form.Select>
          </FloatingLabel>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cancel
          </Button>
          <Button variant="secondary" onClick={handleSubmit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default StaffList;
