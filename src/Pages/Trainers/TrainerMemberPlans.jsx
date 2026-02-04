import React from "react";
import { Button, Container, Accordion } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import NutritionForm from "./Nutrition";
import WorkoutPlanner from "./WorkoutPlanner";

const TrainerMemberPlans = () => {
  const { memberId } = useParams();
  const { state: member } = useLocation();
  const navigate = useNavigate();

  return (
    <Container>
      {/* Header */}
      <div className="d-flex align-items-center justify-content-between mb-3 mt-3">
        <div>
          {/* <Button
            variant="link"
            className="p-0 me-3"
            onClick={() => navigate(-1)}
          >
            ← Back
          </Button> */}

          <h4 className="fw-bold mb-0">{member?.fld_name}</h4>
          <small className="text-muted">
            Membership: {member?.fld_status}
          </small>
        </div>
      </div>

      {/* Accordion */}
      <Accordion defaultActiveKey="1" alwaysOpen className="pb-5">
        {/* Workout Plan */}
        <Accordion.Item eventKey="0">
          <Accordion.Header>Workout Plan</Accordion.Header>
          <Accordion.Body>
            <WorkoutPlanner selectedMemberId={memberId} />
          </Accordion.Body>
        </Accordion.Item>

        {/* Nutrition Plan */}
        <Accordion.Item eventKey="1">
          <Accordion.Header>Nutrition Plan</Accordion.Header>
          <Accordion.Body>
            <NutritionForm selectedMemberId={memberId} />
          </Accordion.Body>
        </Accordion.Item>

        {/* Plan History */}
        {/* <Accordion.Item eventKey="2">
          <Accordion.Header>Plan History</Accordion.Header>
          <Accordion.Body>
            <div className="text-muted">
              Plan history UI coming next 🚧
            </div>
          </Accordion.Body>
        </Accordion.Item> */}
      </Accordion>
    </Container>
  );
};

export default TrainerMemberPlans;
