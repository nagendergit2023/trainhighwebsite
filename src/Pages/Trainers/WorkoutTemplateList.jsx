import { useEffect, useState } from "react";
import GetApiCall from "../../helpers/GetApi";

function WorkoutTemplateList({ onEdit }) {
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    GetApiCall.getRequest("GetWorkoutTemplates")
      .then((res) => res.json())
      .then(setTemplates);
  }, []);

  return (
    <div className="card p-3 mb-4">
      <h5>Saved Templates</h5>

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {templates.map((t) => (
            <tr key={t.id}>
              <td>{t.name}</td>
              <td>{t.category}</td>
              <td>
                <button
                  className="btn btn-sm btn-warning"
                  onClick={() => onEdit(t.id)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default WorkoutTemplateList;
