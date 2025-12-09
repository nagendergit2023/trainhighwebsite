import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Workout.css"; // 👈 custom styles

const Workout = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const days = [
    {
      weekday: "Monday",
      workoutName: "Cardio",
      numberOfExercises: 5,
      duration: 45,
      exercises: [
        { exerciseName: "Jumping Jacks", reps: 30, sets: 3 },
        { exerciseName: "High Knees", reps: 40, sets: 3 },
        { exerciseName: "Mountain Climbers", reps: 20, sets: 3 },
        { exerciseName: "Burpees", reps: 15, sets: 3 },
        { exerciseName: "Running in Place", reps: 60, sets: 2 }
      ]
    },
    {
      weekday: "Tuesday",
      workoutName: "Strength",
      numberOfExercises: 7,
      duration: 50,
      exercises: [
        { exerciseName: "Push-Ups", reps: 12, sets: 3 },
        { exerciseName: "Squats", reps: 15, sets: 3 },
        { exerciseName: "Lunges", reps: 10, sets: 3 },
        { exerciseName: "Plank", reps: "45 sec", sets: 3 },
        { exerciseName: "Bicep Curls", reps: 12, sets: 3 },
        { exerciseName: "Shoulder Press", reps: 12, sets: 3 },
        { exerciseName: "Tricep Dips", reps: 10, sets: 3 }
      ]
    },
    {
      weekday: "Wednesday",
      workoutName: "Aerobics",
      numberOfExercises: 4,
      duration: 60,
      exercises: [
        { exerciseName: "Step Touch", reps: 30, sets: 3 },
        { exerciseName: "Grapevine Step", reps: 20, sets: 3 },
        { exerciseName: "Knee Lifts", reps: 25, sets: 3 },
        { exerciseName: "Side Kicks", reps: 20, sets: 3 }
      ]
    },
    {
      weekday: "Thursday",
      workoutName: "Yoga",
      numberOfExercises: 6,
      duration: 60,
      exercises: [
        { exerciseName: "Sun Salutation", reps: 3, sets: 2 },
        { exerciseName: "Downward Dog", reps: "30 sec hold", sets: 2 },
        { exerciseName: "Warrior II Pose", reps: "30 sec hold", sets: 2 },
        { exerciseName: "Triangle Pose", reps: "30 sec hold", sets: 2 },
        { exerciseName: "Tree Pose", reps: "30 sec hold", sets: 2 },
        { exerciseName: "Child’s Pose", reps: "1 min hold", sets: 1 }
      ]
    },
    {
      weekday: "Friday",
      workoutName: "Program",
      numberOfExercises: 8,
      duration: 30,
      exercises: [
        { exerciseName: "Jump Rope", reps: 60, sets: 3 },
        { exerciseName: "Push-Ups", reps: 12, sets: 3 },
        { exerciseName: "Sit-Ups", reps: 15, sets: 3 },
        { exerciseName: "Lunges", reps: 10, sets: 3 },
        { exerciseName: "Burpees", reps: 12, sets: 2 },
        { exerciseName: "Plank", reps: "45 sec", sets: 2 },
        { exerciseName: "Squats", reps: 15, sets: 3 },
        { exerciseName: "Jumping Jacks", reps: 30, sets: 2 }
      ]
    },
    {
      weekday: "Saturday",
      workoutName: "Crossfit",
      numberOfExercises: 5,
      duration: 30,
      exercises: [
        { exerciseName: "Thrusters", reps: 10, sets: 3 },
        { exerciseName: "Pull-Ups", reps: 8, sets: 3 },
        { exerciseName: "Deadlifts", reps: 10, sets: 3 },
        { exerciseName: "Box Jumps", reps: 12, sets: 3 },
        { exerciseName: "Kettlebell Swings", reps: 15, sets: 3 }
      ]
    },
    {
      weekday: "Sunday",
      workoutName: "Rest",
      numberOfExercises: 0,
      duration: 0,
      exercises: []
    }
  ];


  const toggle = (i) => {
    setOpenIndex((prev) => (prev === i ? null : i));
  };

  return (
    <div className="container mb-5 mt-3">
      <h2 className="text-center mb-4 weekly-title">Workout Planner</h2>
      <div className="accordion pb-5" id="weeklyAccordion">
        {days.map((day, i) => {
          const isOpen = openIndex === i;
          return (
            <div className="accordion-item custom-accordion-item" key={day.weekday}>
              <h2 className="accordion-header" id={`heading-${i}`}>
                <button
                  type="button"
                  aria-controls={`panel-${i}`}
                  aria-expanded={isOpen ? "true" : "false"}
                  className={`accordion-button d-flex align-items-center ${isOpen ? "" : "collapsed"}`}
                  onClick={() => toggle(i)}
                >
                  <div className="day-left">
                    <span className="day-name">{day.weekday.slice(0, 3).toUpperCase()}</span>
                    <div className="workout-info">
                      <div className="workout-left">
                        <span className="workout-name">{day.workoutName}</span>
                        {day.numberOfExercises > 0 ? (
                          <span className="workout-exercises">
                            {day.numberOfExercises} Exercises
                          </span>
                        ) : (
                          ""
                        )}
                      </div>
                      {day.duration > 0 ? (
                        <span className="workout-duration">
                          {day.duration} Mins
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="ms-auto chevron">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </button>
              </h2>

              <div
                id={`panel-${i}`}
                role="region"
                aria-labelledby={`heading-${i}`}
                className={`accordion-collapse collapse-custom ${isOpen ? "open" : ""}`}
              >
                <div className="accordion-body">
                  {day.exercises?.length > 0 ? (
                    <ul className="space-y-1">
                      {day.exercises.map((ex, idx) => (
                        <li key={idx}>
                          <div>
                            <strong>{ex.exerciseName}</strong>
                            <div className="text-muted small">
                              {typeof ex.reps === "number" ? `${ex.reps} reps` : ex.reps} × {ex.sets} sets
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted">Rest day — no exercises planned.</p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Workout;
