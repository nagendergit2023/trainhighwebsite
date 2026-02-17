import React, { useState } from "react";
import { notification } from "antd";
import PostApiCall from "../../helpers/PostApi";
import GetApiCall from "../../helpers/GetApi";
import WorkoutTemplateList from "./WorkoutTemplateList";

const WEEK_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

function TrainersTemplate() {
  const trainerId = localStorage.getItem("userId");
  const [templateId, setTemplateId] = useState(null);
  const [templateName, setTemplateName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("General");
  const [isGlobal, setIsGlobal] = useState(false);

  const [days, setDays] = useState(
    WEEK_DAYS.map((day) => ({
      weekday: day,
      isRestDay: false,
      workoutName: "",
      duration: "",
      exercises: [],
    }))
  );

  /* ADD EXERCISE */
  const addExercise = (index) => {
    const updated = [...days];
    updated[index].exercises.push({
      exerciseName: "",
      sets: 0,
      reps: "",
    });
    setDays(updated);
  };

  /* UPDATE EXERCISE */
  const updateExercise = (dayIndex, exIndex, field, value) => {
    const updated = [...days];
    updated[dayIndex].exercises[exIndex][field] = value;
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
        name: templateName,
        description,
        category,
        trainerId,
        isGlobal,
        days,
      },
      "UpdateWorkoutTemplates"
    ).then(() => {
      notification.success({ description: "Template saved successfully" });
      resetForm();
      setDays(
        WEEK_DAYS.map((day) => ({
          weekday: day,
          isRestDay: false,
          workoutName: "",
          duration: "",
          exercises: [],
        }))
      );
    });
  };
  const loadTemplate = (id) => {
    GetApiCall.getRequest(`GetWorkoutTemplates?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTemplateId(data.fld_id);
        setTemplateName(data.fld_name);
        setDescription(data.fld_description);
        setCategory(data.fld_category);

        setDays(
          WEEK_DAYS.map((day) => {
            const apiDay = data.days.find((d) => d.weekday === day);

            return (
              apiDay || {
                weekday: day,
                isRestDay: false,
                workoutName: "",
                duration: "",
                exercises: [],
              }
            );
          })
        );
      });
  };

  const resetForm = () => {
    setTemplateName("");
    setDescription("");
    setCategory("General");
    setIsGlobal(false);
  };

  return (
    <>
      <WorkoutTemplateList onEdit={loadTemplate} />

      <div className="mb-5 mt-3 container">
        <h2 className="weekly-title mb-4 text-center">Workout Templates</h2>

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

        {/* DAYS */}
        {days.map((day, index) => (
          <div className="card mb-3 p-3" key={index}>
            <div className="d-flex justify-content-between align-items-center">
              <h5>{day.weekday}</h5>

              <label>
                <input
                  type="checkbox"
                  checked={day.isRestDay}
                  onChange={() => {
                    const updated = [...days];
                    updated[index].isRestDay = !updated[index].isRestDay;
                    setDays(updated);
                  }}
                />{" "}
                Rest Day
              </label>
            </div>

            {!day.isRestDay && (
              <>
                <div className="row mt-2">
                  <div className="col-md-6">
                    <input
                      placeholder="Workout Name"
                      className="form-control"
                      value={day.workoutName}
                      onChange={(e) => {
                        const updated = [...days];
                        updated[index].workoutName = e.target.value;
                        setDays(updated);
                      }}
                    />
                  </div>

                  <div className="col-md-6">
                    <input
                      placeholder="Duration (minutes)"
                      className="form-control"
                      value={day.duration}
                      onChange={(e) => {
                        const updated = [...days];
                        updated[index].duration = e.target.value;
                        setDays(updated);
                      }}
                    />
                  </div>
                </div>

                {/* EXERCISES */}
                <div className="mt-3">
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => addExercise(index)}
                  >
                    ➕ Add Exercise
                  </button>

                  {day.exercises.map((ex, exIndex) => (
                    <div className="row mt-2" key={exIndex}>
                      <div className="col-md-4">
                        <input
                          placeholder="Exercise"
                          className="form-control"
                          value={ex.exerciseName}
                          onChange={(e) =>
                            updateExercise(
                              index,
                              exIndex,
                              "exerciseName",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div className="col-md-4">
                        <input
                          placeholder="Sets"
                          className="form-control"
                          value={ex.sets}
                          onChange={(e) =>
                            updateExercise(
                              index,
                              exIndex,
                              "sets",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div className="col-md-4">
                        <input
                          placeholder="Reps"
                          className="form-control"
                          value={ex.reps}
                          onChange={(e) =>
                            updateExercise(
                              index,
                              exIndex,
                              "reps",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        ))}

        {/* SAVE BUTTON */}
        <button className="btn btn-warning w-100 mt-3" onClick={saveTemplate}>
          Save Template
        </button>
      </div>
    </>
  );
}

export default TrainersTemplate;
