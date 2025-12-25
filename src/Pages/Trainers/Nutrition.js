import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { notification } from "antd";

/* CONSTANTS */

const WEEK_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const createEmptyDay = (day) => ({
  weekday: day,
  isCheatDay: false,
  planName: "",
  numberOfMeals: "",
  calories: "",
  meals: {
    breakfast: "",
    morningSnacks: "",
    lunch: "",
    eveningSnacks: "",
    dinner: "",
    preWorkout: "",
    postWorkout: "",
  },
});

const cloneDays = (days) => JSON.parse(JSON.stringify(days));

/* COMPONENT */

const NutritionForm = ({ selectedMemberId }) => {
  const [applySameForAll, setApplySameForAll] = useState(true);
  const [days, setDays] = useState(WEEK_DAYS.map(createEmptyDay));
  const [viewOnly, setViewOnly] = useState(false);
  const [trainerComment, setTrainerComment] = useState("");
  const [historyOpen, setHistoryOpen] = useState(false);

  /* ===== Version History (UI only for now) ===== */

  const [history, setHistory] = useState([
    {
      versionId: 2,
      createdAt: "2025-01-10",
      comment: "Fat loss plan",
      days: WEEK_DAYS.map(createEmptyDay),
    },
    {
      versionId: 1,
      createdAt: "2024-12-10",
      comment: "Muscle gain diet",
      days: WEEK_DAYS.map(createEmptyDay),
    },
  ]);

  /* HANDLERS */

  const updateDay = (index, field, value) => {
    if (viewOnly) return;

    const updated = [...days];
    updated[index][field] = value;

    if (applySameForAll && index === 0) {
      for (let i = 1; i < updated.length; i++) {
        updated[i][field] = value;
      }
    }
    setDays(updated);
  };

  const updateMeal = (index, meal, value) => {
    if (viewOnly) return;

    const updated = [...days];
    updated[index].meals[meal] = value;

    if (applySameForAll && index === 0) {
      for (let i = 1; i < updated.length; i++) {
        updated[i].meals[meal] = value;
      }
    }
    setDays(updated);
  };

  const toggleCheatDay = (index) => {
    if (viewOnly) return;

    const updated = [...days];
    updated[index].isCheatDay = !updated[index].isCheatDay;

    if (applySameForAll && index === 0) {
      for (let i = 1; i < updated.length; i++) {
        updated[i].isCheatDay = updated[index].isCheatDay;
      }
    }
    setDays(updated);
  };

  /* SUBMIT */

  const submit = (e) => {
    e.preventDefault();

    if (!selectedMemberId) {
      return notification.error({
        description: "Member not selected",
      });
    }

    const newVersion = {
      versionId: history.length + 1,
      createdAt: new Date().toISOString().split("T")[0],
      comment: trainerComment,
      days: cloneDays(days),
    };

    setHistory([newVersion, ...history]);
    setTrainerComment("");
    setViewOnly(false);

    notification.success({
      description: "Nutrition plan saved successfully",
    });
  };

  /* UI */

  return (
    <div className="container mb-5">
      {/* Toggles */}
      <div className="form-check form-switch mb-2">
        <input
          className="form-check-input"
          type="checkbox"
          checked={applySameForAll}
          onChange={() => setApplySameForAll(!applySameForAll)}
          disabled={viewOnly}
        />
        <label className="form-check-label fw-bold">
          Apply same diet for all days
        </label>
      </div>

      <div className="form-check form-switch mb-4">
        <input className="form-check-input" type="checkbox" disabled />
        <label className="form-check-label fw-bold">
          Auto renew diet every 4 weeks
        </label>
      </div>

      <button
        className="btn btn-outline-primary w-100 mb-3"
        type="button"
        onClick={() => {
          if (!history.length) {
            return notification.error({
              description: "No previous plan available",
            });
          }
          setDays(cloneDays(history[0].days));
          setViewOnly(false);
          notification.success({
            description: "Previous week diet copied",
          });
        }}
      >
        Copy Previous Week Diet
      </button>

      {/* FORM */}

      <form onSubmit={submit}>
        {viewOnly && (
          <div className="alert alert-info text-center">
            Viewing old version — editing disabled
          </div>
        )}

        {days.map((day, i) => (
          <div key={i} className="card mb-3 p-3 shadow-sm border-0">
            <h4>{day.weekday}</h4>

            <div className="form-check form-switch mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                checked={day.isCheatDay}
                onChange={() => toggleCheatDay(i)}
              />
              <label className="form-check-label fw-bold">
                Mark as Cheat Day
              </label>
            </div>

            {!day.isCheatDay && (
              <>
                <div className="mb-3">
                  <label className="form-label fw-bold">
                    Nutrition Plan Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={day.planName}
                    onChange={(e) => updateDay(i, "planName", e.target.value)}
                  />
                </div>

                <div className="row g-2 mb-3">
                  <div className="col-6">
                    <label className="form-label fw-bold">
                      Number of Meals
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      value={day.numberOfMeals}
                      onChange={(e) =>
                        updateDay(i, "numberOfMeals", e.target.value)
                      }
                    />
                  </div>

                  <div className="col-6">
                    <label className="form-label fw-bold">Total Calories</label>
                    <input
                      type="number"
                      className="form-control"
                      value={day.calories}
                      onChange={(e) => updateDay(i, "calories", e.target.value)}
                    />
                  </div>
                </div>

                <h5>Meals</h5>
                {Object.keys(day.meals).map((mealKey) => (
                  <div key={mealKey} className="mb-2">
                    <label className="form-label fw-semibold text-capitalize">
                      {mealKey}
                    </label>
                    <textarea
                      className="form-control"
                      rows="2"
                      value={day.meals[mealKey]}
                      onChange={(e) => updateMeal(i, mealKey, e.target.value)}
                    />
                  </div>
                ))}
              </>
            )}
          </div>
        ))}

        <div className="mb-3">
          <label className="form-label fw-bold">Trainer Comment</label>
          <textarea
            className="form-control"
            rows="2"
            value={trainerComment}
            onChange={(e) => setTrainerComment(e.target.value)}
          />
        </div>

        {!viewOnly && (
          <button className="btn btn-warning w-100 fw-bold">
            Save Nutrition Plan
          </button>
        )}
      </form>

      {/* HISTORY DRAWER */}

      <button
        className="btn btn-outline-secondary w-100 mt-4"
        onClick={() => setHistoryOpen(true)}
      >
        View Nutrition History
      </button>

      {historyOpen && (
        <div
          className="position-fixed top-0 end-0 bg-white shadow p-4"
          style={{ width: "380px", height: "100vh", zIndex: 1050 }}
        >
          <h5 className="fw-bold mb-3">Nutrition History</h5>

          {history.map((h) => (
            <div key={h.versionId} className="border p-2 mb-3 rounded">
              <strong>Version {h.versionId}</strong>
              <p className="small text-muted mb-1">{h.createdAt}</p>
              <p className="small">{h.comment}</p>

              <div className="d-flex gap-2">
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => {
                    setDays(cloneDays(h.days));
                    setViewOnly(true);
                    setHistoryOpen(false);
                  }}
                >
                  View
                </button>

                <button
                  className="btn btn-sm btn-success"
                  onClick={() => {
                    setDays(cloneDays(h.days));
                    setViewOnly(false);
                    setHistoryOpen(false);
                  }}
                >
                  Reuse
                </button>
              </div>
            </div>
          ))}

          <button
            className="btn btn-danger w-100 mt-3"
            onClick={() => setHistoryOpen(false)}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default NutritionForm;
