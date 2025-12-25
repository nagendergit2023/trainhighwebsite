import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import GetApiCall from "../../helpers/GetApi";

const TemplateManager = () => {
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    GetApiCall.getRequest("GetWorkoutTemplates")
      .then((res) => res.json())
      .then(setTemplates);
  }, []);

  const deleteTemplate = (id) => {
    GetApiCall.postRequest("DeleteWorkoutTemplate", { id }).then(() =>
      setTemplates((prev) => prev.filter((t) => t.id !== id))
    );
  };

  return (
    <>
      <div className="d-flex justify-content-between mb-3">
        <h4>Workout Templates</h4>
        <Button variant="warning">+ Create Template</Button>
      </div>

      {templates.map((t) => (
        <Card key={t.id} className="mb-3">
          <Card.Body>
            <h6 className="fw-bold">{t.name}</h6>
            <p className="text-muted">{t.description}</p>

            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => deleteTemplate(t.id)}
            >
              Delete
            </Button>
          </Card.Body>
        </Card>
      ))}
    </>
  );
};

export default TemplateManager;
