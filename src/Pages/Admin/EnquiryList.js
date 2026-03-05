import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
  Modal,
  Badge,
} from "react-bootstrap";
import { notification, Table } from "antd";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import Hero from "../../Components/Hero/Hero.js";
import GetApiCall from "../../helpers/GetApi.js";
import PostApiCall from "../../helpers/PostApi.js";

function EnquiryList() {
  const navigate = useNavigate();

  const [memberList, setMemberList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [searchField, setSearchField] = useState("");
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [formData, setFormData] = useState({
    id: null,
    fld_name: "",
    fld_phone: "",
    fld_email: "",
    fld_type: "",
    fld_source: "Walk In",
    fld_message: "",
  });

  // ---------------------------
  // FETCH ENQUIRIES
  // ---------------------------
  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      const res = await GetApiCall.getRequest("GetEnquiries");
      const data = await res.json();
      if (res.status === 200 || res.status === 201) {
        setMemberList(data);
        setFilteredList(data);
      }
    } catch (err) {
      notification.error({ message: "Failed to load enquiries" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  // ---------------------------
  // SEARCH (Debounced)
  // ---------------------------
  useEffect(() => {
    const delay = setTimeout(() => {
      if (!searchField.trim()) {
        setFilteredList(memberList);
        return;
      }

      const search = searchField.toLowerCase();

      const filtered = memberList.filter((item) => {
        return (
          item?.fld_name?.toLowerCase().includes(search) ||
          item?.fld_phone?.includes(search) ||
          item?.fld_membership?.toLowerCase()?.includes(search)
        );
      });

      setFilteredList(filtered);
    }, 400);

    return () => clearTimeout(delay);
  }, [searchField, memberList]);

  // ---------------------------
  // HANDLE FORM CHANGE
  // ---------------------------
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ---------------------------
  // SAVE / UPDATE
  // ---------------------------
  const handleSaveEnquiry = async () => {
    try {
      if (!formData.fld_name || !formData.fld_phone) {
        notification.warning({
          message: "Name and Mobile Number are required",
        });
        return;
      }

      setLoading(true);

      const res = await PostApiCall.postRequest(formData, "UpdateEnquiries");

      if (res.status === 200 || res.status === 201) {
        notification.success({
          message: isEdit
            ? "Enquiry Updated Successfully"
            : "Enquiry Added Successfully",
        });

        setShowModal(false);
        setIsEdit(false);
        resetForm();
        fetchEnquiries();
      } else {
        notification.error({ message: "Something went wrong" });
      }
    } catch (err) {
      notification.error({ message: "Server error" });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      id: null,
      fld_name: "",
      fld_phone: "",
      fld_email: "",
      fld_type: "",
      fld_source: "Walk In",
      fld_message: "",
    });
  };

  // ---------------------------
  // TABLE COLUMNS
  // ---------------------------
  const columns = [
    {
      title: "S No.",
      dataIndex: "SNo",
      width: 80,
    },
    {
      title: "Name",
      dataIndex: "MemberName",
      sorter: (a, b) => a.MemberName.localeCompare(b.MemberName),
    },
    {
      title: "Mobile",
      dataIndex: "MobileNo",
      sorter: (a, b) => String(a.MobileNo).localeCompare(String(b.MobileNo)),
    },
    {
      title: "Date",
      dataIndex: "StartDate",
      sorter: (a, b) =>
        moment(a.StartDate).valueOf() - moment(b.StartDate).valueOf(),
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Source",
      dataIndex: "source",
    },
    {
      title: "Status",
      dataIndex: "Status",
      render: (status) => (
        <Badge
          bg={
            status === "Converted"
              ? "success"
              : status === "Lost"
                ? "danger"
                : "warning"
          }
        >
          {status}
        </Badge>
      ),
    },
    {
      title: "Actions",
      render: (_, record) => (
        <div className="d-flex gap-2">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => {
              setFormData(record.originalData);
              setIsEdit(true);
              setShowModal(true);
            }}
          >
            Edit
          </Button>

          <Button
            size="sm"
            variant="success"
            onClick={() =>
              navigate("/new-membership", {
                state: {
                  type: "convert",
                  enquiryData: record.originalData,
                },
              })
            }
            disabled={record.originalData.fld_is_converted === 1}
          >
            Convert
          </Button>
        </div>
      ),
    },
  ];

  const rows = filteredList.map((data, i) => ({
    key: data.id || i,
    SNo: i + 1,
    MemberName: data.fld_name,
    MobileNo: data.fld_phone,
    StartDate: moment(data.fld_created_at).format("ll"),
    type: data.fld_type,
    source: data.fld_source,
    Status: data.fld_status || "Pending",
    originalData: data,
  }));

  return (
    <>
      <Hero />

      <section className="py-5 inner-section">
        <Container>
          <Row>
            <Col lg={12} className="mb-4">
              <FloatingLabel label="Search by Name, Mobile or Membership">
                <Form.Control
                  type="text"
                  value={searchField}
                  onChange={(e) => setSearchField(e.target.value)}
                />
              </FloatingLabel>
            </Col>

            <Col lg={12} className="mb-3 text-end">
              <Button
                variant="dark"
                onClick={() => {
                  resetForm();
                  setIsEdit(false);
                  setShowModal(true);
                }}
              >
                + Add New Enquiry
              </Button>
            </Col>

            <Col lg={12}>
              <Table
                rowKey="key"
                columns={columns}
                dataSource={rows}
                loading={loading}
                bordered
                pagination={{
                  pageSize: 10,
                  showSizeChanger: true,
                }}
                scroll={{ x: 800 }}
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* MODAL */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{isEdit ? "Edit Enquiry" : "Add Enquiry"}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <FloatingLabel label="Name" className="mb-3">
              <Form.Control
                name="fld_name"
                value={formData.fld_name}
                onChange={handleChange}
              />
            </FloatingLabel>

            <FloatingLabel label="Mobile" className="mb-3">
              <Form.Control
                name="fld_phone"
                value={formData.fld_phone}
                onChange={handleChange}
              />
            </FloatingLabel>

            <FloatingLabel label="Email" className="mb-3">
              <Form.Control
                name="fld_email"
                value={formData.fld_email}
                onChange={handleChange}
              />
            </FloatingLabel>

            <FloatingLabel label="Type" className="mb-3">
              <Form.Select
                name="fld_type"
                value={formData.fld_type}
                onChange={handleChange}
              >
                <option value="">Select Type</option>
                <option value="Franchise">Franchise</option>
                <option value="Membership">Membership</option>
              </Form.Select>
            </FloatingLabel>

            <FloatingLabel label="Message">
              <Form.Control
                as="textarea"
                style={{ height: 100 }}
                name="fld_message"
                value={formData.fld_message}
                onChange={handleChange}
              />
            </FloatingLabel>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="dark" onClick={handleSaveEnquiry}>
            {isEdit ? "Update" : "Save"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EnquiryList;
