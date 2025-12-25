import React, { useEffect, useState } from "react";
import GetApiCall from "../../helpers/GetApi";

const WorkoutHistory = ({ memberId }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    GetApiCall.getRequest(`GetWorkoutPlanHistory/${memberId}`)
      .then((res) => res.json())
      .then(setHistory);
  }, [memberId]);

  return (
    <div className="card p-3 shadow-sm">
      <h5 className="fw-bold mb-3">Workout Plan History</h5>

      {history?.map((h, i) => (
        <div key={i} className="border rounded p-2 mb-2">
          <strong>{h.planType.toUpperCase()}</strong> – {h.planStartDate}
          <br />
          <small className="text-muted">
            {new Date(h.createdAt).toLocaleDateString()}
          </small>
        </div>
      ))}

      {history.length === 0 && (
        <p className="text-muted">No workout plans found</p>
      )}
    </div>
  );
};

export default WorkoutHistory;
