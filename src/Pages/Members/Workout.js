import { useEffect, useState, useMemo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import GetApiCall from "../../helpers/GetApi";
import PostApiCall from "../../helpers/PostApi";
import { notification, Spin } from "antd";

const Workout = () => {
  const memberId = JSON?.parse(localStorage.getItem("user"))?.memberId;

  const [days, setDays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noPlan, setNoPlan] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);
  const [completedExercises, setCompletedExercises] = useState([]);
  const [streak, setStreak] = useState(0);

  const WEEK_TEMPLATE = [
    { weekday: "Monday", workoutName: "", duration: 0, exercises: [] },
    { weekday: "Tuesday", workoutName: "", duration: 0, exercises: [] },
    { weekday: "Wednesday", workoutName: "", duration: 0, exercises: [] },
    { weekday: "Thursday", workoutName: "", duration: 0, exercises: [] },
    { weekday: "Friday", workoutName: "", duration: 0, exercises: [] },
    { weekday: "Saturday", workoutName: "", duration: 0, exercises: [] },
    { weekday: "Sunday", workoutName: "Rest", duration: 0, exercises: [] },
  ];

  /* ================= UTILITIES ================= */

  const todayName = new Date().toLocaleString("en-US", {
    weekday: "long",
  });

  const todayWorkout = useMemo(() => {
    return (
      days.find((d) => d.weekday === todayName) || {
        workoutName: "Rest",
        exercises: [],
      }
    );
  }, [days, todayName]);

  const totalExercisesThisWeek = useMemo(() => {
    return days.reduce((total, day) => total + (day.exercises?.length || 0), 0);
  }, [days]);

  const weeklyCompletion = totalExercisesThisWeek
    ? (completedExercises.length / totalExercisesThisWeek) * 100
    : 0;

  /* ================= PROGRESS TOGGLE ================= */

  const toggleExercise = (dayName, exerciseName) => {
    const uniqueKey = `${dayName}-${exerciseName}`;

    let updated;

    if (completedExercises.includes(uniqueKey)) {
      updated = completedExercises.filter((e) => e !== uniqueKey);
    } else {
      updated = [...completedExercises, uniqueKey];

      PostApiCall.postRequest(
        {
          memberId,
          exerciseName,
          weekday: dayName,
          date: new Date(),
        },
        "WorkoutProgress/SaveWorkoutProgress",
      );
    }

    setCompletedExercises(updated);
  };

  /* ================= MERGE PLAN ================= */

  const mergePlanWithTemplate = (apiDays) => {
    return WEEK_TEMPLATE.map((templateDay) => {
      const savedDay = apiDays?.find((d) => d.weekday === templateDay.weekday);

      if (savedDay) {
        return {
          ...templateDay,
          ...savedDay,
          exercises: savedDay.exercises || [],
        };
      }

      return templateDay;
    });
  };

  /* ================= AUTO OPEN TODAY ================= */

  const openTodayWorkout = (mergedDays) => {
    const index = mergedDays.findIndex((d) => d.weekday === todayName);
    setOpenIndex(index !== -1 ? index : null);
  };

  /* ================= FETCH PLAN ================= */

  useEffect(() => {
    if (!memberId) return;

    setLoading(true);

    GetApiCall.getRequest(`GetWorkoutPlanByMember/${memberId}`)
      .then((res) => {
        if (res.status === 204) {
          setNoPlan(true);
          setLoading(false);
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (!data || !data.days || data.days.length === 0) {
          setNoPlan(true);
          setLoading(false);
          return;
        }

        const mergedDays = mergePlanWithTemplate(data.days);
        setDays(mergedDays);
        openTodayWorkout(mergedDays);

        // Simple streak logic (based on completion %)
        if (completedExercises.length > 0) {
          setStreak((prev) => prev + 1);
        }

        setNoPlan(false);
        setLoading(false);
      })
      .catch(() => {
        notification.error({
          message: "Error fetching workout plan",
        });
        setLoading(false);
      });
  }, [memberId]);

  /* ================= MISSED WORKOUT WARNING ================= */

  // useEffect(() => {
  //   if (todayWorkout.exercises.length > 0 && completedExercises.length === 0) {
  //     const hour = new Date().getHours();
  //     if (hour >= 20) {
  //       notification.warning({
  //         message: "You missed today's workout!",
  //       });
  //     }
  //   }
  // }, [todayWorkout, completedExercises]);
  const getCurrentWeekDates = () => {
    const now = new Date();
    const first = now.getDate() - now.getDay() + 1; // Monday
    const last = first + 6; // Sunday

    const monday = new Date(now.setDate(first));
    const sunday = new Date(now.setDate(last));

    const format = (date) => new Date(date).toISOString().split("T")[0];

    return {
      start: format(monday),
      end: format(sunday),
    };
  };

  useEffect(() => {
    if (!memberId) return;

    const { start, end } = getCurrentWeekDates();

    GetApiCall.getRequest(
      `WorkoutProgress/GetWorkoutProgress/${memberId}?start=${start}&end=${end}`,
    )
      .then((res) => res.json())
      .then((data) => {
        const completed = data.map(
          (item) => `${item.weekday}-${item.exerciseName}`,
        );

        setCompletedExercises(completed);
      })
      .catch(() => {
        notification.error({
          message: "Failed to load workout progress",
        });
      });
  }, [memberId]);

  const toggleAccordion = (i) => {
    setOpenIndex((prev) => (prev === i ? null : i));
  };

  /* ================= LOADING ================= */

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spin tip="Loading workout plan..." size="large" />
      </div>
    );
  }

  /* ================= EMPTY STATE ================= */

  if (noPlan) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center vh-100 text-center px-3">
        <div style={{ fontSize: "70px" }}>🏋️‍♂️</div>
        <h3 className="fw-bold mt-3">No Active Workout Plan</h3>
        <p className="text-muted mt-2">
          Your trainer hasn’t assigned a workout plan yet.
        </p>
        <button
          className="btn btn-dark mt-3 px-4"
          onClick={() =>
            notification.info({
              description: "Please contact your trainer.",
            })
          }
        >
          Contact Trainer
        </button>
      </div>
    );
  }

  /* ================= MAIN UI ================= */

  return (
    <div className="container mb-5 mt-3">
      <h2 className="text-center mb-4">Workout Planner</h2>

      <div className="text-center mb-3 fw-bold">
        🔥 {streak} Day Workout Streak
      </div>

      {/* Today Card */}
      <div className="p-3 mb-4 rounded shadow-sm border">
        <h5>Today's Workout</h5>
        <strong>{todayWorkout.workoutName}</strong>
        <div>{todayWorkout.exercises.length} Exercises</div>
      </div>

      {/* Weekly Completion */}
      {/* 📊 Weekly Completion Enhanced */}
      <div className="mb-4">
        <div className="d-flex justify-content-between mb-1">
          <span className="fw-bold">Weekly Progress</span>
          <span className="fw-bold">{Math.round(weeklyCompletion)}%</span>
        </div>

        <div
          style={{
            height: "14px",
            background: "#eee",
            borderRadius: "20px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${weeklyCompletion}%`,
              height: "100%",
              background: "linear-gradient(90deg, #000000, #434343)",
              transition: "width 0.6s ease-in-out",
              borderRadius: "20px",
              boxShadow:
                weeklyCompletion > 70 ? "0 0 10px rgba(0,0,0,0.6)" : "none",
            }}
          />
        </div>
      </div>
      {weeklyCompletion === 100 && (
        <div className="text-success fw-bold mt-2">
          🎉 Perfect Week! Keep crushing it!
        </div>
      )}
      {/* Accordion */}
      <div className="accordion" id="weeklyAccordion">
        {days.map((day, i) => {
          const isOpen = openIndex === i;

          return (
            <div
              className="accordion-item custom-accordion-item"
              key={day.weekday}
            >
              <h2 className="accordion-header" id={`heading-${i}`}>
                <button
                  className={`accordion-button ${isOpen ? "" : "collapsed"}`}
                  onClick={() => toggleAccordion(i)}
                >
                  <div className="d-flex justify-content-between w-100">
                    <div>
                      <strong>{day.weekday.slice(0, 3).toUpperCase()}</strong> —{" "}
                      {day.workoutName || "Rest"}
                    </div>
                    {day.duration > 0 && <span>{day.duration} mins</span>}
                  </div>
                </button>
              </h2>

              <div
                className={`accordion-collapse ${isOpen ? "show" : "collapse-custom"}`}
              >
                <div className="accordion-body">
                  {day.exercises?.length > 0 ? (
                    <ul className="list-unstyled">
                      {day.exercises.map((ex, idx) => (
                        <li
                          key={idx}
                          className="mb-3 d-flex justify-content-between align-items-center"
                        >
                          <div>
                            <strong>{ex.exerciseName}</strong>
                            <div className="text-muted small">
                              {ex.reps} × {ex.sets}
                            </div>
                          </div>

                          <input
                            type="checkbox"
                            checked={completedExercises.includes(
                              `${day.weekday}-${ex.exerciseName}`,
                            )}
                            disabled={day.weekday !== todayName}
                            style={{
                              cursor:
                                day.weekday === todayName
                                  ? "pointer"
                                  : "not-allowed",
                              opacity: day.weekday === todayName ? 1 : 0.5,
                            }}
                            onChange={() =>
                              toggleExercise(day.weekday, ex.exerciseName)
                            }
                          />
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
