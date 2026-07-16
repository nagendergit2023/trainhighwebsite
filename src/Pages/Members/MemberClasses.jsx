import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Badge,
  Button,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";
import BatchCard from "../../Components/Batches/BatchCard";
import GetApiCall from "../../helpers/GetApi";
import PostApiCall from "../../helpers/PostApi";
import {
  getMemberId,
  saveStoredBooking,
} from "../../helpers/batchMemberStorage";
import "../BatchClasses/NewBatchClass.css";

const defaultFilters = {
  search: "",
  gender: "",
  booking: "",
};

const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const toLocalDateString = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const parseLocalDate = (value) => {
  const [year, month, day] = String(value).split("-").map(Number);
  return new Date(year, month - 1, day);
};

const formatDisplayDate = (value, options) =>
  parseLocalDate(value).toLocaleDateString("en-IN", options);

const buildDateStrip = () => {
  const today = new Date();
  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() + index);
    const value = toLocalDateString(date);
    return {
      value,
      weekday: weekDays[date.getDay()],
      dayLabel: date.toLocaleDateString("en-IN", { weekday: "short" }),
      dateLabel: date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
      }),
    };
  });
};

const timeValue = (time = "") => String(time).slice(0, 5);
const normalizeDate = (value) => {
  if (!value) return "";
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return toLocalDateString(value);
  }

  const text = String(value);
  if (!text.includes("T")) return text.slice(0, 10);

  const parsed = new Date(text);
  if (Number.isNaN(parsed.getTime())) return text.slice(0, 10);
  return toLocalDateString(parsed);
};
const isLiveBookingStatus = (status = "") => ["Booked", "Active"].includes(status);

const scheduleMatchesDate = (slot, selectedDate) => {
  const date = parseLocalDate(selectedDate);
  const selectedDay = weekDays[date.getDay()];
  if (slot.fld_day !== selectedDay) return false;

  if (
    slot.fld_start_date &&
    selectedDate < normalizeDate(slot.fld_start_date)
  ) {
    return false;
  }
  if (
    slot.fld_end_date &&
    selectedDate > normalizeDate(slot.fld_end_date)
  ) {
    return false;
  }

  return true;
};

export default function MemberClasses() {
  const navigate = useNavigate();
  const userData = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : {};
  const memberId = getMemberId(userData);
  const userBranchId = userData?.branch_id || userData?.fld_branch_id || "";
  const dateStrip = useMemo(() => buildDateStrip(), []);
  const [selectedDate, setSelectedDate] = useState(dateStrip[0].value);
  const [loading, setLoading] = useState(true);
  const [batches, setBatches] = useState([]);
  const [filters, setFilters] = useState(defaultFilters);

  const selectedDayName = useMemo(
    () => weekDays[parseLocalDate(selectedDate).getDay()],
    [selectedDate],
  );

  const normalizeList = useCallback((data) => {
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.rows)) return data.rows;
    if (Array.isArray(data?.data)) return data.data;
    return [];
  }, []);

  const enrichBatchSchedules = useCallback(async (list) => {
    const enriched = await Promise.all(
      list.map(async (batch) => {
        const batchId = batch.fld_id || batch.id;
        try {
          const [detailRes, memberRes] = await Promise.all([
            GetApiCall.getRequest(`batch/GetBatch/${batchId}`),
            GetApiCall.getRequest(`batch/GetBatchMembers/${batchId}`),
          ]);
          const json = await detailRes.json();
          const memberJson = await memberRes.json();
          const schedule = Array.isArray(json?.schedule) ? json.schedule : [];
          const batchMembers = normalizeList(memberJson);
          return { ...batch, schedule, batchMembers };
        } catch {
          return { ...batch, schedule: [], batchMembers: [] };
        }
      }),
    );
    return enriched;
  }, [normalizeList]);

  const loadClasses = useCallback(async () => {
    setLoading(true);
    try {
      const res = await PostApiCall.postRequest(
        {
          page: 1,
          limit: 200,
          status: "Active",
          branchId: userBranchId || "",
          memberView: true,
          day: selectedDayName,
          bookingDate: selectedDate,
          memberId,
        },
        "batch/GetBatches",
      );
      const json = await res.json();
      const rows = normalizeList(json).filter(
        (item) => item.fld_status === "Active",
      );
      setBatches(await enrichBatchSchedules(rows));
    } catch {
      notification.error({ message: "Unable to load classes" });
    }
    setLoading(false);
  }, [enrichBatchSchedules, memberId, normalizeList, selectedDate, selectedDayName, userBranchId]);

  useEffect(() => {
    loadClasses();
  }, [loadClasses]);

  const dateBatches = useMemo(() => {
    return batches
      .map((batch) => {
        const matchingSlots = (batch.schedule || []).filter((slot) =>
          scheduleMatchesDate(slot, selectedDate),
        );
        const firstSlot = matchingSlots[0];
        const dateMembers = (batch.batchMembers || []).filter(
          (member) =>
            normalizeDate(member.fld_booking_date) === selectedDate &&
            isLiveBookingStatus(member.fld_status),
        );
        const bookedByMember = dateMembers.some(
          (member) => String(member.fld_member_id) === String(memberId),
        );

        return {
          ...batch,
          matchingSlots,
          days: selectedDayName,
          startTime: timeValue(firstSlot?.fld_start_time || batch.startTime),
          endTime: timeValue(firstSlot?.fld_end_time || batch.endTime),
          totalMembers: dateMembers.length,
          dateBookedMembers: dateMembers.length,
          userBookingStatus: bookedByMember ? "BOOKED" : "",
        };
      })
      .filter((batch) => batch.matchingSlots.length > 0);
  }, [batches, memberId, selectedDate, selectedDayName]);

  const filteredBatches = useMemo(() => {
    const search = filters.search.toLowerCase();
    return dateBatches.filter((batch) => {
      const text = [
        batch.fld_batch_name,
        batch.fld_room_name,
        batch.trainers,
        batch.days,
        batch.fld_description,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      if (search && !text.includes(search)) return false;
      if (filters.gender && batch.fld_gender !== filters.gender) return false;
      if (filters.booking === "required" && !batch.fld_booking_required)
        return false;
      if (filters.booking === "walkin" && batch.fld_booking_required)
        return false;
      return true;
    });
  }, [dateBatches, filters]);

  const setFilter = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const bookSlot = async (batch) => {
    if (!memberId) {
      notification.error({ message: "Please login as member to book a slot" });
      return;
    }

    try {
      const res = await PostApiCall.postRequest(
        {
          batchId: batch.fld_id || batch.id,
          memberIds: [memberId],
          bookingDate: selectedDate,
          joinDate: selectedDate,
          paymentStatus: "Paid",
        },
        "batch/AssignMembersToBatch",
      );
      const json = await res.json();

      if (res.status === 200 || res.status === 201) {
        saveStoredBooking(memberId, batch, selectedDate);
        notification.success({ message: json.message || "Class booked" });
        navigate(`/members/batch-ticket/${batch.fld_id || batch.id}`, {
          state: { batch, bookingDate: selectedDate },
        });
        loadClasses();
      } else {
        notification.error({ message: json.message || "Unable to book class" });
      }
    } catch {
      notification.error({ message: "Unable to book class" });
    }
  };

  return (
    <section className="inner-section mt-5 batch-class-page member-classes-page">
      <Container className="pb-5">
        <div className="member-class-hero mb-4">
          <div>
            <p className="text-muted mb-1 text-center">Group Classes</p>
            <h2 className="weekly-title text-center mb-1">Book Your Slot</h2>
            <p className="text-muted text-center mb-0">
              Pick a date and choose from available classes for that day.
            </p>
          </div>
          <Button
            variant="outline-dark"
            onClick={() => navigate("/members/classes/history")}
          >
            History
          </Button>
        </div>

        <div className="member-date-panel mb-4">
          <div className="d-flex justify-content-between align-items-center gap-3 mb-3 flex-wrap">
            <div>
              <h5 className="mb-1">
                {formatDisplayDate(selectedDate, {
                  weekday: "long",
                  day: "2-digit",
                  month: "long",
                })}
              </h5>
              <small className="text-muted">
                Booking is valid only for selected date
              </small>
            </div>
            <Form.Control
              className="member-date-input"
              type="date"
              min={dateStrip[0].value}
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>
          <div className="member-date-strip">
            {dateStrip.map((item) => (
              <button
                type="button"
                key={item.value}
                className={`member-date-chip ${selectedDate === item.value ? "active" : ""}`}
                onClick={() => setSelectedDate(item.value)}
              >
                <span>{item.dayLabel}</span>
                <strong>{item.dateLabel}</strong>
              </button>
            ))}
          </div>
        </div>

        <div className="batch-filter-panel mb-4">
          <Row className="g-2">
            <Col md={5}>
              <Form.Control
                className="member-filter-control"
                placeholder="Search classes, trainer, room"
                value={filters.search}
                onChange={(e) => setFilter("search", e.target.value)}
              />
            </Col>
            <Col md={3}>
              <Form.Select
                value={filters.gender}
                onChange={(e) => setFilter("gender", e.target.value)}
              >
                <option value="">All Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Unisex</option>
              </Form.Select>
            </Col>
            <Col md={3}>
              <Form.Select
                value={filters.booking}
                onChange={(e) => setFilter("booking", e.target.value)}
              >
                <option value="">All Booking</option>
                <option value="required">Booking Required</option>
                <option value="walkin">Walk-In</option>
              </Form.Select>
            </Col>
            <Col md={1}>
              <Button
                className="w-100 h-100"
                variant="outline-secondary"
                onClick={() => setFilters(defaultFilters)}
              >
                Reset
              </Button>
            </Col>
          </Row>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <Spinner />
          </div>
        ) : filteredBatches.length ? (
          <>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-muted small">
                {filteredBatches.length} class
                {filteredBatches.length === 1 ? "" : "es"} available on{" "}
                {selectedDayName}
              </span>
              <Badge bg="light" text="dark">
                {selectedDate}
              </Badge>
            </div>
            <Row>
              {filteredBatches.map((batch) => (
                <Col
                  lg={6}
                  xl={4}
                  className="mb-4"
                  key={batch.fld_id || batch.id}
                >
                  <BatchCard
                    batch={batch}
                    isMember
                    onBook={() => bookSlot(batch)}
                  />
                </Col>
              ))}
            </Row>
          </>
        ) : (
          <div className="batch-empty-state">
            No classes are scheduled for {selectedDayName}. Try another date.
          </div>
        )}
      </Container>
    </section>
  );
}





