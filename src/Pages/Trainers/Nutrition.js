import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { notification, Spin } from "antd";
import AINutritionGeneratorModal from "./Nutrition.jsx/AINutritionGeneratorModal";
import PostApiCall from "../../helpers/PostApi";

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

const NutritionForm = ({ selectedMemberId }) => {
  const [days, setDays] = useState(WEEK_DAYS.map(createEmptyDay));
  const [applySameForAll, setApplySameForAll] = useState(true);
  const [viewOnly, setViewOnly] = useState(false);
  const [trainerComment, setTrainerComment] = useState("");
  const [aiOpen, setAiOpen] = useState(false);
  const [history, setHistory] = useState([]);
  const [activePlanLoaded, setActivePlanLoaded] = useState(false);
  const [currentPlanId, setCurrentPlanId] = useState(null);


  // ------------------- Fetch Active Plan & History -------------------
  useEffect(() => {
    if (!selectedMemberId) return;

    // Get Active Plan
    PostApiCall.postRequest(
      { memberId: Number(selectedMemberId) },
      "getActivePlan"
    ).then(async (res) => {
      if (res.status === 200) {
        const obj = await res.json();
        if (obj) {
          setDays(cloneDays(obj)); // Prefill all inputs
          setTrainerComment(obj.comment || "");
          setCurrentPlanId(obj.planId || null);
        }
      }
      setActivePlanLoaded(true);
    });

    // Get History
    PostApiCall.postRequest({ memberId: selectedMemberId }, "getHistory").then(
      async (res) => {
        if (res.status === 200) {
          const obj = await res.json();
          if (Array.isArray(obj)) setHistory(obj);
        }
      }
    );
  }, [selectedMemberId]);

  // ------------------- Handlers -------------------
  const updateDay = (index, field, value) => {
    if (viewOnly) return;
    const updated = [...days];
    updated[index][field] = value;
    if (applySameForAll && index === 0)
      for (let i = 1; i < updated.length; i++) updated[i][field] = value;
    setDays(updated);
  };

  const updateMeal = (index, meal, value) => {
    if (viewOnly) return;
    const updated = [...days];
    updated[index].meals[meal] = value;
    if (applySameForAll && index === 0)
      for (let i = 1; i < updated.length; i++) updated[i].meals[meal] = value;
    setDays(updated);
  };

  const toggleCheatDay = (index) => {
    if (viewOnly) return;
    const updated = [...days];
    updated[index].isCheatDay = !updated[index].isCheatDay;
    if (applySameForAll && index === 0)
      for (let i = 1; i < updated.length; i++)
        updated[i].isCheatDay = updated[index].isCheatDay;
    setDays(updated);
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!selectedMemberId)
      return notification.error({ description: "Member not selected" });
    try {
       const payload = {
      memberId: selectedMemberId,
      days,
      comment: trainerComment,
      planId: currentPlanId, // <-- send this for updates
    };

    const res = await PostApiCall.postRequest(payload, "SaveNutriTion");
    const data = await res.json();

    if (res.status === 200 || res.status === 201) {
      // Update currentPlanId if a new plan was created
      if (!currentPlanId && data?.planId) setCurrentPlanId(data.planId);

      notification.success({
        description: "Nutrition plan saved successfully",
      });
    }
    } catch {
      notification.error({ description: "Failed to save nutrition plan" });
    }
  };

  const applyAIPlan = (aiPlan) => {
    const mergedDays = WEEK_DAYS.map((day) => {
      const aiDay = aiPlan.days.find((d) => d.weekday === day);
      return aiDay ? aiDay : createEmptyDay(day);
    });
    setDays(cloneDays(mergedDays));
    setTrainerComment(aiPlan.comment || "AI generated nutrition plan");
    setViewOnly(false);
    setAiOpen(false);
    notification.success({ description: "AI nutrition plan applied" });
  };

  const exportToWhatsApp = () => {
    if (!days.length)
      return notification.error({ description: "No nutrition plan to export" });
    let text = "🥗 *Weekly Nutrition Plan*\n\n";
    days.forEach((day) => {
      text += `📅 *${day.weekday}*\n`;
      if (day.isCheatDay) {
        text += "🍕 Cheat Day\n\n";
        return;
      }
      if (day.planName) text += `📌 ${day.planName}\n`;
      if (day.calories) text += `🔥 Calories: ${day.calories}\n`;
      if (day.numberOfMeals) text += `🍽 Meals: ${day.numberOfMeals}\n`;
      Object.entries(day.meals).forEach(([meal, value]) => {
        if (value) text += `• ${meal}: ${value}\n`;
      });
      text += "\n";
    });
    if (trainerComment) text += `📝 *Trainer Note*\n${trainerComment}\n`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  const createNewPlan = () => {
    setDays(WEEK_DAYS.map(createEmptyDay));
    setTrainerComment("");
    setViewOnly(false);
    setCurrentPlanId(null)
  };

  const loadFromHistory = (planId) => {
    const selected = history.find((h) => h.planId === parseInt(planId));
    if (selected) {
      setDays(cloneDays(Object.values(selected?.days || {})));
      setTrainerComment(selected.comment || "");
      setViewOnly(false);
        setCurrentPlanId(selected.planId); // <--- track ID
      notification.success({
        description: `Loaded version ${selected.planId}`,
      });
    }
  };

  // ------------------- Render -------------------
  if (!activePlanLoaded)
    return (
      <div className="d-flex justify-content-center align-items-center mt-5">
        <Spin tip="Loading nutrition plan..." size="large" />
      </div>
    );

  return (
    <div className="container mb-5">
      {/* Top Buttons */}
      <div className="d-flex gap-2 mb-3 flex-wrap">
        <button className="btn btn-success w-100" onClick={exportToWhatsApp}>
          📲 Send Diet to WhatsApp
        </button>
        <button
          className="btn btn-outline-success w-100"
          onClick={() => setAiOpen(true)}
        >
          🤖 Select Nutrition Plans
        </button>
        <button
          className="btn btn-outline-primary w-100"
          onClick={createNewPlan}
        >
          ➕ Create New Plan
        </button>
      </div>

      {/* Load from History Dropdown */}
      {history.length > 0 && (
        <div className="mb-3">
          <label className="form-label fw-bold">Load from History</label>
          <select
            className="form-select"
            onChange={(e) => loadFromHistory(e.target.value)}
            defaultValue=""
          >
            <option value="" disabled>
              Select version
            </option>
            {history.map((h) => (
              <option key={h.planId} value={h.planId}>
                Version {h.planId} - {h.createdAt}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Apply same toggle */}
      <div className="form-check form-switch mb-3">
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

      {/* Accordion for Days */}
      <div className="accordion" id="nutritionAccordion">
        {days.map((day, i) => (
          <div className="accordion-item" key={i}>
            <h2 className="accordion-header" id={`heading${i}`}>
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapse${i}`}
                aria-expanded="false"
                aria-controls={`collapse${i}`}
              >
                {day.weekday} {day.isCheatDay ? "🍕 Cheat Day" : ""}
              </button>
            </h2>
            <div
              id={`collapse${i}`}
              className="accordion-collapse collapse"
              aria-labelledby={`heading${i}`}
              data-bs-parent="#nutritionAccordion"
            >
              <div className="accordion-body">
                <div className="form-check form-switch mb-2">
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
                        onChange={(e) =>
                          updateDay(i, "planName", e.target.value)
                        }
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
                        <label className="form-label fw-bold">
                          Total Calories
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          value={day.calories}
                          onChange={(e) =>
                            updateDay(i, "calories", e.target.value)
                          }
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
                          onChange={(e) =>
                            updateMeal(i, mealKey, e.target.value)
                          }
                        />
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Trainer Comment */}
      <div className="mb-3 mt-3">
        <label className="form-label fw-bold">Trainer Comment</label>
        <textarea
          className="form-control"
          rows="2"
          value={trainerComment}
          onChange={(e) => setTrainerComment(e.target.value)}
        />
      </div>

      {!viewOnly && (
        <button className="btn btn-warning w-100 fw-bold mb-5" onClick={submit}>
          Save
        </button>
      )}

      <AINutritionGeneratorModal
        open={aiOpen}
        onClose={() => setAiOpen(false)}
        onApply={applyAIPlan}
      />
    </div>
  );
};

export default NutritionForm;
