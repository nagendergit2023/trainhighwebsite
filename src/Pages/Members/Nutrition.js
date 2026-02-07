import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Spin, notification } from "antd";
import PostApiCall from "../../helpers/PostApi";
import "./Nutrition.css"; // custom styling

const Nutrition = ({ selectedMemberId }) => {
  const [days, setDays] = useState([]);
  const [loading, setLoading] = useState(true);
  let memberId = JSON.parse(localStorage.getItem("user"))?.memberId;

  // ------------------- Fetch Active Plan -------------------
  useEffect(() => {
    if (!memberId) return;

    PostApiCall.postRequest({ memberId: Number(memberId) }, "getActivePlan")
      .then(async (res) => {
        if (res.status === 200) {
          const obj = await res.json();
          if (obj) {
            // obj.days may come as {1:{},2:{}} → convert to array
            const dayArray = Object.values(obj).map((d) => ({
              weekday: d.weekday,
              workoutName: d.planName || "Workout",
              numberOfMeals: d.numberOfMeals,
              calories: d.calories,
              meals: d.meals || null,
              isCheatDay: d.isCheatDay,
            }));
            setDays(dayArray);
          } else {
            notification.warning({ description: "No active plan found" });
          }
        } else {
          notification.error({ description: "Failed to fetch active plan" });
        }
        setLoading(false);
      })
      .catch(() => {
        notification.error({ description: "Error fetching active plan" });
        setLoading(false);
      });
  }, [memberId]);

  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (i) => setOpenIndex((prev) => (prev === i ? null : i));

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spin tip="Loading nutrition plan..." size="large" className="black-spin" />
      </div>
    );
  }

  return (
    <div className="container mb-5 mt-3">
      <h2 className="text-center mb-4 weekly-title">Nutrition Planner</h2>
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
                        <span className="workout-name">
                          {day.isCheatDay ? "🍕 Cheat Day" : day.workoutName}
                        </span>
                        {!day.isCheatDay && day.numberOfMeals && (
                          <span className="workout-exercises">
                            {day.numberOfMeals} Meals
                          </span>
                        )}
                      </div>
                      {!day.isCheatDay && day.calories && (
                        <span className="workout-duration">
                          {day.calories} Cals
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="ms-auto chevron">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden
                    >
                      <path
                        d="M6 9l6 6 6-6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
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
                  {day.isCheatDay ? (
                    <p className="text-muted">Cheat day — no food planned.</p>
                  ) : day.meals ? (
                    <ul className="space-y-1">
                      {Object.entries(day.meals).map(([mealName, mealDesc]) => (
                        <li key={mealName}>
                          <strong>
                            {mealName.charAt(0).toUpperCase() +
                              mealName.slice(1)}
                            :
                          </strong>{" "}
                          {mealDesc}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted">No meals planned for today.</p>
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

export default Nutrition;
