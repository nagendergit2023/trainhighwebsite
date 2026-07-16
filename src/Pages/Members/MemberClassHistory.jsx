import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Badge,
  Button,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Spinner,
} from "react-bootstrap";
import { notification, Rate } from "antd";
import PostApiCall from "../../helpers/PostApi";
import GetApiCall from "../../helpers/GetApi";
import {
  getMemberId,
  getStoredBookings,
  getStoredReviews,
  saveStoredReview,
} from "../../helpers/batchMemberStorage";
import "../BatchClasses/NewBatchClass.css";
import moment from "moment";
const toLocalDateString = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const reviewKey = (batchId, bookingDate) =>
  `${batchId || ""}-${bookingDate || ""}`;
const normalizeApiDate = (value) => {
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

export default function MemberClassHistory() {
  const userData = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : {};
  const memberId = getMemberId(userData);
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [activeBooking, setActiveBooking] = useState(null);
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");
  const [anonymous, setAnonymous] = useState(false);

  const normalizeBookings = (data) => {
    const rows = Array.isArray(data)
      ? data
      : data?.rows || data?.data || data?.bookings || [];
    return rows.map((item) => ({
      batchMemberId: item.fld_id || item.batchMemberId,
      batchId: item.fld_batch_id || item.batchId,
      batchName:
        item.fld_batch_name || item.batchName || item.fld_name || "Class",
      roomName: item.fld_room_name || item.roomName || "Studio",
      trainer:
        item.trainers || item.trainer || item.trainer_name || "Not Assigned",
      days: item.days || item.fld_day || "",
      startTime: item.startTime || item.fld_start_time?.slice?.(0, 5) || "",
      endTime: item.endTime || item.fld_end_time?.slice?.(0, 5) || "",
      bookingDate: normalizeApiDate(
        item.fld_booking_date || item.bookingDate || item.fld_created_at,
      ),
      status: item.fld_status || item.status || "Booked",
      paymentStatus: item.fld_payment_status || item.paymentStatus || "Paid",
      reviewId: item.review_id || item.fld_review_id || null,
      reviewRating:
        item.review_rating || item.fld_rating || item.rating || null,
    }));
  };

  const loadHistory = useCallback(async () => {
    setLoading(true);
    const fallbackBookings = getStoredBookings(memberId);
    setReviews(getStoredReviews(memberId));

    try {
      const res = await GetApiCall.getRequest(
        `batch/GetMemberBookings/${memberId}`,
      );
      if (res.status === 200 || res.status === 201) {
        const json = await res.json();
        const rows = normalizeBookings(json);
        setBookings(rows.length ? rows : fallbackBookings);
      } else {
        setBookings(fallbackBookings);
      }
    } catch {
      setBookings(fallbackBookings);
    }
    setLoading(false);
  }, [memberId]);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  const submittedReviewKeys = useMemo(
    () =>
      new Set(reviews.map((item) => reviewKey(item.batchId, item.bookingDate))),
    [reviews],
  );

  const hasReviewForBooking = (booking) => {
    if (booking.reviewId || booking.reviewRating) return true;
    return submittedReviewKeys.has(
      reviewKey(booking.batchId, booking.bookingDate),
    );
  };

  const isAttended = (booking) => {
    if (["Completed", "Attended", "Active"].includes(booking.status))
      return true;
    if (!booking.bookingDate) return false;
    return booking.bookingDate < toLocalDateString(new Date());
  };

  const submitReview = async () => {
    if (!activeBooking) return;
    if (!rating) {
      notification.error({ message: "Select rating" });
      return;
    }

    const payload = {
      batchId: activeBooking.batchId,
      memberId,
      trainerId: activeBooking.trainerId || null,
      bookingDate: activeBooking.bookingDate,
      rating,
      review,
      isAnonymous: anonymous ? 1 : 0,
    };

    try {
      const res = await PostApiCall.postRequest(
        payload,
        "batch/SaveBatchReview",
      );
      const json = await res.json();
      if (res.status === 200 || res.status === 201) {
        notification.success({ message: json.message || "Review submitted" });
        saveStoredReview(memberId, payload);
        setReviews((prev) => [
          { ...payload, createdAt: new Date().toISOString() },
          ...prev.filter(
            (item) =>
              reviewKey(item.batchId, item.bookingDate) !==
              reviewKey(payload.batchId, payload.bookingDate),
          ),
        ]);
        setBookings((prev) =>
          prev.map((booking) =>
            reviewKey(booking.batchId, booking.bookingDate) ===
            reviewKey(payload.batchId, payload.bookingDate)
              ? {
                  ...booking,
                  reviewRating: payload.rating,
                  reviewId: json.reviewId || "submitted",
                }
              : booking,
          ),
        );
      } else {
        saveStoredReview(memberId, payload);
        notification.warning({
          message: "Review saved locally until API is ready",
        });
      }
    } catch {
      saveStoredReview(memberId, payload);
      notification.warning({
        message: "Review saved locally until API is ready",
      });
    }

    setActiveBooking(null);
    setRating(5);
    setReview("");
    setAnonymous(false);
  };

  return (
    <section className="inner-section mt-5 batch-class-page member-classes-page">
      <Container className="pb-5">
        <div className="batch-list-header mb-4">
          <div>
            <h2 className="text-center mb-2 weekly-title">Class History</h2>
            <p className="text-muted text-center mb-0">
              Track booked and attended classes, then share feedback.
            </p>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <Spinner />
          </div>
        ) : bookings.length ? (
          <Row>
            {bookings.map((booking) => {
              const attended = isAttended(booking);
              const reviewed = hasReviewForBooking(booking);
              return (
                <Col
                  lg={6}
                  className="mb-3"
                  key={`${booking.batchId}-${booking.bookingDate}`}
                >
                  <div className="member-history-card">
                    <div className="d-flex justify-content-between gap-3 mb-2">
                      <div>
                        <h5 className="mb-1">{booking.batchName}</h5>
                      </div>
                      <Badge
                        className="d-flex justify-content-center align-items-center"
                        bg={attended ? "success" : "warning"}
                        text={attended ? undefined : "dark"}
                      >
                        {attended ? "Attended" : booking.status}
                      </Badge>
                    </div>
                    <div className="text-muted small">
                      {booking.roomName} | {booking.trainer}
                    </div>
                    <div className="batch-detail-row">
                      <span>Schedule</span>
                      <strong>
                        {booking.days || "-"}{" "}
                        {booking.startTime &&
                          `${booking.startTime} - ${booking.endTime}`}
                      </strong>
                    </div>
                    <div className="batch-detail-row">
                      <span>Booked On</span>
                      <strong>
                        {moment(booking.bookingDate, "YYYY-MM-DD").format(
                          "dddd, MMM D",
                        ) || "-"}
                      </strong>
                    </div>
                    <div className="mt-3 d-flex gap-2 flex-wrap">
                      <Button
                        size="sm"
                        variant="outline-dark"
                        href={`/members/batch-ticket/${booking.batchId}`}
                      >
                        Ticket
                      </Button>
                      {attended && !reviewed && (
                        <Button
                          size="sm"
                          onClick={() => setActiveBooking(booking)}
                        >
                          Give Review
                        </Button>
                      )}
                      {reviewed && (
                        <Badge
                          bg="secondary"
                          className="d-flex align-items-center"
                        >
                          Reviewed
                        </Badge>
                      )}
                    </div>
                  </div>
                </Col>
              );
            })}
          </Row>
        ) : (
          <div className="batch-empty-state">No booked classes yet.</div>
        )}
      </Container>

      <Modal
        show={Boolean(activeBooking)}
        onHide={() => setActiveBooking(null)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Class Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6>{activeBooking?.batchName}</h6>
          <div className="mb-3">
            <Rate value={rating} onChange={setRating} />
          </div>
          <Form.Control
            as="textarea"
            rows={4}
            placeholder="How was the class?"
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
          <Form.Check
            className="mt-3"
            label="Submit anonymously"
            checked={anonymous}
            onChange={(e) => setAnonymous(e.target.checked)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-secondary"
            onClick={() => setActiveBooking(null)}
          >
            Cancel
          </Button>
          <Button onClick={submitReview}>Submit Review</Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
}


