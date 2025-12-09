import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const WorkoutForm = () => {
  const members = ["John Doe", "Sarah Lee", "Mike Ross", "Emily Clark"]; // sample

  const [selectedMember, setSelectedMember] = useState("");
  const [days, setDays] = useState([
    { weekday: "Monday", workoutName: "", duration: "", exercises: [] },
    { weekday: "Tuesday", workoutName: "", duration: "", exercises: [] },
    { weekday: "Wednesday", workoutName: "", duration: "", exercises: [] },
    { weekday: "Thursday", workoutName: "", duration: "", exercises: [] },
    { weekday: "Friday", workoutName: "", duration: "", exercises: [] },
    { weekday: "Saturday", workoutName: "", duration: "", exercises: [] },
    { weekday: "Sunday", workoutName: "Rest", duration: "", exercises: [] },
  ]);

  const handleDayChange = (index, field, value) => {
    const updated = [...days];
    updated[index][field] = value;
    setDays(updated);
  };

  const handleExerciseChange = (dayIndex, exIndex, field, value) => {
    const updated = [...days];
    updated[dayIndex].exercises[exIndex][field] = value;
    setDays(updated);
  };

  const addExercise = (dayIndex) => {
    const updated = [...days];
    updated[dayIndex].exercises.push({ exerciseName: "", reps: "", sets: "" });
    setDays(updated);
  };

  const validate = () => {
    if (!selectedMember) return "Please select a member.";

    for (let day of days) {
      if (day.workoutName && day.workoutName.trim().length < 3) {
        return `Workout name on ${day.weekday} should be at least 3 characters.`;
      }
      if (day.duration && (isNaN(day.duration) || day.duration <= 0)) {
        return `Duration on ${day.weekday} must be a positive number.`;
      }
      for (let ex of day.exercises) {
        if (!ex.exerciseName || ex.exerciseName.trim().length < 2) {
          return `Each exercise must have a valid name (Day: ${day.weekday}).`;
        }
        if (!ex.reps || isNaN(ex.reps)) return `Reps must be numeric (Day: ${day.weekday}).`;
        if (!ex.sets || isNaN(ex.sets)) return `Sets must be numeric (Day: ${day.weekday}).`;
      }
    }

    return null;
  };

  const submit = (e) => {
    e.preventDefault();
    const error = validate();
    if (error) return alert(error);

    console.log("Workout Plan Saved:", { member: selectedMember, days });
    alert("Workout plan created successfully!");
  };

  return (
    <div className="container mt-4 mb-5">
      <h2 className="text-center mb-4 weekly-title">Create Workout Plan</h2>

      <form onSubmit={submit}>
        {/* Member Selection */}
        <div className="card p-3 shadow-sm mb-4">
          <label className="form-label fw-bold">Assign to Member</label>
          <select
            className="form-select"
            value={selectedMember}
            onChange={(e) => setSelectedMember(e.target.value)}
          >
            <option value="">-- Select Member --</option>
            {members.map((m, idx) => (
              <option key={idx} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        {days.map((day, i) => (
          <div key={i} className="card mb-3 p-3 shadow-sm">
            <h4 className="text-primary">{day.weekday}</h4>

            <div className="row mt-3">
              <div className="col-md-6 mb-3">
                <label className="form-label">Workout Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g., Upper Body Strength"
                  value={day.workoutName}
                  onChange={(e) => handleDayChange(i, "workoutName", e.target.value)}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Duration (minutes)</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="e.g., 45"
                  value={day.duration}
                  onChange={(e) => handleDayChange(i, "duration", e.target.value)}
                />
              </div>
            </div>

            <div>
              <h5 className="mt-3">Exercises</h5>

              {day.exercises.map((ex, exIndex) => (
                <div key={exIndex} className="border rounded p-2 mb-2 bg-light">
                  <div className="mb-2">
                    <label className="form-label">Exercise Name</label>
                    <input
                      className="form-control"
                      placeholder="e.g., Bench Press"
                      value={ex.exerciseName}
                      onChange={(e) => handleExerciseChange(i, exIndex, "exerciseName", e.target.value)}
                    />
                  </div>

                  <div className="row g-2">
                    <div className="col-6">
                      <label className="form-label">Reps</label>
                      <input
                        className="form-control"
                        placeholder="10"
                        value={ex.reps}
                        onChange={(e) => handleExerciseChange(i, exIndex, "reps", e.target.value)}
                      />
                    </div>

                    <div className="col-6">
                      <label className="form-label">Sets</label>
                      <input
                        className="form-control"
                        placeholder="4"
                        value={ex.sets}
                        onChange={(e) => handleExerciseChange(i, exIndex, "sets", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ))}

              <button
                type="button"
                className="btn btn-sm btn-dark mt-2"
                onClick={() => addExercise(i)}
              >
                Add Exercise
              </button>
            </div>
          </div>
        ))}

        <button type="submit" className="btn btn-warning w-100 mt-2 mb-5 p-2 fw-bold">
          Save Workout Plan
        </button>
      </form>
    </div>
  );
};

export default WorkoutForm;
