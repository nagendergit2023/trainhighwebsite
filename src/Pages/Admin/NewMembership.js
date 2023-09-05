import React, { useEffect, useState } from "react";
import {
  Col,
  Container,
  FloatingLabel,
  Form,
  Image,
  Row,
} from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import CustomerPhoto from "../../assets/images/customer_photo.png";
import CustomerPhoto from "../../assets/images/train_high_gym_coming_soon_1.webp";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import PostApiCall from "../../helpers/PostApi";
import { DatePicker, Space } from "antd";
import dayjs from "dayjs";
import axios from "axios";
import GetApiCall from "../../helpers/GetApi";
import moment from "moment";
import Hero from "../../Components/Hero/Hero";

function NewMembership() {
  let location = useLocation();
  let navigate = useNavigate();
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
  const [ImageApiUrl, setImageApiUrl] = useState(
    "http://localhost:3306/trainhighgym-api/AddImage"
  );
  const [previewUrl, setPreviewUrl] = useState("");
  const DATE_FORMAT = "YYYY-MM-DD";
  const onChangeEndDate = (date) => {
    if (date) {
      setEndDate(date);
    }
  };
  const onChangeStartDate = (date) => {
    if (date) {
      setStartDate(date);
    }
  };
  const handlePincodeChange = async (e) => {
    const value = e.target.value;
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
        const { City, State } = response.data[0].PostOffice[0];
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
        <img htmlFor="photo-upload" src={src} className="img-upload-input" />
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
    if (location.state != null) {
      setId(location.state.data.fld_id);
      setName(location.state.data.fld_name);
      setMobile(location.state.data.fld_mobile_number);
      setAddress(location.state.data.fld_address);
      setPincode(location.state.data.fld_pincode);
      setState(location.state.data.fld_state);
      setSelectedCity(location.state.data.fld_city);
      setMemberShip(location.state.data.fld_membership);
      setStartDate(
        moment(location.state.data.fld_start_date).format("YYYY-DD-MM")
      );
      setEndDate(moment(location.state.data.fld_end_date).format("YYYY-DD-MM"));
      setApplicationNumber(location.state.data.fld_application_number);
      setMembershipNumber(location.state.data.fld_membership_number);
    } else if (location.state != null && location.state.type == "renew") {
      setName(location.state.data.fld_name);
      setMobile(location.state.data.fld_mobile_number);
      setAddress(location.state.data.fld_address);
      setPincode(location.state.data.fld_pincode);
      setState(location.state.data.fld_state);
      setSelectedCity(location.state.data.fld_city);
      setMemberShip(location.state.data.fld_membership);
      setStartDate(
        moment(location.state.data.fld_start_date).format("YYYY-DD-MM")
      );
      setEndDate(moment(location.state.data.fld_end_date).format("YYYY-DD-MM"));
      setApplicationNumber(location.state.data.fld_application_number);
      setMembershipNumber(location.state.data.fld_membership_number);
    } else {
      GetApiCall.getRequest("GetSerialNumber").then((results) => {
        results.json().then((obj) => {
          if (results.status == 200 || results.status == 201) {
            setApplicationNumber(obj.appNumber);
            setMembershipNumber(obj.membershipNumber);
          }
        });
      });
    }
  }, []);
  const SaveForm = () => {
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
      },
      "AddUserDetails"
    ).then((results) => {
      results.json().then((obj) => {
        if (results.status == 200 || results.status == 201) {
          navigate("/tax-invoice", {
            state: obj,
          });
        }
      });
    });
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
                          form.append("foldername", "restaurant");
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
                        src={selectedLogo == "" ? previewUrl : selectedLogo}
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
                      controlId="floatingSelect"
                      label="Select Membership"
                      className="mb-3"
                    >
                      <Form.Select
                        aria-label="Floating label select example"
                        onChange={(e) => {
                          setMemberShip(e.target.value);
                        }}
                      >
                        <option value="1">1 Month</option>
                        <option value="2">3 Months</option>
                        <option value="3">6 Month</option>
                        <option value="4">12 Month</option>
                      </Form.Select>
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
                        onChange={onChangeStartDate}
                      />
                    </Space>
                    {/* <Form.Control type="text" placeholder="Start Date" /> */}
                    {/* </FloatingLabel> */}
                  </Col>
                  <Col lg={3}>
                    <Space direction="vertical" size={12}>
                      <DatePicker
                        format={DATE_FORMAT}
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
                        onChange={onChangeEndDate}
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
