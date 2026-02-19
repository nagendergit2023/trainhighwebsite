import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
  Modal,
} from "react-bootstrap";
import { notification, Table } from "antd";
import GetApiCall from "../../helpers/GetApi.js";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import Hero from "../../Components/Hero/Hero.js";
import PostApiCall from "../../helpers/PostApi.js";
import Notiflix from "notiflix";

function EnquiryList() {
  let navigate = useNavigate();
  const [memberList, setMemberList] = useState([]);
  const [searchField, setSearchField] = useState("");
  const [searchFieldText, setSearchFieldText] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    fld_name: "",
    fld_phone: "",
    fld_email: "",
    fld_type: "",
    fld_source: "Walk In",
    fld_message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveEnquiry = async () => {
    try {
      // const response = await fetch("/api/enquiry/save", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(formData),
      // });
      Notiflix.Loading.circle();
      PostApiCall.postRequest(formData, "UpdateEnquiries").then((results) => {
        results.json().then((obj) => {
          if (results.status === 200 || results.status === 201) {
            setShowModal(false);
            setFormData({
              fld_name: "",
              fld_phone: "",
              fld_email: "",
              fld_type: "",
              fld_source: "Walk In",
              fld_message: "",
            });
            GetApiCall.getRequest("GetEnquiries").then((results) => {
              results.json().then((obj) => {
                setMemberList(obj.data);
              });
            });
            Notiflix.Loading.remove();
            notification.success({
              message: `Details Submitted Sucessfully`,
            });
          } else {
            notification.error({
              message: `Please Contact Team`,
            });
          }
        });
      });
    } catch (error) {
      console.error("Save enquiry error:", error);
    }
  };

  useEffect(() => {
    GetApiCall.getRequest("GetEnquiries").then((results) => {
      results.json().then((obj) => {
        if (results.status === 200 || results.status === 201) {
          setMemberList(obj.data);
          // setMembershipNumber(obj.membershipNumber);
        }
      });
    });
  }, []);
  const data = {
    columns: [
      {
        title: "S No.",
        dataIndex: "SNo",
        sorter: (a, b) => a.SNo - b.SNo,
        width: "90px",
      },
      {
        title: "Name",
        dataIndex: "MemberName",
        sorter: (a, b) => a.MemberName - b.MemberName,
        width: "180px",
      },
      {
        title: "Mobile No.",
        dataIndex: "MobileNo",
        sorter: (a, b) => a.MobileNo - b.MobileNo,
        width: "180px",
      },
      {
        title: "Enquiry Date",
        dataIndex: "StartDate",
        sorter: (a, b) => a.StartDate - b.StartDate,
        width: "140px",
      },
      {
        title: "Type",
        dataIndex: "type",
        width: "140px",
      },
      {
        title: "Source",
        dataIndex: "source",
        width: "140px",
      },
      {
        title: "Message",
        dataIndex: "message",
        width: "140px",
      },
      {
        title: "Status",
        dataIndex: "Status",
        sorter: (a, b) => a.Status - b.Status,
        width: "100px",
      },
      {
        title: "Actions",
        dataIndex: "Action",
        width: "150px",
      },
    ],
    rows: memberList
      .filter((filtered) => {
        if (searchFieldText === "") {
          return filtered;
        }
        if (
          searchFieldText !== "" &&
          String(filtered.fld_name).includes(searchFieldText)
        ) {
          return filtered;
        }
        if (
          searchFieldText !== "" &&
          String(filtered.fld_phone).includes(searchFieldText)
        ) {
          return filtered;
        }
        if (
          searchFieldText !== "" &&
          String(filtered.fld_membership).includes(searchFieldText)
        ) {
          return filtered;
        }
      })
      .map((data, i) => {
        return {
          SNo: i + 1,
          type: data?.fld_type,
          MemberName: data.fld_name,
          source: data.fld_source,
          StartDate: moment(data.fld_created_at).format("ll"),
          MobileNo: data.fld_phone,
          message: data.fld_message,
          Status: data.fld_status,
          Action: (
            <div className="d-flex align-items-center gap-2 justify-content-evenly">
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Manage
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/new-membership"
                      state={{ data: data, type: "renew" }}
                    >
                      Renew
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/new-membership"
                      state={{ data: data, type: "update" }}
                    >
                      Edit
                    </Link>
                  </li>
                  <li>
                    <button
                      className="dropdown-item text-success"
                      onClick={() =>
                        navigate("/new-membership", {
                          state: {
                            type: "convert",
                            enquiryData: data,
                          },
                        })
                      }
                      disabled={data.fld_is_converted === 1}
                      title={data.fld_is_converted ? "Already Converted" : ""}
                    >
                      Convert to Member
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          ),
        };
      }),
  };
  return (
    <>
      <Hero />
      <section className="py-5 inner-section">
        <Container>
          <Row>
            <Col lg={12} className="mb-lg-4">
              <Form>
                <Row>
                  <Col lg={8}>
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Search by Name, Membership ID or Mobile Number"
                      className="mb-3"
                      style={{ fontSize: "15px" }}
                    >
                      <Form.Control
                        type="text"
                        placeholder="name@example.com"
                        value={searchField}
                        onChange={(e) => {
                          setSearchField(e.target.value);
                        }}
                      />
                    </FloatingLabel>
                  </Col>
                  <Col lg={2}>
                    <Button
                      variant="secondary"
                      className="w-100 py-3 mb-3 mb-lg-0"
                      onClick={() => setSearchFieldText(searchField)}
                    >
                      Search
                    </Button>
                  </Col>
                  <Col lg={2}>
                    <Button
                      variant="secondary"
                      className="w-100 py-3 mb-3 mb-lg-0"
                      onClick={() => setShowModal(true)}
                    >
                      Add New Enquiry
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Col>
            <Col lg={12}>
              <Table
                bordered={true}
                striped
                scroll={{ x: "500", y: 800 }}
                columns={data.columns}
                dataSource={data.rows}
                // onChange={onChange}/
              />
            </Col>
          </Row>
        </Container>
      </section>
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Enquiry</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <FloatingLabel label="Name" className="mb-3">
              <Form.Control
                type="text"
                name="fld_name"
                value={formData.fld_name}
                onChange={handleChange}
              />
            </FloatingLabel>

            <FloatingLabel label="Mobile Number" className="mb-3">
              <Form.Control
                type="text"
                name="fld_phone"
                value={formData.fld_phone}
                onChange={handleChange}
              />
            </FloatingLabel>

            <FloatingLabel label="Email" className="mb-3">
              <Form.Control
                type="email"
                name="fld_email"
                value={formData.fld_email}
                onChange={handleChange}
              />
            </FloatingLabel>

            <FloatingLabel label="Enquiry Type" className="mb-3">
              <Form.Select
                name="fld_type"
                value={formData.fld_type}
                onChange={handleChange}
              >
                <option value="">Select Enquiry Type</option>
                <option value="Franchise">Franchise</option>
                <option value="Membership">Membership</option>
              </Form.Select>
            </FloatingLabel>

            <FloatingLabel label="Message" className="mb-3">
              <Form.Control
                as="textarea"
                style={{ height: "100px" }}
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
          <Button variant="secondary" onClick={handleSaveEnquiry}>
            Save Enquiry
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EnquiryList;
