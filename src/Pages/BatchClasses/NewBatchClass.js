import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Col, Container, FloatingLabel, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { DatePicker, notification } from "antd";
import dayjs from "dayjs";
import GetApiCall from "../../helpers/GetApi";
import PostApiCall from "../../helpers/PostApi";
import "./NewBatchClass.css";

const weekDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const buildTimeOptions = () => {
  const options = [];
  for (let minutes = 0; minutes < 24 * 60; minutes += 15) {
    const hours = String(Math.floor(minutes / 60)).padStart(2, "0");
    const mins = String(minutes % 60).padStart(2, "0");
    options.push(`${hours}:${mins}`);
  }
  return options;
};

const timeOptions = buildTimeOptions();

const bookingRuleOptions = [
  { label: "Immediately", value: 0 },
  { label: "15 minutes", value: 15 },
  { label: "30 minutes", value: 30 },
  { label: "45 minutes", value: 45 },
  { label: "1 hour", value: 60 },
  { label: "2 hours", value: 120 },
  { label: "3 hours", value: 180 },
  { label: "6 hours", value: 360 },
  { label: "12 hours", value: 720 },
  { label: "1 day", value: 1440 },
  { label: "2 days", value: 2880 },
  { label: "7 days", value: 10080 },
];

const timeToMinutes = (time = "") => {
  const [hours = 0, minutes = 0] = String(time).split(":").map(Number);
  return hours * 60 + minutes;
};

const emptyForm = {
  batchName: "",
  batchInfo: "",
  classType: "Group Class",
  level: "All Levels",
  intensity: "Moderate",
  capacity: 20,
  waitlistCapacity: 5,
  roomName: "",
  branchId: "",
  genderGroup: "Unisex",
  minAge: "",
  maxAge: "",
  bookingRequired: true,
  allowWaitlist: true,
  bookingOpenMinutes: 1440,
  cancellationCutoffMinutes: 120,
  price: 0,
  status: "Active",
  visibility: "Members",
  recurrenceType: "Weekly",
  startDate: null,
  endDate: null,
  onlineLink: "",
  equipmentRequired: "",
  instructions: "",
};

export default function BatchClassForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const userData =
    localStorage.getItem("user") && JSON.parse(localStorage.getItem("user"));
  const userRole = String(userData?.role || "").toUpperCase();
  const userBranchId = userData?.branch_id || userData?.fld_branch_id || "";
  const canManageAllBranches = userRole === "SUPER ADMIN";

  const [formData, setFormData] = useState({
    ...emptyForm,
    branchId: userBranchId,
  });
  const [trainers, setTrainers] = useState([]);
  const [selectedTrainers, setSelectedTrainers] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [branches, setBranches] = useState([]);
  const [selectedDays, setSelectedDays] = useState([]);
  const [startTime, setStartTime] = useState("07:00");
  const [endTime, setEndTime] = useState("08:00");
  const [sendPushNotification, setSendPushNotification] = useState(false);

  const normalizeBranchId = (item) =>
    item?.fld_branch_id || item?.branch_id || item?.branchId || item?.id || "";

  const normalizeList = (data) => {
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.data)) return data.data;
    if (Array.isArray(data?.rows)) return data.rows;
    if (Array.isArray(data?.branches)) return data.branches;
    return [];
  };

  const getBranchName = (branch) =>
    branch?.fld_branch_name ||
    branch?.branch_name ||
    branch?.name ||
    branch?.location ||
    normalizeBranchId(branch);

  const filterByBranch = useCallback(
    (list) => {
      if (canManageAllBranches || !userBranchId) return list;
      return list.filter(
        (item) => String(normalizeBranchId(item)) === String(userBranchId),
      );
    },
    [canManageAllBranches, userBranchId],
  );

  const setValue = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleChange = (e) => {
    setValue(e.target.name, e.target.value);
  };

  const toggleSelection = (list, item, setter) => {
    setter(
      list.includes(item) ? list.filter((i) => i !== item) : [...list, item],
    );
  };

  const loadBranches = useCallback(async () => {
    try {
      const res = await GetApiCall.getRequest("GetBranches");
      if (res.status === 200 || res.status === 201) {
        const data = await res.json();
        const list = normalizeList(data);
        if (list.length) {
          setBranches(filterByBranch(list));
          return;
        }
      }
    } catch (err) {}

    if (userBranchId) {
      setBranches([
        {
          id: userBranchId,
          branch_name: userData?.branch_name || userBranchId,
        },
      ]);
    }
  }, [filterByBranch, userBranchId, userData?.branch_name]);

  const loadDropdowns = useCallback(async () => {
    try {
      const trainerRes = await GetApiCall.getRequest(
        "batch/GetTrainerDropdown",
      );
      const trainerData = await trainerRes.json();
      setTrainers(normalizeList(trainerData));

      const serviceRes = await GetApiCall.getRequest(
        "batch/GetServiceDropdown",
      );
      const serviceData = await serviceRes.json();
      setServices(normalizeList(serviceData));
    } catch (err) {
      notification.error({ message: "Unable to load class setup data" });
    }
  }, []);

  const loadExistingBatch = useCallback(async () => {
    if (!isEditMode) return;

    try {
      const res = await GetApiCall.getRequest(`batch/GetBatch/${id}`);
      const json = await res.json();

      if (!(res.status === 200 || res.status === 201) || !json?.batch) {
        notification.error({
          message: json?.message || "Unable to load batch",
        });
        return;
      }

      const batch = json.batch;
      const schedule = Array.isArray(json.schedule) ? json.schedule : [];
      const firstSchedule = schedule[0] || {};
      const trainerIds = (json.trainers || []).map(
        (trainer) => trainer.fld_trainer_id || trainer.id,
      );
      const serviceIds = (json.services || []).map(
        (service) => service.fld_service_id || service.id,
      );

      setFormData((prev) => ({
        ...prev,
        batchName: batch.fld_batch_name || "",
        batchInfo: batch.fld_description || "",
        classType: batch.fld_class_type || prev.classType,
        level: batch.fld_level || prev.level,
        intensity: batch.fld_intensity || prev.intensity,
        capacity: batch.fld_capacity || 0,
        waitlistCapacity: batch.fld_waitlist_capacity || 0,
        roomName: batch.fld_room_name || "",
        branchId: batch.fld_branch_id || userBranchId || "",
        genderGroup: batch.fld_gender || "Unisex",
        minAge: batch.fld_min_age || "",
        maxAge: batch.fld_max_age || "",
        bookingRequired: Number(batch.fld_booking_required || 0) === 1,
        allowWaitlist: Number(batch.fld_allow_waitlist || 0) === 1,
        bookingOpenMinutes: Number(
          batch.fld_booking_open_minutes ?? prev.bookingOpenMinutes,
        ),
        cancellationCutoffMinutes: Number(
          batch.fld_cancellation_cutoff_minutes ??
            prev.cancellationCutoffMinutes,
        ),
        price: Number(batch.fld_price || 0),
        status: batch.fld_status || "Active",
        visibility: batch.fld_visibility || prev.visibility,
        recurrenceType:
          firstSchedule.fld_recurrence_type || prev.recurrenceType,
        onlineLink: batch.fld_online_link || "",
        equipmentRequired: batch.fld_equipment_required || "",
        instructions: batch.fld_instructions || "",
        startDate: firstSchedule.fld_start_date
          ? dayjs(firstSchedule.fld_start_date)
          : null,
        endDate: firstSchedule.fld_end_date
          ? dayjs(firstSchedule.fld_end_date)
          : null,
      }));
      setSelectedDays(schedule.map((item) => item.fld_day).filter(Boolean));
      setStartTime(firstSchedule.fld_start_time?.slice(0, 5) || null);
      setEndTime(firstSchedule.fld_end_time?.slice(0, 5) || null);
      setSelectedTrainers(trainerIds.filter(Boolean));
      setSelectedServices(serviceIds.filter(Boolean));
    } catch (err) {
      notification.error({ message: "Unable to load batch" });
    }
  }, [id, isEditMode, userBranchId]);
  useEffect(() => {
    loadBranches();
    loadDropdowns();
  }, [loadBranches, loadDropdowns]);

  useEffect(() => {
    loadExistingBatch();
  }, [loadExistingBatch]);

  const branchOptions = useMemo(() => {
    if (branches.length) return branches;
    if (userBranchId) return [{ id: userBranchId, branch_name: userBranchId }];
    return [];
  }, [branches, userBranchId]);

  const validate = () => {
    if (!formData.batchName.trim()) return "Enter Batch Name";
    if (!formData.branchId) return "Select Branch";
    if (!formData.capacity || Number(formData.capacity) <= 0)
      return "Enter Valid Capacity";
    if (selectedDays.length === 0) return "Select Working Days";
    if (selectedTrainers.length === 0) return "Assign Trainer";
    if (!startTime || !endTime) return "Select Start and End Time";
    if (timeToMinutes(endTime) <= timeToMinutes(startTime)) {
      return "End Time Must Be Greater Than Start Time";
    }
    if (
      formData.endDate &&
      formData.startDate &&
      !dayjs(formData.endDate).isAfter(dayjs(formData.startDate), "day")
    ) {
      return "Batch End Date Must Be After Start Date";
    }
    if (
      formData.maxAge &&
      formData.minAge &&
      Number(formData.maxAge) < Number(formData.minAge)
    ) {
      return "Max Age Cannot Be Less Than Min Age";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validate();
    if (error) return notification.error({ message: error });

    const schedules = selectedDays.map((day) => ({
      day,
      startTime,
      endTime,
      startDate: formData.startDate?.format("YYYY-MM-DD") || null,
      endDate: formData.endDate?.format("YYYY-MM-DD") || null,
      recurrenceType: formData.recurrenceType,
    }));

    const payload = {
      branchId: formData.branchId,
      createdBy: userData?.fld_id || userData?.id || userData?.user_id || null,
      batchName: formData.batchName.trim(),
      batchInfo: formData.batchInfo?.trim() || "",
      classType: formData.classType,
      level: formData.level,
      intensity: formData.intensity,
      capacity: Number(formData.capacity),
      waitlistCapacity: Number(formData.waitlistCapacity || 0),
      roomName: formData.roomName,
      genderGroup: formData.genderGroup,
      minAge: formData.minAge ? Number(formData.minAge) : null,
      maxAge: formData.maxAge ? Number(formData.maxAge) : null,
      bookingRequired: formData.bookingRequired,
      allowWaitlist: formData.allowWaitlist,
      bookingOpenMinutes: Number(formData.bookingOpenMinutes || 0),
      cancellationCutoffMinutes: Number(
        formData.cancellationCutoffMinutes || 0,
      ),
      price: Number(formData.price || 0),
      status: formData.status,
      visibility: formData.visibility,
      onlineLink: formData.onlineLink,
      equipmentRequired: formData.equipmentRequired,
      instructions: formData.instructions,
      trainers: selectedTrainers.map((id) => ({
        id,
        startDate: formData.startDate?.format("YYYY-MM-DD") || null,
        endDate: formData.endDate?.format("YYYY-MM-DD") || null,
      })),
      services: selectedServices,
      schedules,
    };

    try {
      const res = await PostApiCall.postRequest(
        isEditMode ? { ...payload, batchId: id } : payload,
        isEditMode ? "batch/UpdateBatch" : "batch/SaveBatch",
      );
      const json = await res.json();

      if (res.status === 200 || res.status === 201) {
        notification.success({
          message:
            json.message ||
            (isEditMode
              ? "Batch updated successfully"
              : "Batch saved successfully"),
        });

        if (!isEditMode && sendPushNotification) {
          try {
            const notifyRes = await PostApiCall.postRequest(
              {
                batchId: json.batchId,
                title: "New Class Added",
                message: `${formData.batchName} is now open for booking.`,
                url: "/members/classes",
              },
              "pushalert/SendBatchNotification",
            );
            if (!(notifyRes.status === 200 || notifyRes.status === 201)) {
              notification.warning({
                message: "Batch saved, but PushAlert notification was not sent",
              });
            }
          } catch {
            notification.warning({
              message: "Batch saved, but PushAlert notification was not sent",
            });
          }
        }

        navigate("/batches");
      } else {
        notification.error({ message: json.message || "Unable to save batch" });
      }
    } catch {
      notification.error({ message: "Server Error" });
    }
  };

  return (
    <>
      <section className="pb-5 inner-section">
        <Container>
          <Row className="justify-content-center mb-3">
            <Col lg={9}>
              <h2 className="section-title">
                {isEditMode ? "Edit Batch & Class" : "Create Batch & Class"}
              </h2>
              <p className="text-muted text-center mb-0">
                Configure capacity, trainers, schedule, booking rules and member
                visibility.
              </p>
            </Col>
          </Row>
          <Row className="justify-content-center align-items-center">
            <Col lg={12}>
              <div className="batch-form-header mb-4">
                <div></div>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => navigate("/batches")}
                >
                  View Batches
                </button>
              </div>

              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col lg={4}>
                    <FloatingLabel label="Batch / Class Name" className="mb-3">
                      <Form.Control
                        name="batchName"
                        value={formData.batchName}
                        onChange={handleChange}
                      />
                    </FloatingLabel>
                  </Col>
                  <Col lg={4}>
                    <FloatingLabel label="Branch" className="mb-3">
                      <Form.Select
                        name="branchId"
                        value={formData.branchId}
                        disabled={!canManageAllBranches}
                        onChange={handleChange}
                      >
                        <option value="">Select Branch</option>
                        {branchOptions.map((branch) => {
                          const branchId = normalizeBranchId(branch);
                          return (
                            <option key={branchId} value={branchId}>
                              {getBranchName(branch)}
                            </option>
                          );
                        })}
                      </Form.Select>
                    </FloatingLabel>
                  </Col>
                  <Col lg={4}>
                    <FloatingLabel label="Room / Studio" className="mb-3">
                      <Form.Control
                        name="roomName"
                        value={formData.roomName}
                        onChange={handleChange}
                      />
                    </FloatingLabel>
                  </Col>

                  <Col lg={3}>
                    <FloatingLabel label="Class Type" className="mb-3">
                      <Form.Select
                        name="classType"
                        value={formData.classType}
                        onChange={handleChange}
                      >
                        <option>Group Class</option>
                        <option>Personal Training</option>
                        <option>Open Gym Slot</option>
                        <option>Workshop</option>
                        <option>Kids Batch</option>
                      </Form.Select>
                    </FloatingLabel>
                  </Col>
                  <Col lg={3}>
                    <FloatingLabel label="Level" className="mb-3">
                      <Form.Select
                        name="level"
                        value={formData.level}
                        onChange={handleChange}
                      >
                        <option>Beginner</option>
                        <option>Intermediate</option>
                        <option>Advanced</option>
                        <option>All Levels</option>
                      </Form.Select>
                    </FloatingLabel>
                  </Col>
                  <Col lg={3}>
                    <FloatingLabel label="Intensity" className="mb-3">
                      <Form.Select
                        name="intensity"
                        value={formData.intensity}
                        onChange={handleChange}
                      >
                        <option>Low</option>
                        <option>Moderate</option>
                        <option>High</option>
                      </Form.Select>
                    </FloatingLabel>
                  </Col>
                  <Col lg={3}>
                    <FloatingLabel label="Gender Group" className="mb-3">
                      <Form.Select
                        name="genderGroup"
                        value={formData.genderGroup}
                        onChange={handleChange}
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Unisex">Unisex</option>
                      </Form.Select>
                    </FloatingLabel>
                  </Col>

                  <Col lg={3}>
                    <FloatingLabel label="Capacity" className="mb-3">
                      <Form.Control
                        type="number"
                        min="1"
                        name="capacity"
                        value={formData.capacity}
                        onChange={handleChange}
                      />
                    </FloatingLabel>
                  </Col>
                  <Col lg={3}>
                    <FloatingLabel label="Waitlist Capacity" className="mb-3">
                      <Form.Control
                        type="number"
                        min="0"
                        name="waitlistCapacity"
                        value={formData.waitlistCapacity}
                        onChange={handleChange}
                      />
                    </FloatingLabel>
                  </Col>
                  <Col lg={3}>
                    <FloatingLabel label="Min Age" className="mb-3">
                      <Form.Control
                        type="number"
                        min="0"
                        name="minAge"
                        value={formData.minAge}
                        onChange={handleChange}
                      />
                    </FloatingLabel>
                  </Col>
                  <Col lg={3}>
                    <FloatingLabel label="Max Age" className="mb-3">
                      <Form.Control
                        type="number"
                        min="0"
                        name="maxAge"
                        value={formData.maxAge}
                        onChange={handleChange}
                      />
                    </FloatingLabel>
                  </Col>

                  <Col lg={12}>
                    <FloatingLabel label="Batch Info" className="mb-3">
                      <Form.Control
                        as="textarea"
                        style={{ height: 110 }}
                        name="batchInfo"
                        value={formData.batchInfo}
                        onChange={handleChange}
                      />
                    </FloatingLabel>
                  </Col>

                  <Col lg={12} className="mb-4">
                    <h6 className="fw-bold">Assign Trainers</h6>
                    <div className="batch-chip-row">
                      {trainers.map((trainer) => (
                        <button
                          type="button"
                          key={trainer.fld_id || trainer.id}
                          className={`badge-select ${selectedTrainers.includes(trainer.fld_id || trainer.id) ? "active" : ""}`}
                          onClick={() =>
                            toggleSelection(
                              selectedTrainers,
                              trainer.fld_id || trainer.id,
                              setSelectedTrainers,
                            )
                          }
                        >
                          {trainer.fld_name || trainer.name}{" "}
                          {trainer.staff_code ? `- ${trainer.staff_code}` : ""}
                        </button>
                      ))}
                      {trainers.length === 0 && (
                        <span className="text-muted small">
                          No trainers found for this branch.
                        </span>
                      )}
                    </div>
                  </Col>

                  <Col lg={12} className="mb-4">
                    <h6 className="fw-bold">Services Included</h6>
                    <div className="batch-chip-row">
                      {services.map((service) => (
                        <button
                          type="button"
                          key={service.fld_id || service.id}
                          className={`badge-select ${selectedServices.includes(service.fld_id || service.id) ? "active" : ""}`}
                          onClick={() =>
                            toggleSelection(
                              selectedServices,
                              service.fld_id || service.id,
                              setSelectedServices,
                            )
                          }
                        >
                          {service.fld_name || service.name}
                        </button>
                      ))}
                    </div>
                  </Col>

                  <Col lg={12} className="mb-4">
                    <h6 className="fw-bold">Working Days</h6>
                    <div className="batch-chip-row">
                      {weekDays.map((day) => (
                        <button
                          type="button"
                          key={day}
                          className={`badge-select ${selectedDays.includes(day) ? "active" : ""}`}
                          onClick={() =>
                            toggleSelection(selectedDays, day, setSelectedDays)
                          }
                        >
                          {day}
                        </button>
                      ))}
                    </div>
                  </Col>

                  <Col lg={3}>
                    <FloatingLabel label="Start Time" className="mb-3">
                      <Form.Select
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                      >
                        {timeOptions.map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </Form.Select>
                    </FloatingLabel>
                  </Col>
                  <Col lg={3}>
                    <FloatingLabel label="End Time" className="mb-3">
                      <Form.Select
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                      >
                        {timeOptions.map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </Form.Select>
                    </FloatingLabel>
                  </Col>
                  <Col lg={3} className="mb-3">
                    <label className="batch-field-label">
                      Batch Start Date
                    </label>
                    <DatePicker
                      className="w-100 batch-time-picker"
                      value={formData.startDate}
                      onChange={(date) => setValue("startDate", date)}
                    />
                  </Col>
                  <Col lg={3} className="mb-3">
                    <label className="batch-field-label">Batch End Date</label>
                    <DatePicker
                      className="w-100 batch-time-picker"
                      value={formData.endDate}
                      onChange={(date) => setValue("endDate", date)}
                    />
                  </Col>

                  <Col lg={3}>
                    <FloatingLabel label="Recurrence" className="mb-3">
                      <Form.Select
                        name="recurrenceType"
                        value={formData.recurrenceType}
                        onChange={handleChange}
                      >
                        <option>Weekly</option>
                        <option>Daily</option>
                        <option>One Time</option>
                      </Form.Select>
                    </FloatingLabel>
                  </Col>
                  <Col lg={3}>
                    <FloatingLabel
                      label="Booking Opens Before"
                      className="mb-3"
                    >
                      <Form.Select
                        name="bookingOpenMinutes"
                        value={formData.bookingOpenMinutes}
                        onChange={(e) =>
                          setValue("bookingOpenMinutes", Number(e.target.value))
                        }
                      >
                        {bookingRuleOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </Form.Select>
                    </FloatingLabel>
                  </Col>
                  <Col lg={3}>
                    <FloatingLabel
                      label="Cancel Cutoff Before"
                      className="mb-3"
                    >
                      <Form.Select
                        name="cancellationCutoffMinutes"
                        value={formData.cancellationCutoffMinutes}
                        onChange={(e) =>
                          setValue(
                            "cancellationCutoffMinutes",
                            Number(e.target.value),
                          )
                        }
                      >
                        {bookingRuleOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </Form.Select>
                    </FloatingLabel>
                  </Col>
                  {/* <Col lg={3}>
                    <FloatingLabel label="Drop-in Price" className="mb-3">
                      <Form.Control
                        type="number"
                        min="0"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                      />
                    </FloatingLabel>
                  </Col> */}

                  <Col lg={3}>
                    <FloatingLabel label="Status" className="mb-3">
                      <Form.Select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                      >
                        <option>Active</option>
                        <option>Inactive</option>
                      </Form.Select>
                    </FloatingLabel>
                  </Col>
                  <Col lg={3}>
                    <FloatingLabel label="Visible To" className="mb-3">
                      <Form.Select
                        name="visibility"
                        value={formData.visibility}
                        onChange={handleChange}
                      >
                        <option>Members</option>
                        <option>Staff Only</option>
                        <option>Public</option>
                      </Form.Select>
                    </FloatingLabel>
                  </Col>
                  <Col lg={3} className="d-flex align-items-center mb-3">
                    <Form.Check
                      type="switch"
                      label="Booking Required"
                      checked={formData.bookingRequired}
                      onChange={(e) =>
                        setValue("bookingRequired", e.target.checked)
                      }
                    />
                  </Col>
                  <Col lg={3} className="d-flex align-items-center mb-3">
                    <Form.Check
                      type="switch"
                      label="Allow Waitlist"
                      checked={formData.allowWaitlist}
                      onChange={(e) =>
                        setValue("allowWaitlist", e.target.checked)
                      }
                    />
                  </Col>
                  {!isEditMode && (
                    <Col lg={3} className="d-flex align-items-center mb-3">
                      <Form.Check
                        type="switch"
                        label="Notify All Members"
                        checked={sendPushNotification}
                        onChange={(e) =>
                          setSendPushNotification(e.target.checked)
                        }
                      />
                    </Col>
                  )}

                  <Col lg={6}>
                    <FloatingLabel label="Online Class Link" className="mb-3">
                      <Form.Control
                        name="onlineLink"
                        value={formData.onlineLink}
                        onChange={handleChange}
                      />
                    </FloatingLabel>
                  </Col>
                  <Col lg={6}>
                    <FloatingLabel label="Equipment Required" className="mb-3">
                      <Form.Control
                        name="equipmentRequired"
                        value={formData.equipmentRequired}
                        onChange={handleChange}
                      />
                    </FloatingLabel>
                  </Col>
                  <Col lg={12}>
                    <FloatingLabel label="Member Instructions" className="mb-3">
                      <Form.Control
                        as="textarea"
                        style={{ height: 90 }}
                        name="instructions"
                        value={formData.instructions}
                        onChange={handleChange}
                      />
                    </FloatingLabel>
                  </Col>

                  <Col lg={4} className="ms-auto my-2">
                    <button
                      className="btn btn-dark w-100 py-2 btn-lg"
                      type="submit"
                    >
                      {isEditMode ? "Update Batch" : "Save Batch"}
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
