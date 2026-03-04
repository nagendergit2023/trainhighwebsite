import { useState } from "react";
import { Modal, Button } from "antd";
import PostApiCall from "../../../helpers/PostApi";

const AINutritionGeneratorModal = ({ open, onClose, onApply }) => {
  const [form, setForm] = useState({
    goal: "Fat Loss",
    calories: 1800,
    mealsPerDay: 5,
    preference: "Veg",
  });

  const [preview, setPreview] = useState(null);

  const generate = () => {
    PostApiCall.postRequest(form, "GenerateNutritionPlan")
      .then((res) => res.json())
      .then((data) => setPreview(data));
  };

  return (
    <Modal open={open} onCancel={onClose} footer={null} title="Diet Generator">
      <select
        className="form-select mb-2"
        onChange={(e) => setForm({ ...form, goal: e.target.value })}
      >
        <option>Fat Loss</option>
        <option>Muscle Gain</option>
        <option>Maintenance</option>
      </select>

      <input
        type="number"
        className="form-control mb-2"
        placeholder="Calories"
        value={form.calories}
        onChange={(e) => setForm({ ...form, calories: Number(e.target.value) })}
      />

      <select
        className="form-select mb-3"
        onChange={(e) => setForm({ ...form, preference: e.target.value })}
      >
        <option>Veg</option>
        <option>Non-Veg</option>
      </select>

      <Button
        type="primary"
        className="btn btn-success w-100 d-flex justify-content-center align-items-center"
        onClick={generate}
      >
        Generate
      </Button>

      {preview && (
        <div className="mt-3">
          {preview.days.map((d, i) => (
            <div key={i} className="border p-2 mb-2 rounded">
              <strong>{d.weekday}</strong> — {d.calories} kcal
              <div className="small text-muted">
                {Object.values(d.meals).filter(Boolean).join(" | ")}
              </div>
            </div>
          ))}

          <Button
            type="primary"
            className="mt-2 btn btn-success w-100 d-flex justify-content-center align-items-center"
            onClick={() => onApply(preview)}
          >
            Copy to Nutrition Plan
          </Button>
        </div>
      )}
    </Modal>
  );
};

export default AINutritionGeneratorModal;
