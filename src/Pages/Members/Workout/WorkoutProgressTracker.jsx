import React, { useState } from "react";
import { Modal } from "antd";
import GetApiCall from "../../helpers/GetApi";

const WorkoutProgressTracker = ({ open, onClose, exercise, memberId }) => {
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");

  const saveProgress = () => {
    GetApiCall.postRequest("SaveWorkoutProgress", {
      memberId,
      exerciseId: exercise.id,
      weight,
      reps,
      date: new Date(),
    }).then(() => onClose());
  };

  return (
    <Modal open={open} onCancel={onClose} onOk={saveProgress}>
      <h6>{exercise.name}</h6>

      <input
        className="form-control mb-2"
        placeholder="Weight (kg)"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
      />

      <input
        className="form-control"
        placeholder="Reps"
        value={reps}
        onChange={(e) => setReps(e.target.value)}
      />
    </Modal>
  );
};

export default WorkoutProgressTracker;
