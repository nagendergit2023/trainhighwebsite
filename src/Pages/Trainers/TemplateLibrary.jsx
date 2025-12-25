import React from "react";
import { Modal } from "antd";

/* TEMPLATE DATA */

const TEMPLATES = [
  {
    id: 1,
    name: "Push Pull Legs (PPL)",
    description: "6-day strength split",
    days: [
      {
        weekday: "Monday",
        isRestDay: false,
        workoutName: "Push",
        duration: 60,
        exercises: [],
      },
      {
        weekday: "Tuesday",
        isRestDay: false,
        workoutName: "Pull",
        duration: 60,
        exercises: [],
      },
      {
        weekday: "Wednesday",
        isRestDay: false,
        workoutName: "Legs",
        duration: 60,
        exercises: [],
      },
      {
        weekday: "Thursday",
        isRestDay: false,
        workoutName: "Push",
        duration: 60,
        exercises: [],
      },
      {
        weekday: "Friday",
        isRestDay: false,
        workoutName: "Pull",
        duration: 60,
        exercises: [],
      },
      {
        weekday: "Saturday",
        isRestDay: false,
        workoutName: "Legs",
        duration: 60,
        exercises: [],
      },
      {
        weekday: "Sunday",
        isRestDay: true,
        workoutName: "Rest",
        duration: "",
        exercises: [],
      },
    ],
  },
  {
    id: 2,
    name: "Upper / Lower Split",
    description: "4-day hypertrophy plan",
    days: [
      {
        weekday: "Monday",
        isRestDay: false,
        workoutName: "Upper Body",
        duration: 50,
        exercises: [],
      },
      {
        weekday: "Tuesday",
        isRestDay: false,
        workoutName: "Lower Body",
        duration: 50,
        exercises: [],
      },
      {
        weekday: "Wednesday",
        isRestDay: true,
        workoutName: "Rest",
        duration: "",
        exercises: [],
      },
      {
        weekday: "Thursday",
        isRestDay: false,
        workoutName: "Upper Body",
        duration: 50,
        exercises: [],
      },
      {
        weekday: "Friday",
        isRestDay: false,
        workoutName: "Lower Body",
        duration: 50,
        exercises: [],
      },
      {
        weekday: "Saturday",
        isRestDay: true,
        workoutName: "Rest",
        duration: "",
        exercises: [],
      },
      {
        weekday: "Sunday",
        isRestDay: true,
        workoutName: "Rest",
        duration: "",
        exercises: [],
      },
    ],
  },
];

/* COMPONENT */

const TemplateLibrary = ({ open, onClose, onApply }) => {
  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      title="Workout Templates"
      width={600}
    >
      {TEMPLATES.map((t) => (
        <div key={t.id} className="border rounded p-3 mb-3">
          <h6 className="fw-bold mb-1">{t.name}</h6>
          <p className="text-muted mb-2">{t.description}</p>

          <button className="btn btn-sm btn-warning" onClick={() => onApply(t)}>
            Use Template
          </button>
        </div>
      ))}
    </Modal>
  );
};

export default TemplateLibrary;
