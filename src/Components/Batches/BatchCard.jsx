import React from "react";
import { Badge, Button, Card, ProgressBar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function BatchCard({
  batch,
  canManage = false,
  isMember = false,
  onBook,
  onDelete,
}) {
  const navigate = useNavigate();
  const batchId = batch.fld_id || batch.id;
  const capacity = Number(batch.fld_capacity || batch.capacity || 0);
  const booked = Number(
    batch.totalMembers ||
      batch.bookedMembers ||
      batch.booked_members ||
      batch.fld_booked_members ||
      0,
  );
  const waitlisted = Number(
    batch.waitlistedMembers || batch.waitlisted_members || 0,
  );
  const waitlistCapacity = Number(
    batch.waitlistCapacity || batch.fld_waitlist_capacity || 0,
  );
  const seatsLeft = Math.max(capacity - booked, 0);
  const occupancy = capacity ? Math.min((booked / capacity) * 100, 100) : 0;
  const isFull = capacity > 0 && booked >= capacity;
  const bookingRequired =
    Number(batch.fld_booking_required || batch.bookingRequired || 0) === 1;
  const userBookingStatus = batch.userBookingStatus || batch.booking_status;
  const isBookedByUser = String(userBookingStatus).toUpperCase() === "BOOKED";

  const status = batch.status || batch.fld_status || "Active";
  const price = Number(batch.price || batch.fld_price || 0);
  const gender =
    batch.fld_gender || batch.genderGroup || batch.fld_gender_group || "Unisex";
  const days = batch.days || batch.workingDays || batch.scheduleDays || "-";
  const trainers = batch.trainers || batch.trainer_names || "Not Assigned";
  const services = batch.services || batch.service_names;
  const room = batch.fld_room_name || batch.roomName || "Studio";
  const startTime =
    batch.startTime || batch.start_time || batch.fld_start_time || "-";
  const endTime = batch.endTime || batch.end_time || batch.fld_end_time || "-";
  const description =
    batch.fld_description || batch.fld_batch_info || batch.batchInfo;

  const bookingBadge = bookingRequired ? "Booking Required" : "Walk-In";

  return (
    <Card className="batch-card h-100">
      <Card.Body>
        <div className="d-flex justify-content-between gap-3 mb-3">
          <div>
            <h5 className="mb-1">{batch.fld_batch_name || batch.batchName}</h5>
            <small className="text-muted">{room}</small>
          </div>
          <div className="text-end">
            <Badge bg={status === "Active" ? "success" : "secondary"}>
              {status}
            </Badge>
            <div className="mt-2">
              <Badge
                bg={bookingRequired ? "warning" : "secondary"}
                text={bookingRequired ? "dark" : undefined}
              >
                {bookingBadge}
              </Badge>
            </div>
          </div>
        </div>

        <div className="batch-meta-grid mb-3">
          <span>{gender}</span>
          <span>{capacity ? `${capacity} seats` : "No limit"}</span>
          <span>{bookingBadge}</span>
        </div>
        {description && <p className="text-muted small mb-3">{description}</p>}

        <div className="batch-detail-row">
          <span>Trainer</span>
          <strong>{trainers}</strong>
        </div>
        <div className="batch-detail-row">
          <span>Schedule</span>
          <strong>
            {startTime} - {endTime}
          </strong>
        </div>
        <div className="batch-detail-row">
          <span>Days</span>
          <strong>{days}</strong>
        </div>
        {services && (
          <div className="batch-detail-row">
            <span>Services</span>
            <strong>{services}</strong>
          </div>
        )}
        {/* <div className="batch-detail-row">
          <span>Price</span>
          <strong>{price > 0 ? `Rs. ${price}` : "Included"}</strong>
        </div> */}

        <div className="mt-3">
          <div className="d-flex justify-content-between small mb-1">
            <span>
              Booked {booked} / {capacity || "-"}
            </span>
            <strong>{seatsLeft} left</strong>
          </div>
          <ProgressBar
            now={occupancy}
            variant={isFull ? "danger" : occupancy > 70 ? "warning" : "success"}
          />
          {waitlistCapacity > 0 && (
            <small className="text-muted d-block mt-1">
              Waitlist {waitlisted} / {waitlistCapacity}
            </small>
          )}
        </div>

        <div className="d-flex flex-wrap gap-2 mt-4">
          {canManage && (
            <>
              <Button
                variant="dark"
                onClick={() => navigate(`/batch/manage/${batchId}`)}
              >
                Manage
              </Button>
              <Button
                variant="dark"
                onClick={() => navigate(`/batch/edit/${batchId}`)}
              >
                Edit
              </Button>
              <Button variant="danger" onClick={onDelete}>
                Delete
              </Button>
            </>
          )}

          {isMember &&
            status === "Active" &&
            bookingRequired &&
            !isBookedByUser &&
            !isFull && (
              <Button variant="dark" onClick={onBook}>
                Book Slot
              </Button>
            )}
          {isMember && status === "Active" && bookingRequired && isBookedByUser && (
            <Badge bg="success">Booked</Badge>
          )}
          {isMember && status === "Active" && bookingRequired && !isBookedByUser && isFull && (
            <Badge bg="danger">Full</Badge>
          )}
          {isMember && !bookingRequired && (
            <Badge bg="secondary">No booking needed</Badge>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}


