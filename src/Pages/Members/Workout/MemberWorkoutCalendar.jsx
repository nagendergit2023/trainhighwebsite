import React, { useEffect, useState } from "react";
import { Card, Badge } from "react-bootstrap";
import moment from "moment";
import GetApiCall from "../../../helpers/GetApi";

const MemberWorkoutCalendar = ({ memberId }) => {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    GetApiCall.getRequest(`GetWorkoutPlanByMember/${memberId}`)
      .then((res) => res.json())
      .then(setPlans);
  }, [memberId]);

  return (
    <div className="row">
      {plans?.days?.map((day, i) => {
        const today = moment().format("YYYY-MM-DD");
        const isToday = day.date === today;

        return (
          <div key={i} className="col-md-4 mb-3">
            <Card className={`h-100 ${isToday ? "border-warning" : ""}`}>
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

                    <div className="mt-2">
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
    </div>
  );
};

export default MemberWorkoutCalendar;
