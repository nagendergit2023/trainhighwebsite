import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Nutrition.css"; // 👈 custom styles

const Nutrition = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const days = [
    {
      weekday: "Monday",
      workoutName: "Cardio",
      numberOfMeals: 7,
      meals: {
        breakfast: "Oatmeal with banana and peanut butter",
        morningSnacks: "Greek yogurt with berries",
        lunch: "Grilled chicken with brown rice and vegetables",
        eveningSnacks: "Protein bar or handful of nuts",
        dinner: "Salmon with sweet potatoes and steamed broccoli",
        preWorkout: "Banana and black coffee",
        postWorkout: "Protein shake with milk and oats",
      },
      calories: "4500",
    },
    {
      weekday: "Tuesday",
      workoutName: "Strength",
      numberOfMeals: 7,
      meals: {
        breakfast: "Oatmeal with banana and peanut butter",
        morningSnacks: "Greek yogurt with berries",
        lunch: "Grilled chicken with brown rice and vegetables",
        eveningSnacks: "Protein bar or handful of nuts",
        dinner: "Salmon with sweet potatoes and steamed broccoli",
        preWorkout: "Banana and black coffee",
        postWorkout: "Protein shake with milk and oats",
      },
      calories: "5000",
    },
    {
      weekday: "Wednesday",
      workoutName: "Aerobics",
      numberOfMeals: 4,
      meals: {
        breakfast: "Oatmeal with banana and peanut butter",
        morningSnacks: "Greek yogurt with berries",
        lunch: "Grilled chicken with brown rice and vegetables",
        eveningSnacks: "Protein bar or handful of nuts",
        dinner: "Salmon with sweet potatoes and steamed broccoli",
        preWorkout: "Banana and black coffee",
        postWorkout: "Protein shake with milk and oats",
      },
      calories: "6000",
    },
    {
      weekday: "Thursday",
      workoutName: "Yoga",
      numberOfMeals: 6,
      meals: {
        breakfast: "Oatmeal with banana and peanut butter",
        morningSnacks: "Greek yogurt with berries",
        lunch: "Grilled chicken with brown rice and vegetables",
        eveningSnacks: "Protein bar or handful of nuts",
        dinner: "Salmon with sweet potatoes and steamed broccoli",
        preWorkout: "Banana and black coffee",
        postWorkout: "Protein shake with milk and oats",
      },
      calories: "6000",
    },
    {
      weekday: "Friday",
      workoutName: "Program",
      numberOfMeals: 8,
      meals: {
        breakfast: "Oatmeal with banana and peanut butter",
        morningSnacks: "Greek yogurt with berries",
        lunch: "Grilled chicken with brown rice and vegetables",
        eveningSnacks: "Protein bar or handful of nuts",
        dinner: "Salmon with sweet potatoes and steamed broccoli",
        preWorkout: "Banana and black coffee",
        postWorkout: "Protein shake with milk and oats",
      },
      calories: "3000",
    },
    {
      weekday: "Saturday",
      workoutName: "Crossfit",
      numberOfMeals: 5,
      meals: {
        breakfast: "Oatmeal with banana and peanut butter",
        morningSnacks: "Greek yogurt with berries",
        lunch: "Grilled chicken with brown rice and vegetables",
        eveningSnacks: "Protein bar or handful of nuts",
        dinner: "Salmon with sweet potatoes and steamed broccoli",
        preWorkout: "Banana and black coffee",
        postWorkout: "Protein shake with milk and oats",
      },
      calories: "3000",
    },
    {
      weekday: "Sunday",
      workoutName: "Cheatday",
      numberOfMeals: null,
      meals: null,
      calories: null,
    },
  ];

  const toggle = (i) => {
    setOpenIndex((prev) => (prev === i ? null : i));
  };

  return (
    <div className="container mb-5 mt-3">
      <h2 className="text-center mb-4 weekly-title">Nutrition Planner</h2>
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
                  className={`accordion-button d-flex align-items-center ${isOpen ? "" : "collapsed"
                    }`}
                  onClick={() => toggle(i)}
                >
                  <div className="day-left">
                    <span className="day-name">{day.weekday.slice(0, 3).toUpperCase()}</span>
                    <div className="workout-info">
                      <div className="workout-left">
                        <span className="workout-name">{day.workoutName}</span>
                        {day.numberOfMeals && (
                          <span className="workout-exercises">
                            {day.numberOfMeals} Meals
                          </span>
                        )}
                      </div>
                      {day.calories && (
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
                className={`accordion-collapse collapse-custom ${isOpen ? "open" : ""
                  }`}
              >
                <div className="accordion-body">
                  {day.meals ? (
                    <ul className="space-y-1">
                      {Object.entries(day.meals).map(([mealName, mealDesc]) => (
                        <li key={mealName}>
                          <strong>
                            {mealName.charAt(0).toUpperCase() + mealName.slice(1)}:
                          </strong>{" "}
                          {mealDesc}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted">Cheat day — no food planned.</p>
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
