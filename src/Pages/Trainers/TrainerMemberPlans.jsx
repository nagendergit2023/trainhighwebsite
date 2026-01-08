import React, { useState } from "react";
import { Button, Container, Nav } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import NutritionForm from "./Nutrition"; // existing component
import WorkoutForm from "./WorkoutEditor";
import WorkoutPlanner from "./WorkoutPlanner";
// import WorkoutForm from "./WorkoutForm"; (next step)

const TrainerMemberPlans = () => {
  const { memberId } = useParams();
  const { state: member } = useLocation();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("nutrition");

  return (
    <Container className="">
      {/* Header */}
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div>
          <Button
            variant="link"
            className="p-0 me-3"
            onClick={() => navigate(-1)}
          >
            ← Back
          </Button>

          <h4 className="fw-bold mb-0">{member?.fld_name}</h4>
          <small className="text-muted">Membership: {member?.fld_status}</small>
        </div>
      </div>

      {/* Tabs */}
      <Nav
        variant="tabs"
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k)}
        className="mb-4"
      >
        
        <Nav.Item>
          <Nav.Link eventKey="workout">Workout Plan</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="nutrition">Nutrition Plan</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="history">Plan History</Nav.Link>
        </Nav.Item>
      </Nav>

      {/* Content */}
      {activeTab === "nutrition" && (
        <NutritionForm selectedMemberId={memberId} />
      )}

      {activeTab === "workout" && (
        <WorkoutPlanner selectedMemberId={memberId} />
        // <div className="text-muted">Workout form coming next 🚧</div>
      )}

      {activeTab === "history" && (
        <div className="text-muted">Plan history UI coming next 🚧</div>
      )}
    </Container>
  );
};

export default TrainerMemberPlans;
