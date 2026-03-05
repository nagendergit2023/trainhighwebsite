import { useState } from "react";
import PostApiCall from "../../../helpers/PostApi";
import { Modal } from "antd";

const AIGeneratorModal = ({ open, onClose, onApply }) => {
  const [form, setForm] = useState({
    goal: "Strength",
    level: "Beginner",
    daysPerWeek: 5,
    duration: 60,
    equipment: "Gym",
  });

  const [loading, setLoading] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState(null);

  const generate = () => {
    setLoading(true);
    PostApiCall.postRequest(form, "GeneratePlan")
      .then((res) => res.json())
      .then((data) => {
        setGeneratedPlan(data);
        setLoading(false);
      });
  };

  const applyPlan = () => {
    onApply(generatedPlan);
    setGeneratedPlan(null);
    onClose();
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={700}
      title="Workout Generator"
    >
      {/* -------- FORM -------- */}
      {!generatedPlan && (
        <>
          <div className="row g-2 mb-3">
            <div className="col">
              <label className="fw-bold">Goal</label>
              <select
                className="form-select"
                value={form.goal}
                onChange={(e) => setForm({ ...form, goal: e.target.value })}
              >
                <option>Strength</option>
                <option>Fat Loss</option>
                <option>Rehab</option>
                <option>General</option>
              </select>
            </div>

            <div className="col">
              <label className="fw-bold">Level</label>
              <select
                className="form-select"
                value={form.level}
                onChange={(e) => setForm({ ...form, level: e.target.value })}
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>

            <div className="col">
              <label className="fw-bold">Days / Week</label>
              <input
                type="number"
                className="form-control"
                min={3}
                max={6}
                value={form.daysPerWeek}
                onChange={(e) =>
                  setForm({ ...form, daysPerWeek: Number(e.target.value) })
                }
              />
            </div>
          </div>

          <button
            className="btn btn-dark w-100"
            disabled={loading}
            onClick={generate}
          >
            {loading ? "Generating..." : "🤖 Generate Plan"}
          </button>
        </>
      )}

      {/* -------- GENERATED PLAN PREVIEW -------- */}
      {generatedPlan && (
        <>
          <h6 className="fw-bold mb-2">{generatedPlan.name}</h6>
          <p className="text-muted">{generatedPlan.description}</p>

          <div style={{ maxHeight: 350, overflowY: "auto" }}>
            {generatedPlan.days.map((day, i) => (
              <div key={i} className="border rounded p-2 mb-2">
                <strong>
                  {day.weekday} – {day.workoutName}
                </strong>
                <small className="text-muted ms-2">{day.duration} min</small>

                {day.exercises.length > 0 && (
                  <ul className="mt-2 mb-0">
                    {day.exercises.map((ex, idx) => (
                      <li key={idx}>
                        {ex.exerciseName} — {ex.sets} x {ex.reps}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          <div className="d-flex gap-2 mt-3">
            <button
              className="btn btn-outline-secondary w-100"
              onClick={() => setGeneratedPlan(null)}
            >
              🔄 Regenerate
            </button>

            <button
              className="btn btn-warning w-100 fw-bold"
              onClick={applyPlan}
            >
              📋 Copy This Plan
            </button>
          </div>
        </>
      )}
    </Modal>
  );
};

export default AIGeneratorModal;
