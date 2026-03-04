import React, { useState } from "react";
import { Container } from "react-bootstrap";
import WorkoutTemplateMaster from "./WorkoutTemplateMaster";
import NutritionTemplateMaster from "./NutritionTemplateMaster";

const TemplateMasterScreen = () => {
  const [activeTab, setActiveTab] = useState("workout");

  return (
    <Container>
      {/* Header */}
      <div className="d-flex gap-2 my-4">
        <button
          className={`btn ${activeTab === "workout" ? "btn-warning" : "btn-outline-warning"}`}
          onClick={() => setActiveTab("workout")}
        >
          Workout Templates
        </button>

        <button
          className={`btn ${activeTab === "nutrition" ? "btn-success" : "btn-outline-success"}`}
          onClick={() => setActiveTab("nutrition")}
        >
          Nutrition Templates
        </button>
      </div>
      {activeTab === "workout" && <WorkoutTemplateMaster />}
      {activeTab === "nutrition" && <NutritionTemplateMaster />}
    </Container>
  );
};

export default TemplateMasterScreen;
