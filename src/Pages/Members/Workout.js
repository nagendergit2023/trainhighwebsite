import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import GetApiCall from "../../helpers/GetApi"; // your helper
import { notification } from "antd";

const Workout = () => {
  let memberId = JSON?.parse(localStorage.getItem("user"))?.id;
  const [days, setDays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState(0);

  const WEEK_TEMPLATE = [
    { weekday: "Monday", workoutName: "", duration: 0, exercises: [] },
    { weekday: "Tuesday", workoutName: "", duration: 0, exercises: [] },
    { weekday: "Wednesday", workoutName: "", duration: 0, exercises: [] },
    { weekday: "Thursday", workoutName: "", duration: 0, exercises: [] },
    { weekday: "Friday", workoutName: "", duration: 0, exercises: [] },
    { weekday: "Saturday", workoutName: "", duration: 0, exercises: [] },
    { weekday: "Sunday", workoutName: "Rest", duration: 0, exercises: [] },
  ];

  // Merge API data with week template
  const mergePlanWithTemplate = (apiDays) => {
    return WEEK_TEMPLATE.map((templateDay) => {
      const savedDay = apiDays.find((d) => d.weekday === templateDay.weekday);
      if (savedDay) {
        return {
          ...templateDay,
          ...savedDay,
          exercises: savedDay.exercises.length > 0 ? savedDay.exercises : [],
        };
      }
      return templateDay;
    });
  };

  useEffect(() => {
    if (!memberId) return;

    setLoading(true);

    GetApiCall.getRequest(`GetWorkoutPlanByMember/${memberId}`)
      .then((res) => {
        if (res.status === 204) {
          setDays(WEEK_TEMPLATE);
          setLoading(false);
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (!data) return;
        const mergedDays = mergePlanWithTemplate(data?.days);
        setDays(mergedDays);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        notification.error({ message: "Error fetching workout plan" });
        setLoading(false);
      });
  }, [memberId]);

  const toggle = (i) => {
    setOpenIndex((prev) => (prev === i ? null : i));
  };

  if (loading)
    return <p className="text-center mt-4">Loading workout plan...</p>;

  return (
    <div className="container mb-5 mt-3">
      <h2 className="text-center mb-4 weekly-title">Workout Planner</h2>
      <div className="accordion pb-5" id="weeklyAccordion">
        {days.map((day, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              className="accordion-item custom-accordion-item"
              key={day.weekday}
            >
              <h2 className="accordion-header" id={`heading-${i}`}>
                <button
                  type="button"
                  aria-controls={`panel-${i}`}
                  aria-expanded={isOpen ? "true" : "false"}
                  className={`accordion-button d-flex align-items-center ${
                    isOpen ? "" : "collapsed"
                  }`}
                  onClick={() => toggle(i)}
                >
                  <div className="day-left">
                    <span className="day-name">
                      {day.weekday.slice(0, 3).toUpperCase()}
                    </span>
                    <div className="workout-info">
                      <div className="workout-left">
                        <span className="workout-name">{day.workoutName}</span>
                        {day.exercises?.length > 0 ? (
                          <span className="workout-exercises">
                            {day.exercises.length} Exercises
                          </span>
                        ) : (
                          <span className="text-muted">Rest Day</span>
                        )}
                      </div>
                      {day.duration > 0 && (
                        <span className="workout-duration">
                          {day.duration} Mins
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              </h2>
              <div
                id={`panel-${i}`}
                role="region"
                aria-labelledby={`heading-${i}`}
                className={`accordion-collapse collapse-custom ${
                  isOpen ? "open" : ""
                }`}
              >
                <div className="accordion-body">
                  {day.exercises?.length > 0 ? (
                    <ul className="space-y-1">
                      {day.exercises.map((ex, idx) => (
                        <li key={idx}>
                          <div>
                            <strong>{ex.exerciseName}</strong>
                            <div className="text-muted small">
                              {typeof ex.reps === "number"
                                ? `${ex.reps} reps`
                                : ex.reps}{" "}
                              × {ex.sets} sets
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted">
                      Rest day — no exercises planned.
                    </p>
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
