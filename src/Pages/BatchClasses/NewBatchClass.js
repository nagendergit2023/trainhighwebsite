import React, { useEffect, useState } from "react";
import { Col, Container, FloatingLabel, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { notification, TimePicker } from "antd";
import dayjs from "dayjs";
import Hero from "../../Components/Hero/Hero";
import GetApiCall from "../../helpers/GetApi";
import PostApiCall from "../../helpers/PostApi";
import "./NewBatchClass.css";

export default function BatchClassForm() {
  const navigate = useNavigate();

  const [batchName, setBatchName] = useState("");
  const [batchInfo, setBatchInfo] = useState("");
  const [capacity, setCapacity] = useState("");
  const [roomName, setRoomName] = useState("");

  const [trainers, setTrainers] = useState([]);
  const [selectedTrainers, setSelectedTrainers] = useState([]);

  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [bookingRequired, setBookingRequired] = useState(false);

  const [workingDays] = useState([
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ]);
  const [selectedDays, setSelectedDays] = useState([]);

  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const [genderGroup, setGenderGroup] = useState("");

  const toggleSelection = (list, item, setter) => {
    setter(
      list.includes(item) ? list.filter((i) => i !== item) : [...list, item],
    );
  };
  useEffect(() => {
    loadDropdowns();
  }, []);

  const loadDropdowns = async () => {
    try {
      const trainerRes = await GetApiCall.getRequest("staff/trainers/1");
      const trainerData = await trainerRes.json();

      setTrainers(trainerData?.data);

      const serviceRes = await GetApiCall.getRequest(
        "batch/GetServiceDropdown",
      );
      const serviceData = await serviceRes.json();

      setServices(serviceData);
    } catch (err) {
      notification.error({
        message: "Unable to load dropdowns",
      });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!batchName)
      return notification.error({
        message: "Enter Batch Name",
      });

    if (selectedDays.length === 0)
      return notification.error({
        message: "Select Working Days",
      });

    if (selectedTrainers.length === 0)
      return notification.error({
        message: "Assign Trainer",
      });

    if (!startTime || !endTime)
      return notification.error({
        message: "Select Time",
      });

    const schedules = selectedDays.map((day) => ({
      day,

      startTime,

      endTime,

      startDate: null,

      endDate: null,
    }));

    const payload = {
      batchName,

      batchInfo,

      capacity: Number(capacity),

      roomName,

      genderGroup,

      bookingRequired,

      trainers: selectedTrainers,

      services: selectedServices,

      schedules,
    };

    try {
      const res = await PostApiCall.postRequest(payload, "batch/SaveBatch");

      const json = await res.json();

      if (res.status === 200) {
        notification.success({
          message: json.message,
        });

        navigate("/batches");
      } else {
        notification.error({
          message: json.message,
        });
      }
    } catch {
      notification.error({
        message: "Server Error",
      });
    }
  };

  return (
    <>
      <Hero />
      <section className="py-5 inner-section">
        <Container>
          <Row className="justify-content-center align-items-center">
            <Col lg={12}>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col lg={6}>
                    <FloatingLabel label="Batch Name" className="mb-3">
                      <Form.Control
                        type="text"
                        placeholder=""
                        value={batchName}
                        onChange={(e) => setBatchName(e.target.value)}
                      />
                    </FloatingLabel>
                  </Col>

                  <Col lg={6}>
                    <FloatingLabel label="Capacity" className="mb-3">
                      <Form.Control
                        type="text"
                        placeholder=""
                        value={capacity}
                        onChange={(e) => setCapacity(e.target.value)}
                      />
                    </FloatingLabel>
                  </Col>

                  <Col lg={12}>
                    <FloatingLabel label="Batch Info" className="mb-3">
                      <Form.Control
                        as="textarea"
                        placeholder=""
                        style={{ height: "120px" }}
                        value={batchInfo}
                        onChange={(e) => setBatchInfo(e.target.value)}
                      />
                    </FloatingLabel>
                  </Col>

                  <Col lg={6}>
                    <FloatingLabel label="Room Name" className="mb-3">
                      <Form.Control
                        type="text"
                        placeholder=""
                        value={roomName}
                        onChange={(e) => setRoomName(e.target.value)}
                      />
                    </FloatingLabel>
                  </Col>

                  {/* Trainers */}
                  <Col lg={12} className="mb-4">
                    <h6 className="fw-bold">Assign Trainers</h6>
                    <div className="d-flex gap-3 flex-wrap">
                      {console.log(trainers)}
                      {trainers?.map((t) => (
                        <div
                          key={t.id}
                          className={`badge-select ${
                            selectedTrainers.includes(t.id) ? "active" : ""
                          }`}
                          onClick={() =>
                            toggleSelection(
                              selectedTrainers,
                              t.id,
                              setSelectedTrainers,
                            )
                          }
                        >
                          {t.name}
                        </div>
                      ))}
                    </div>
                  </Col>
                  <Col lg={6}>
                    <Form.Check
                      type="switch"
                      label="Booking Required"
                      checked={bookingRequired}
                      onChange={(e) => setBookingRequired(e.target.checked)}
                    />
                  </Col>

                  {/* Services */}
                  <Col lg={12} className="mb-4">
                    <h6 className="fw-bold">Services</h6>
                    <div className="d-flex gap-3 flex-wrap">
                      {services.map((s) => (
                        <div
                          key={s.fld_id}
                          className={`badge-select ${
                            selectedServices.includes(s.fld_id) ? "active" : ""
                          }`}
                          onClick={() =>
                            toggleSelection(
                              selectedServices,
                              s.fld_id,
                              setSelectedServices,
                            )
                          }
                        >
                          {s.fld_name}
                        </div>
                      ))}
                    </div>
                  </Col>
                  {/* Working Days */}
                  <Col lg={12} className="mb-4">
                    <h6 className="fw-bold">Working Days</h6>
                    <div className="d-flex flex-wrap" style={{ gap: "0.7rem" }}>
                      {workingDays.map((d) => (
                        <div
                          key={d}
                          className={`badge-select ${
                            selectedDays.includes(d) ? "active" : ""
                          }`}
                          onClick={() =>
                            toggleSelection(selectedDays, d, setSelectedDays)
                          }
                        >
                          {d}
                        </div>
                      ))}
                    </div>
                  </Col>

                  {/* Times */}
                  <Col lg={4} className="mb-3">
                    <FloatingLabel label="Start Time">
                      <TimePicker
                        className="w-100"
                        value={startTime ? dayjs(startTime, "HH:mm") : null}
                        onChange={(t) =>
                          setStartTime(t ? t.format("HH:mm") : null)
                        }
                      />
                    </FloatingLabel>
                  </Col>

                  <Col lg={4} className="mb-3">
                    <FloatingLabel label="End Time">
                      <TimePicker
                        className="w-100"
                        value={endTime ? dayjs(endTime, "HH:mm") : null}
                        onChange={(t) =>
                          setEndTime(t ? t.format("HH:mm") : null)
                        }
                      />
                    </FloatingLabel>
                  </Col>

                  {/* Gender Group */}
                  <Col lg={4} className="mb-3">
                    <FloatingLabel label="Gender Group">
                      <Form.Select
                        value={genderGroup}
                        onChange={(e) => setGenderGroup(e.target.value)}
                      >
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Unisex">Unisex</option>
                      </Form.Select>
                    </FloatingLabel>
                  </Col>

                  {/* Submit */}
                  <Col lg={4} className="ms-auto my-2">
                    <button
                      className="btn btn-dark w-100 py-2 btn-lg"
                      type="submit"
                    >
                      Save Batch
                    </button>
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
