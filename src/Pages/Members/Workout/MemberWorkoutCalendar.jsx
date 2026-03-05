import React, { useEffect, useState } from "react";
import { Card, Badge } from "react-bootstrap";
import moment from "moment";
import GetApiCall from "../../../helpers/GetApi";

const MemberWorkoutCalendar = ({ memberId, showTodayOnly = false }) => {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    if (!memberId) return;

    GetApiCall.getRequest(`GetWorkoutPlanByMember/${memberId}`)
      .then((res) => res.json())
      .then(setPlans);
  }, [memberId]);

  const today = moment().format("dddd");

  const filteredDays = showTodayOnly
    ? plans?.days?.filter((d) => d.weekday === today)
    : plans?.days;

  if (!filteredDays?.length)
    return (
      <Card className="p-4 text-center shadow-sm border-0">
        <h6>No Workout Planned Today</h6>
      </Card>
    );

  return (
    <div className="row">
      {filteredDays.map((day, i) => {
        const isToday = day.date === today;

        return (
          <div key={i} className="col-12">
            <Card
              className={`h-100 shadow-sm border-0 ${
                isToday ? "today-card" : ""
              }`}
            >
              <Card.Body>
                <h6 className="fw-bold">
                  {moment(day.date).format("dddd, MMM D")}
                </h6>

                {day.isRestDay ? (
                  <Badge bg="secondary">Rest Day</Badge>
                ) : (
                  <>
                    <p className="mb-1">{day.workoutName}</p>
                    <small>{day.duration} min</small>

                    <div className="mt-3">
                      {day.completed ? (
                        <Badge bg="success">Completed</Badge>
                      ) : (
                        <Badge bg="warning">Pending</Badge>
                      )}
                    </div>
                  </>
                )}
              </Card.Body>
            </Card>
          </div>
        );
      })}

      <style>{`
        .today-card {
          border-left: 5px solid #6C63FF;
          background: linear-gradient(135deg, #f3f4ff, #ffffff);
        }
      `}</style>
    </div>
  );
};

export default MemberWorkoutCalendar;
