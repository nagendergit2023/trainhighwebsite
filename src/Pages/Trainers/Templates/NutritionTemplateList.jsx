import { useEffect, useState } from "react";
import GetApiCall from "../../../helpers/GetApi";

function NutritionTemplateList({ onEdit, refreshKey }) {
  const [templates, setTemplates] = useState([]);

  const fetchTemplates = () => {
    GetApiCall.getRequest("nutrition/getNutritionTemplates")
      .then((res) => res.json())
      .then(setTemplates);
  };

  useEffect(() => {
    fetchTemplates();
  }, [refreshKey]);
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

export default NutritionTemplateList;
