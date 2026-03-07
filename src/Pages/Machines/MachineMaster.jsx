import React, { useEffect, useState } from "react";
import { Table, notification } from "antd";
import { Button, Modal, Form, FloatingLabel, Col } from "react-bootstrap";
import GetApiCall from "../../helpers/GetApi";
import PostApiCall from "../../helpers/PostApi";

function MachineMaster() {
  const [machines, setMachines] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    machine_name: "",
    serial_number: "",
    ip_address: "",
    port: 5000,
    location: "",
  });

  const fetchMachines = async () => {
    const res = await GetApiCall.getRequest("Machines/GetMachines");
    const data = await res.json();
    setMachines(data);
  };

  useEffect(() => {
    fetchMachines();
  }, []);

  const handleSave = async () => {
    const res = await PostApiCall.postRequest(formData, "Machines/AddMachine");

    if (res.status === 200) {
      notification.success({ message: "Machine Added" });
      setShowModal(false);
      fetchMachines();
    }
  };

  const columns = [
    {
      title: "Machine Name",
      dataIndex: "machine_name",
    },
    {
      title: "Serial No",
      dataIndex: "serial_number",
    },
    {
      title: "IP Address",
      dataIndex: "ip_address",
    },
    {
      title: "Port",
      dataIndex: "port",
    },
    {
      title: "Location",
      dataIndex: "location",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => (
        <span
          style={{
            color: status === "active" ? "green" : "red",
            fontWeight: 600,
          }}
        >
          {status.toUpperCase()}
        </span>
      ),
    },
  ];

  return (
    <div className="p-4">
      <h3>Machine Master</h3>
      <Col lg={12} className="mb-3 text-end">
        <Button variant="secondary" onClick={() => setShowModal(true)}>
          Add Machine
        </Button>
      </Col>

      <Table
        rowKey="id"
        columns={columns}
        dataSource={machines}
        className="mt-4"
      />

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Machine</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <FloatingLabel label="Machine Name" className="mb-3">
              <Form.Control
                value={formData.machine_name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    machine_name: e.target.value,
                  })
                }
              />
            </FloatingLabel>

            <FloatingLabel label="Serial Number" className="mb-3">
              <Form.Control
                value={formData.serial_number}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    serial_number: e.target.value,
                  })
                }
              />
            </FloatingLabel>

            <FloatingLabel label="IP Address" className="mb-3">
              <Form.Control
                value={formData.ip_address}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    ip_address: e.target.value,
                  })
                }
              />
            </FloatingLabel>

            <FloatingLabel label="Location">
              <Form.Control
                value={formData.location}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    location: e.target.value,
                  })
                }
              />
            </FloatingLabel>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default MachineMaster;
