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
import uploadimage from "../../assets/images/Upload User Image.png";

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
  const [ImageApiUrl, setImageApiUrl] = useState(
    "http://68.178.170.174:3309/trainhighgym-api/AddImage"
  );
  // const [previewUrl, setPreviewUrl] = useState("");
  const DATE_FORMAT = "YYYY-MM-DD";
  const handlePincodeChange = async (e) => {
    const value = e || e.target.value;
    setPincode(value);
    try {
      const response = await axios.get(
        `https://api.postalpincode.in/pincode/${value}`
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
      setCity("");
      setState("");
    }
  };
  const ImgUpload = ({ onChange, src, id }) => (
    <label
      htmlFor="photo-upload"
      className="custom-file-upload img-upload-input p-2 fas w-100"
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
      console.log(location.state.data.fld_start_date);
      setStartDate("2023-09-25");
      setEndDate(moment(location.state.data.fld_end_date));
      setApplicationNumber(location.state.data.fld_application_number);
      setMembershipNumber(location.state.data.fld_membership_number);
      setStatus(location.state.data.fld_status);
      setEmail(location.state.data.fld_email);
      setAmountPerMonth(location.state.data.fld_amount_permnth);
      setOldmembershipid(location.state.data.fld_old_membership);
      setType(location.state.data.fld_type);
    } else if (location.state !== null && location.state.type === "renew") {
      setName(location.state.data.fld_name);
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
      setType("New");
      GetApiCall.getRequest("GetSerialNumber").then((results) => {
        results.json().then((obj) => {
          if (results.status === 200 || results.status === 201) {
            setApplicationNumber(obj.appNumber);
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
  const SaveForm = () => {
    if (name !== "") {
      if (mobile !== null) {
        if (address !== "") {
          if (email !== "") {
            if (status !== "") {
              if (amountPerMonth !== null) {
                if (startDate !== null) {
                  if (memberShip !== "" && memberShip != null) {
                    PostApiCall.postRequest(
                      {
                        id: id,
                        name: name,
                        mobile: mobile,
                        address: address,
                        application: applicationNumber,
                        membershipnumber: membershipNumber,
                        membership: memberShip,
                        pincode: pincode,
                        state: state,
                        city: selectedCity,
                        startDate: startDate,
                        endDate: endDate,
                        email: email,
                        userstatus: status,
                        amount: amountPerMonth,
                        type: type,
                        oldmembership: oldmembershipid,
                      },
                      "AddUserDetails"
                    ).then((results) => {
                      results.json().then((obj) => {
                        if (results.status === 200 || results.status === 201) {
                          navigate("/tax-invoice", {
                            state: obj,
                          });
                        }
                      });
                    });
                  } else {
                    notification.error({
                      message: `Notification error`,
                      description: "Please Select Membership Period",
                    });
                  }
                } else {
                  notification.error({
                    message: `Notification error`,
                    description: "Please Enter Start Date",
                  });
                }
              } else {
                notification.error({
                  message: `Notification error`,
                  description: "Please Enter Fee Per Month",
                });
              }
            } else {
              notification.error({
                message: `Notification error`,
                description: "Please Select Status Of Member",
              });
            }
          } else {
            notification.error({
              message: `Notification error`,
              description: "Please Enter Email",
            });
          }
        } else {
          notification.error({
            message: `Notification error`,
            description: "Please Enter Address",
          });
        }
      } else {
        notification.error({
          message: `Notification error`,
          description: "Please Enter Mobile Number",
        });
      }
    } else {
      notification.error({
        message: `Notification error`,
        description: "Please Enter Name",
      });
    }
  };

  const onChangeStartDate = (date) => {
    setStartDate(date); // Update the start date
    if (memberShip !== "") {
      end(memberShip, date);
    }
  };
  const onChangeMembership = (value) => {
    setMemberShip(value);
    if (startDate !== null) {
      end(value, startDate);
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
  return (
    <>
      <Hero />
      <section className="py-5 inner-section">
        <Container>
          <Row className="justify-content-center align-items-center">
            <Col lg={12}>
              <Form onSubmit={SaveForm}>
                <Row>
                  <Col lg={12} className="text-center mb-3">
                    <a href="#" className="customer-photo">
                      <ImgUpload
                        onChange={(e) => {
                          e.preventDefault();
                          const imageFile = e.target.files[0];
                          setSelectedLogo(URL.createObjectURL(imageFile));
                          const form = new FormData();
                          console.log(URL.createObjectURL(imageFile));
                          let filename = `UserLogo-${imageFile.name.replace(
                            / /g,
                            ""
                          )}`;
                          form.append("file", imageFile);
                          // form.append("foldername", "profileimages");
                          form.append("filename", filename);
                          let response;
                          response = fetch(ImageApiUrl, {
                            method: "POST",
                            body: form,
                          })
                            .then((response) => response.json())
                            .then((data) => {
                              // setRestaurantLogo(imageurl + filename);
                            });
                        }}
                        src={selectedLogo === "" ? uploadimage : selectedLogo}
                      />

                      {/* <Image src={CustomerPhoto} thumbnail /> */}
                    </a>
                  </Col>
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
                      />
                    </FloatingLabel>
                  </Col>
                  <Col lg={2}>
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Pincode"
                      className="mb-3"
                    >
                      <Form.Control
                        type="text"
                        value={pincode}
                        onChange={handlePincodeChange}
                      />
                    </FloatingLabel>
                  </Col>
                  <Col lg={2}>
                    <FloatingLabel
                      controlId="floatingSelect"
                      label="State"
                      className="mb-3"
                    >
                      <Form.Control type="text" value={state} disabled />
                    </FloatingLabel>
                  </Col>
                  <Col lg={2}>
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
                        placeholder="example@gmail.com"
                      />
                    </FloatingLabel>
                  </Col>
                  <Col lg={3}>
                    <FloatingLabel
                      controlId="floatingSelect"
                      label="Status"
                      className="mb-3"
                    >
                      <Form.Select
                        aria-label="Floating label select example"
                        value={status}
                        onChange={(e) => {
                          setStatus(e.target.value);
                        }}
                      >
                        <option selected>Select</option>
                        <option value="Active">Active</option>
                        <option value="InActive">In Active</option>
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
                        placeholder="example@gmail.com"
                      />
                    </FloatingLabel>
                  </Col>

                  <Col lg={3}>
                    {/* <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /> */}
                    {/* <FloatingLabel
                    controlId="floatingInput"
                    label="Start Date"
                    className="mb-3"
                  > */}
                    <Space direction="vertical" size={12}>
                      <DatePicker
                        presets={[
                          {
                            label: "Yesterday",
                            value: dayjs().add(-1, "d"),
                          },
                          {
                            label: "Last Week",
                            value: dayjs().add(-7, "d"),
                          },
                          {
                            label: "Last Month",
                            value: dayjs().add(-1, "month"),
                          },
                        ]}
                        className="mx-0 mb-3 mb-lg-0"
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
                        format={DATE_FORMAT}
                        value={endDate}
                        // onChange={onChangeEndDate}
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
                  <Col lg={6}>
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
                        <option value="2">3 Months</option>
                        <option value="3">6 Month</option>
                        <option value="4">12 Month</option>
                      </Form.Select>
                    </FloatingLabel>
                  </Col>
                  <Col lg={4} className="mx-auto my-4">
                    <Link
                      to="/new-membership"
                      className="btn btn-secondary w-100 py-2"
                      onClick={SaveForm}
                    >
                      {location.state == null
                        ? "Add New Member"
                        : "Update Member"}
                    </Link>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default NewMembership;
