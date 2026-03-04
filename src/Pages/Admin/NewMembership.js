import React, { useEffect, useState } from "react";
import { Col, Container, FloatingLabel, Form, Row } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PostApiCall from "../../helpers/PostApi.js";
import { DatePicker, Space, notification } from "antd";
import dayjs from "dayjs";
import axios from "axios";
import GetApiCall from "../../helpers/GetApi.js";
import moment from "moment";
import Hero from "../../Components/Hero/Hero.js";
import uploadimage from "../../assets/images/customer_photo.png";
moment.locale("en");

function NewMembership() {
  let location = useLocation();
  let navigate = useNavigate();
  const [type, setType] = useState("");
  const [oldmembershipid, setOldmembershipid] = useState(null);
  const [id, setId] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState(null);
  const [memberShip, setMemberShip] = useState("");
  const [endDate, setEndDate] = useState(null);
  const [applicationNumber, setApplicationNumber] = useState("");
  const [membershipNumber, setMembershipNumber] = useState("");
  const [selectedLogo, setSelectedLogo] = useState("");
  const [status, setStatus] = useState("");
  const [email, setEmail] = useState("");
  const [amountPerMonth, setAmountPerMonth] = useState(null);
  const [ImageApiUrl] = useState(
    "http://68.178.170.174:3309/trainhighgym-api/AddImage",
  );
  // const [previewUrl, setPreviewUrl] = useState("");
  const [showBiometric, setShowBiometric] = useState(true);
  const [biometricStatus, setBiometricStatus] = useState("");
  const [selectedDevice, setSelectedDevice] = useState("");
  const [trainer, setTrainer] = useState("");
  const [staff, setStaff] = useState([]);
  const presets = [
    {
      label: "Yesterday",
      value: moment().subtract(1, "day"),
    },
    {
      label: "Last Week",
      value: moment().subtract(7, "day"),
    },
    {
      label: "Last Month",
      value: moment().subtract(1, "month"),
    },
  ];
  const handlePincodeChange = async (e) => {
    const value = typeof e === "object" ? e.target.value : e;
    setPincode(value);

    if (value.length !== 6) {
      setCity([]);
      setState("");
      return;
    }

    try {
      const response = await axios.get(
        `https://api.postalpincode.in/pincode/${value}`,
      );

      if (
        response.data &&
        response.data[0] &&
        response.data[0].Status === "Success"
      ) {
        const { State } = response.data[0].PostOffice[0];
        setCity(response.data[0].PostOffice);
        setState(State);
      } else {
        setCity("");
        setState("");
      }
    } catch (error) {
      console.error("Error fetching pincode data:", error);
      setCity([]);
      setState("");
    }
  };

  const ImgUpload = ({ onChange, src, id }) => (
    <label
      htmlFor="photo-upload"
      className="custom-file-upload img-upload-input fas w-100"
    >
      <div className="img-wrap img-upload upload-image-component">
        <img
          htmlFor="photo-upload"
          alt=""
          src={src}
          className="img-upload-input"
        />
      </div>
      <input
        accept="image/*"
        id="photo-upload"
        type="file"
        className="d-none"
        onChange={onChange}
      />
    </label>
  );
  useEffect(() => {
    if (location.state !== null && location.state.type === "update") {
      handlePincodeChange(location.state.data.fld_pincode);
      setId(location.state.data.fld_id);
      setName(location.state.data.fld_name);
      setMobile(location.state.data.fld_mobile_number);
      setAddress(location.state.data.fld_address);
      setPincode(location.state.data.fld_pincode);
      setState(location.state.data.fld_state);
      setSelectedCity(location.state.data.fld_city);
      setMemberShip(location.state.data.fld_membership);
      setStartDate(location.state.data.fld_start_date);
      setEndDate(location.state.data.fld_end_date);
      setApplicationNumber(location.state.data.fld_application_number);
      setMembershipNumber(location.state.data.fld_membership_number);
      setStatus(location.state.data.fld_status);
      setEmail(location.state.data.fld_email);
      setAmountPerMonth(location.state.data.fld_amount_permnth);
      setOldmembershipid(location.state.data.fld_old_membership);
      setType(location.state.data.fld_type);
      setTrainer(location.state.data.trainer_id);
    } else if (location.state !== null && location.state.type === "renew") {
      setName(location.state.data.fld_name);
      setId(location.state.data.fld_id);
      setMobile(location.state.data.fld_mobile_number);
      setAddress(location.state.data.fld_address);
      setPincode(location.state.data.fld_pincode);
      setState(location.state.data.fld_state);
      setSelectedCity(location.state.data.fld_city);
      setMemberShip(location.state.data.fld_membership);
      setStartDate(moment(location.state.data.fld_start_date));
      setEndDate(moment(location.state.data.fld_end_date));
      // setApplicationNumber(location.state.data.fld_application_number);

      setMembershipNumber(location.state.data.fld_membership_number);
      setStatus(location.state.data.fld_status);
      setOldmembershipid(location.state.data.fld_id);
      setTrainer(location.state.data.trainer_id);
      setType("New");
      GetApiCall.getRequest("GetSerialNumber").then((results) => {
        results.json().then((obj) => {
          if (results.status === 200 || results.status === 201) {
            setApplicationNumber(obj.appNumber);
          }
        });
      });
    } else if (location.state !== null && location.state.type === "convert") {
      const enquiry = location.state.enquiryData;

      setName(enquiry.fld_name);
      setMobile(enquiry.fld_phone);
      setEmail(enquiry.fld_email);
      setType("New");

      // optional defaults
      setStatus("Active");
      setAddress("");
      setPincode("");
      setSelectedCity("");
      setState("");

      // generate new numbers
      GetApiCall.getRequest("GetSerialNumber").then((results) => {
        results.json().then((obj) => {
          if (results.status === 200 || results.status === 201) {
            setApplicationNumber(obj.appNumber);
            setMembershipNumber(obj.membershipNumber);
          }
        });
      });
    } else {
      GetApiCall.getRequest("GetSerialNumber").then((results) => {
        results.json().then((obj) => {
          if (results.status === 200 || results.status === 201) {
            setApplicationNumber(obj.appNumber);
            setMembershipNumber(obj.membershipNumber);
          }
        });
      });
    }
  }, []);
  const validateForm = () => {
    if (!name.trim()) return "Please Enter Name";
    if (!mobile || mobile.length !== 10)
      return "Please Enter Valid Mobile Number";
    if (!address.trim()) return "Please Enter Address";
    if (!email.trim()) return "Please Enter Email";
    if (!status) return "Please Select Status Of Member";
    if (!amountPerMonth) return "Please Enter Fee Per Month";
    if (!startDate) return "Please Enter Start Date";
    if (!memberShip) return "Please Select Membership Period";

    return null;
  };

  const SaveForm = async () => {
    const error = validateForm();
    if (error) {
      notification.error({ message: "Validation Error", description: error });
      return;
    }

    try {
      const response = await PostApiCall.postRequest(
        {
          id,
          name,
          mobile,
          address,
          application: applicationNumber,
          membershipnumber: membershipNumber,
          membership: memberShip,
          pincode,
          state,
          city: selectedCity,
          startDate,
          endDate,
          email,
          userstatus: status,
          amount: amountPerMonth,
          type,
          oldmembership: oldmembershipid,
        },
        "AddUserDetails",
      );

      const obj = await response.json();

      if (response.status === 200 || response.status === 201) {
        setShowBiometric(true);
        setBiometricStatus("PENDING_ENROLLMENT");
        notification.success({ message: "Member Saved Successfully" });
      }
    } catch (err) {
      notification.error({
        message: "Server Error",
        description: "Failed to save member",
      });
    }
  };

  const onChangeStartDate = (date) => {
    setStartDate(date);

    if (date && memberShip) {
      setEndDate(dayjs(date).add(Number(memberShip), "month"));
    } else {
      setEndDate(null);
    }
  };

  const onChangeMembership = (value) => {
    setMemberShip(value);

    if (startDate && value) {
      setEndDate(dayjs(startDate).add(Number(value), "month"));
    } else {
      setEndDate(null);
    }
  };
  const end = (value, start) => {
    if (value === "1") {
      setEndDate(start.add(1, "month"));
    } else if (value === "2") {
      setEndDate(start.add(3, "month"));
    } else if (value === "3") {
      setEndDate(start.add(6, "month"));
    } else if (value === "4") {
      setEndDate(start.add(12, "month"));
    }
  };
  const loadStaff = () => {
    GetApiCall.getRequest("staff").then((res) =>
      res.json().then((data) => setStaff(data.data)),
    );
  };

  useEffect(() => {
    loadStaff();
  }, []);
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const preview = URL.createObjectURL(file);
    setSelectedLogo(preview);

    const form = new FormData();
    form.append("file", file);
    form.append("filename", `UserLogo-${file.name.replace(/\s/g, "")}`);

    fetch(ImageApiUrl, { method: "POST", body: form });

    return () => URL.revokeObjectURL(preview);
  };

  return (
    <>
      <Hero />
      <section className="py-5 inner-section">
        <Container>
          <Row className="justify-content-center align-items-center">
            <Col lg={12}>
              {/* <Form onSubmit={SaveForm}> */}
              <Row>
                <Col lg={3}>
                  <Row>
                    <Col lg={12} className="text-center mb-3">
                      <a href="#" className="customer-photo">
                        <ImgUpload
                          onChange={handleImageUpload}
                          src={selectedLogo || uploadimage}
                        />

                        {/* <Image src={CustomerPhoto} thumbnail /> */}
                      </a>
                    </Col>
                  </Row>
                </Col>
                <Col lg={9}>
                  <Row>
                    <Col lg={6}>
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Application Number"
                        className="mb-3"
                      >
                        <Form.Control
                          type="text"
                          value={applicationNumber}
                          disabled
                          placeholder=""
                        />
                      </FloatingLabel>
                    </Col>
                    <Col lg={6}>
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Membership Number"
                        className="mb-3"
                      >
                        <Form.Control
                          type="text"
                          value={membershipNumber}
                          disabled
                          placeholder=""
                        />
                      </FloatingLabel>
                    </Col>
                    <Col lg={6}>
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Full Name"
                        className="mb-3"
                      >
                        <Form.Control
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder=""
                        />
                      </FloatingLabel>
                    </Col>
                    <Col lg={6}>
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Mobile Number"
                        className="mb-3"
                      >
                        <Form.Control
                          type="text"
                          value={mobile}
                          onChange={(e) => setMobile(e.target.value)}
                          placeholder=""
                        />
                      </FloatingLabel>
                    </Col>
                    <Col lg={6}>
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Full Address"
                        className="mb-3"
                      >
                        <Form.Control
                          type="text"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder=""
                        />
                      </FloatingLabel>
                    </Col>
                    <Col lg={3}>
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Pincode"
                        className="mb-3"
                      >
                        <Form.Control
                          type="text"
                          value={pincode}
                          onChange={handlePincodeChange}
                          placeholder=""
                        />
                      </FloatingLabel>
                    </Col>
                    <Col lg={3}>
                      <FloatingLabel
                        controlId="floatingSelect"
                        label="State"
                        className="mb-3"
                      >
                        <Form.Control
                          type="text"
                          value={state}
                          placeholder=""
                          disabled
                        />
                      </FloatingLabel>
                    </Col>
                    <Col lg={6}>
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Email"
                        className="mb-3"
                      >
                        <Form.Control
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder=""
                        />
                      </FloatingLabel>
                    </Col>
                    <Col lg={3}>
                      <FloatingLabel
                        controlId="floatingSelect"
                        label="Select City"
                        className="mb-3"
                      >
                        <Form.Select
                          aria-label="Floating label select example"
                          onChange={(e) => {
                            setSelectedCity(e.target.value);
                          }}
                        >
                          {city.length > 0
                            ? city.map((data) => {
                                return (
                                  <option value={data.Block + "-" + data.Name}>
                                    {data.Block + "-" + data.Name}
                                  </option>
                                );
                              })
                            : ""}
                        </Form.Select>
                      </FloatingLabel>
                    </Col>

                    <Col lg={3}>
                      <FloatingLabel
                        controlId="floatingSelect"
                        label="Status"
                        className="mb-3"
                      >
                        <Form.Select
                          aria-label=""
                          value={status}
                          onChange={(e) => {
                            setStatus(e.target.value);
                          }}
                        >
                          <option value="">Select</option>
                          <option value="Active">Active</option>
                          <option value="InActive">In Active</option>
                        </Form.Select>
                      </FloatingLabel>
                    </Col>

                    <Col lg={3}>
                      {/* <DatePicker defaultValue={startDate} onChange={(date) => setStartDate(date)} /> */}
                      {/* <FloatingLabel
                    controlId="floatingInput"
                    label="Start Date"
                    className="mb-3"
                  > */}
                      <Space direction="vertical" size={12}>
                        <DatePicker
                          presets={presets}
                          value={startDate ? dayjs(startDate) : null}
                          format="YYYY-MM-DD"
                          placeholder="Start Date"
                          onChange={onChangeStartDate}
                        />
                      </Space>
                      {/* <Form.Control type="text" placeholder="Start Date" /> */}
                      {/* </FloatingLabel> */}
                    </Col>
                    <Col lg={3}>
                      <Space direction="vertical" size={12}>
                        <DatePicker
                          disabled
                          placeholder="End Date"
                          defaultValue={!endDate ? null : moment(endDate)}
                          value={!endDate ? null : moment(endDate)}
                        />
                      </Space>
                      {/* <FloatingLabel
                    controlId="floatingInput"
                    label="End Date"
                    className="mb-3"
                  >
                    <Form.Control type="text" placeholder="End Date" />
                  </FloatingLabel> */}
                    </Col>
                    <Col lg={3}>
                      <FloatingLabel
                        controlId="floatingSelect"
                        label="Select Membership"
                        className="mb-3"
                      >
                        <Form.Select
                          aria-label="Floating label select example"
                          value={memberShip}
                          onChange={(e) => onChangeMembership(e.target.value)}
                        >
                          <option selected>Select</option>
                          <option value="1">1 Month</option>
                          <option value="3">3 Months</option>
                          <option value="6">6 Month</option>
                          <option value="12">12 Month</option>
                        </Form.Select>
                      </FloatingLabel>
                    </Col>
                    <Col lg={3}>
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Amount Per Month"
                        className="mb-3"
                      >
                        <Form.Control
                          type="text"
                          value={amountPerMonth}
                          onChange={(e) => {
                            setAmountPerMonth(e.target.value);
                          }}
                          placeholder=""
                        />
                      </FloatingLabel>
                    </Col>
                    {id && (
                      <section className="mt-4 p-4 border rounded">
                        <h5>{trainer ? "Change" : "Assign"} Trainer</h5>

                        <FloatingLabel label="Select Trainer">
                          <Form.Select
                            value={trainer}
                            onChange={(e) => setTrainer(e.target.value)}
                          >
                            <option>Select Trainer</option>
                            {staff
                              ?.filter((trainer) => trainer?.role != "Admin")
                              .map((t) => (
                                <option value={t.id}>
                                  {t.name} - {t.staff_code}
                                </option>
                              ))}
                          </Form.Select>
                        </FloatingLabel>

                        <button
                          className="btn btn-dark mt-3"
                          onClick={() => {
                            PostApiCall.postRequest(
                              { memberId: id, trainerId: trainer },
                              "AssignTrainer",
                            ).then(() => {
                              notification.success({
                                message: "Trainer Assigned",
                              });
                            });
                          }}
                        >
                          {trainer ? "Update" : "Assign"} Trainer
                        </button>
                      </section>
                    )}
                    {showBiometric && (
                      <section className="mt-4 p-4 border rounded">
                        <h5>Biometric Assignment</h5>

                        <FloatingLabel label="Select Device" className="mb-3">
                          <Form.Select
                            onChange={(e) => setSelectedDevice(e.target.value)}
                          >
                            <option value="">Select Device</option>
                            <option value="NCD8251400352">
                              ESSL Face Device
                            </option>
                          </Form.Select>
                        </FloatingLabel>

                        <button
                          className="btn btn-success w-100"
                          onClick={() => {
                            PostApiCall.postRequest(
                              {
                                memberId: id,
                                deviceSn: selectedDevice,
                              },
                              "biometric/assign-user",
                            ).then(() => {
                              notification.success({
                                message: "Biometric Enrollment",
                                description:
                                  "User sent to device. Please scan face/finger on machine.",
                              });
                            });
                          }}
                        >
                          Add Customer to Biometric Device
                        </button>

                        <p className="mt-3 text-warning">
                          Status: {biometricStatus}
                        </p>
                      </section>
                    )}
                    <Col lg={4} className="ms-auto my-2">
                      <button
                        type="button"
                        className="btn btn-dark w-100 py-2 btn-lg"
                        onClick={SaveForm}
                      >
                        {location.state ? "Update Member" : "Add New Member"}
                      </button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default NewMembership;
