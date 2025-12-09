import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const NutritionForm = () => {
  const members = ["John Doe", "Sarah Smith", "Mike Johnson"]; // Sample members

  const [days, setDays] = useState([
    "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"
  ].map((day) => ({
    weekday: day,
    member: "",
    isCheatDay: false,
    planName: "",
    numberOfMeals: 0,
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
  })));

  const handleChange = (index, field, value) => {
    const updated = [...days];
    updated[index][field] = value;
    setDays(updated);
  };

  const handleMealChange = (index, meal, value) => {
    const updated = [...days];
    updated[index].meals[meal] = value;
    setDays(updated);
  };

  const toggleCheatDay = (index) => {
    const updated = [...days];
    updated[index].isCheatDay = !updated[index].isCheatDay;

    if (updated[index].isCheatDay) {
      updated[index].meals = {
        breakfast: "",
        morningSnacks: "",
        lunch: "",
        eveningSnacks: "",
        dinner: "",
        preWorkout: "",
        postWorkout: "",
      };
      updated[index].numberOfMeals = 0;
      updated[index].calories = "";
    }

    setDays(updated);
  };

  const submit = (e) => {
    e.preventDefault();

    // Basic validation
    for (let day of days) {
      if (!day.member) return alert("Please assign a member for all days.");
      if (!day.isCheatDay && (!day.planName || day.numberOfMeals <= 0))
        return alert("Please fill all required fields for non-cheat days.");
    }

    console.log("Nutrition Plan Saved:", days);
    alert("Nutrition plan created successfully!");
  };

  return (
    <div className="container mt-4 mb-5">
      <h2 className="text-center mb-4">Create Weekly Nutrition Plan</h2>

      <form onSubmit={submit}>
        {days.map((day, i) => (
          <div key={i} className="card mb-3 p-3 shadow-sm border-0">
            <h4>{day.weekday}</h4>

            {/* Member Selection */}
            <div className="mb-3">
              <label className="form-label fw-bold">Assign Member</label>
              <select
                className="form-select"
                value={day.member}
                onChange={(e) => handleChange(i, "member", e.target.value)}
                required
              >
                <option value="">Select Member</option>
                {members.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            {/* Cheat Day Toggle */}
            <div className="form-check form-switch mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                checked={day.isCheatDay}
                onChange={() => toggleCheatDay(i)}
              />
              <label className="form-check-label fw-bold">Cheat Day</label>
            </div>

            {/* Hide meals if cheat day */}
            {!day.isCheatDay && (
              <>
                <div className="mb-3">
                  <label className="form-label fw-bold">Nutrition Plan Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={day.planName}
                    onChange={(e) => handleChange(i, "planName", e.target.value)}
                    required
                  />
                </div>

                <div className="row g-2 mb-3">
                  <div className="col-6">
                    <label className="form-label fw-bold">Number of Meals</label>
                    <input
                      type="number"
                      className="form-control"
                      min="1"
                      value={day.numberOfMeals}
                      onChange={(e) => handleChange(i, "numberOfMeals", e.target.value)}
                      required
                    />
                  </div>

                  <div className="col-6">
                    <label className="form-label fw-bold">Total Calories</label>
                    <input
                      type="number"
                      className="form-control"
                      min="1"
                      value={day.calories}
                      onChange={(e) => handleChange(i, "calories", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <h5 className="mt-3">Meals</h5>

                {Object.keys(day.meals).map((mealKey) => (
                  <div key={mealKey} className="mb-2">
                    <label className="form-label text-capitalize fw-semibold">{mealKey}</label>
                    <textarea
                      className="form-control"
                      rows="2"
                      value={day.meals[mealKey]}
                      onChange={(e) => handleMealChange(i, mealKey, e.target.value)}
                    />
                  </div>
                ))}
              </>
            )}

            {day.isCheatDay && (
              <p className="text-muted fst-italic mt-2">Cheat day — meals hidden.</p>
            )}
          </div>
        ))}

        <button type="submit" className="btn btn-warning w-100 mt-2 mb-5 p-2 fw-bold">
          Save Nutrition Plan
        </button>
      </form>
    </div>
  );
};

export default NutritionForm;