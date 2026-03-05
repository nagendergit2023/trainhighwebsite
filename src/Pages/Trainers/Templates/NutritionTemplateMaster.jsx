import React, { useRef, useState } from "react";
import { notification } from "antd";
import PostApiCall from "../../../helpers/PostApi";
import GetApiCall from "../../../helpers/GetApi";
import NutritionTemplateList from "./NutritionTemplateList";

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
  numberOfMeals: 0,
  calories: 0,
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
function NutritionTemplateMaster() {
  const trainer = localStorage.getItem("user");
  const trainerId = JSON.parse(trainer)?.staffId;
  const [templateId, setTemplateId] = useState(null);
  const [templateName, setTemplateName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("General");
  const [isGlobal, setIsGlobal] = useState(false);
  const [days, setDays] = useState(WEEK_DAYS.map(createEmptyDay));
  const [applySameForAll, setApplySameForAll] = useState(true);
  const [viewOnly, setViewOnly] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const headingRef = useRef(null);
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
  const updateDay = (index, field, value) => {
    if (viewOnly) return;
    const updated = [...days];
    updated[index][field] = value;
    if (applySameForAll && index === 0)
      for (let i = 1; i < updated.length; i++) updated[i][field] = value;
    setDays(updated);
  };

  /* SAVE TEMPLATE */
  const saveTemplate = () => {
    if (!templateName) {
      notification.error({ description: "Template name required" });
      return;
    }

    PostApiCall.postRequest(
      {
        id: templateId,
        name: templateName,
        description,
        category,
        trainerId,
        isGlobal,
        days,
      },
      "nutrition/saveNutritionTemplate",
    ).then(() => {
      notification.success({ description: "Template saved successfully" });
      resetForm();
      setRefreshKey((prev) => prev + 1); 
      setDays(WEEK_DAYS.map(createEmptyDay));
    });
  };
  const loadTemplate = (id) => {
    GetApiCall.getRequest(`nutrition/getNutritionTemplateById?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTemplateId(data.id);
        setTemplateName(data.name);
        setDescription(data.description);
        setCategory(data.category);
        setDays(data?.days);
        headingRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      });
  };

  const resetForm = () => {
    setTemplateName("");
    setDescription("");
    setCategory("General");
    setIsGlobal(false);
    setTemplateId(null);
  };

  return (
    <>
      <NutritionTemplateList onEdit={loadTemplate} refreshKey={refreshKey} />

      <div className="mb-5 mt-3 container">
        <h2 ref={headingRef} className="weekly-title mb-4 text-center">Nutrition Templates</h2>

        {/* TEMPLATE META */}
        <div className="card p-3 mb-4">
          <div className="row g-3">
            <div className="col-md-4">
              <label className="fw-bold">Template Name</label>
              <input
                className="form-control"
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
              />
            </div>

            <div className="col-md-4">
              <label className="fw-bold">Category</label>
              <input
                className="form-control"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>

            <div className="col-md-4">
              <label className="fw-bold">Description</label>
              <input
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* <div className="col-md-4 mt-3">
              <label>
                <input
                  type="checkbox"
                  checked={isGlobal}
                  onChange={() => setIsGlobal(!isGlobal)}
                />{" "}
                Make Global Template
              </label>
            </div> */}
          </div>
        </div>

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
                      {Object?.keys(day.meals).map((mealKey) => (
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

        {/* SAVE BUTTON */}
        <button className="btn btn-warning w-100 mt-3" onClick={saveTemplate}>
          Save Template
        </button>
      </div>
    </>
  );
}

export default NutritionTemplateMaster;
