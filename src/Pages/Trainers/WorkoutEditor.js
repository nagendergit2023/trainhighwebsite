import "bootstrap/dist/css/bootstrap.min.css";

/*  CONSTANT  */

const WEEK_TEMPLATE = [
  {
    weekday: "Monday",
    isRestDay: false,
    workoutName: "",
    duration: null,
    exercises: [],
  },
  {
    weekday: "Tuesday",
    isRestDay: false,
    workoutName: "",
    duration: null,
    exercises: [],
  },
  {
    weekday: "Wednesday",
    isRestDay: false,
    workoutName: "",
    duration: null,
    exercises: [],
  },
  {
    weekday: "Thursday",
    isRestDay: false,
    workoutName: "",
    duration: null,
    exercises: [],
  },
  {
    weekday: "Friday",
    isRestDay: false,
    workoutName: "",
    duration: null,
    exercises: [],
  },
  {
    weekday: "Saturday",
    isRestDay: false,
    workoutName: "",
    duration: null,
    exercises: [],
  },
  {
    weekday: "Sunday",
    isRestDay: true,
    workoutName: "Rest",
    duration: null,
    exercises: [],
  },
];

const WorkoutEditor = ({
  days,
  setDays,
  trainerComment,
  setTrainerComment,
}) => {
  /* HELPERS */

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
    updated[dayIndex].exercises.push({
      exerciseName: "",
      reps: "",
      sets: "",
    });
    setDays(updated);
  };

  const toggleRestDay = (index, checked) => {
    const updated = [...days];
    updated[index].isRestDay = checked;
    updated[index].workoutName = checked ? "Rest" : "";
    updated[index].duration = "";
    updated[index].exercises = checked
      ? []
      : [{ exerciseName: "", reps: "", sets: "" }];
    setDays(updated);
  };

  return (
    <>
      {days?.map((day, i) => (
        <div key={i} className="card shadow-sm mb-3">
          <div className="card-header fw-bold d-flex justify-content-between">
            {day.weekday}
            {day.isRestDay && <span className="badge bg-secondary">Rest</span>}
          </div>

          <div className="card-body">
            {/* REST DAY SWITCH */}
            <div className="form-check form-switch mb-2">
              <input
                className="form-check-input"
                type="checkbox"
                checked={day.isRestDay}
                onChange={(e) => toggleRestDay(i, e.target.checked)}
              />
              <label className="fw-semibold">Rest Day</label>
            </div>

            {!day.isRestDay && (
              <>
                {/* WORKOUT NAME */}
                <input
                  className="form-control mb-2"
                  placeholder="Workout Name"
                  value={day.workoutName}
                  onChange={(e) =>
                    handleDayChange(i, "workoutName", e.target.value)
                  }
                />

                {/* DURATION */}
                <input
                  type="number"
                  className="form-control mb-3"
                  placeholder="Duration (minutes)"
                  value={day.duration}
                  onChange={(e) =>
                    handleDayChange(i, "duration", e.target.value)
                  }
                />

                {/* EXERCISES */}
                <h6 className="fw-bold">Exercises</h6>

                {day.exercises.map((ex, exIndex) => (
                  <div key={exIndex} className="border rounded p-2 mb-2">
                    <input
                      className="form-control mb-2"
                      placeholder="Exercise Name"
                      value={ex.exerciseName}
                      onChange={(e) =>
                        handleExerciseChange(
                          i,
                          exIndex,
                          "exerciseName",
                          e.target.value
                        )
                      }
                    />

                    <div className="row">
                      <div className="col-6">
                        <input
                          className="form-control"
                          placeholder="Reps"
                          value={ex.reps}
                          onChange={(e) =>
                            handleExerciseChange(
                              i,
                              exIndex,
                              "reps",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div className="col-6">
                        <input
                          className="form-control"
                          placeholder="Sets"
                          value={ex.sets}
                          onChange={(e) =>
                            handleExerciseChange(
                              i,
                              exIndex,
                              "sets",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  className="btn btn-sm btn-outline-dark"
                  onClick={() => addExercise(i)}
                >
                  + Add Exercise
                </button>
              </>
            )}
          </div>
        </div>
      ))}

      {/* TRAINER COMMENT */}
      <div className="card p-3 shadow-sm mb-3">
        <label className="fw-bold">Trainer Comment</label>
        <textarea
          className="form-control"
          rows="2"
          value={trainerComment}
          onChange={(e) => setTrainerComment(e.target.value)}
        />
      </div>
    </>
  );
};

export default WorkoutEditor;

/* Export template for planner use */
export { WEEK_TEMPLATE };
