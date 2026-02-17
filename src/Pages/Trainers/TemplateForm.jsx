import React, { useEffect, useState } from "react";

const WEEK_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

function TemplateForm({ editData, onCancel, onSave, trainerId, type }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("General");
  const [description, setDescription] = useState("");
  const [days, setDays] = useState([]);

  useEffect(() => {
    if (editData) {
      setName(editData.name);
      setCategory(editData.category);
      setDescription(editData.description);
      setDays(editData.days);
    } else {
      setDays(
        WEEK_DAYS.map((d) => ({
          weekday: d,
          isRestDay: false,
          workoutName: "",
          duration: "",
          exercises: [],
        }))
      );
    }
  }, [editData]);

  const submit = () => {
    onSave({
      templateId: editData?.id || null,
      name,
      category,
      description,
      trainerId,
      type,
      days,
    });
  };

  return (
    <div className="card p-3">
      <h4>{editData ? "Edit Template" : "Create Template"}</h4>

      <input
        className="form-control my-2"
        placeholder="Template Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="form-control my-2"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <textarea
        className="form-control my-2"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <div className="d-flex gap-2 mt-3">
        <button className="btn btn-warning w-100" onClick={submit}>
          {editData ? "Update" : "Save"}
        </button>

        <button className="btn btn-secondary w-100" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default TemplateForm;
