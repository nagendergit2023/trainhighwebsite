import React from "react";
import { Card, Badge, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function BatchCard({ batch }) {
  const navigate = useNavigate();

  return (
    <Card className="shadow-sm border-0 h-100">
      <Card.Body>
        <div className="d-flex justify-content-between">
          <div>
            <h5>{batch.fld_batch_name}</h5>

            <small className="text-muted">{batch.fld_room_name}</small>
          </div>

          <Badge bg={batch.fld_booking_required ? "success" : "secondary"}>
            {batch.fld_booking_required ? "Booking" : "Walk-In"}
          </Badge>
        </div>

        <hr />

        <p>
          <strong>Trainer</strong>
          <br />
          {batch.trainers}
        </p>

        <p>
          <strong>Schedule</strong>
          <br />
          {batch.startTime} - {batch.endTime}
        </p>

        <p>
          <strong>Days</strong>
          <br />
          {batch.days}
        </p>

        <p>
          <strong>Capacity</strong>
          <br />
          {batch.bookedMembers} / {batch.fld_capacity}
        </p>

        <p>
          <strong>Gender</strong>
          <br />
          {batch.fld_gender}
        </p>

        <div className="d-flex gap-2">
          <Button
            variant="primary"
            onClick={() => navigate(`/batch/manage/${batch.fld_id}`)}
          >
            Manage
          </Button>

          <Button
            variant="warning"
            onClick={() => navigate(`/batch/edit/${batch.fld_id}`)}
          >
            Edit
          </Button>

          <Button variant="danger">Delete</Button>
        </div>
      </Card.Body>
    </Card>
  );
}
