import React, { useEffect, useState } from "react";
import { Modal, Tabs } from "antd";
import GetApiCall from "../../helpers/GetApi";

const { TabPane } = Tabs;

const CopyWorkoutModal = ({ open, onClose, history, onCopy }) => {
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState("");
  const [memberPlans, setMemberPlans] = useState([]);

  // LOAD MEMBERS
  useEffect(() => {
    if (!open) return;

    GetApiCall.getRequest("GetMemberList")
      .then((res) => res.json())
      .then((data) => setMembers(data.data || []));
  }, [open]);

  /* LOAD OTHER MEMBER PLANS */
  useEffect(() => {
    if (!selectedMember) return;

    GetApiCall.getRequest(`GetWorkoutPlanHistory/${selectedMember}`)
      .then((res) => res.json())
      .then(setMemberPlans);
  }, [selectedMember]);

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      title="Copy Workout Plan"
      width={600}
    >
      <Tabs defaultActiveKey="history">
        <TabPane tab="Previous Plans" key="history">
          {history.length === 0 && (
            <p className="text-muted">No previous plans</p>
          )}
          {history?.map((h, i) => (
            <div
              key={i}
              className="border rounded p-2 mb-2 d-flex justify-content-between"
            >
              <div>
                <strong>
                  {h.planType?.toUpperCase() || ("Plan" + " " + h?.version)}
                </strong>{" "}
                - {h.planStartDate}
                <br />
                <small className="text-muted">
                  {new Date(h.createdAt).toLocaleDateString()}
                </small>
              </div>

              <button
                className="btn btn-sm btn-outline-primary"
                onClick={() => onCopy(h)}
              >
                Copy
              </button>
            </div>
          ))}
        </TabPane>

        <TabPane tab="Another Member" key="member">
          <select
            className="form-select mb-3"
            value={selectedMember}
            onChange={(e) => setSelectedMember(e.target.value)}
          >
            <option value="">-- Select Member --</option>
            {members.map((m) => (
              <option key={m.fld_id} value={m.fld_id}>
                {m.fld_name}
              </option>
            ))}
          </select>

          {memberPlans?.map((p, i) => (
            <div
              key={i}
              className="border rounded p-2 mb-2 d-flex justify-content-between"
            >
              <div>
                <strong>
                  {p.planType?.toUpperCase() || "Plan" + " " + p?.version}
                </strong>{" "}
                – {p.planStartDate}
              </div>

              <button
                className="btn btn-sm btn-outline-primary"
                onClick={() => onCopy(p)}
              >
                Copy
              </button>
            </div>
          ))}

          {selectedMember && memberPlans.length === 0 && (
            <p className="text-muted">No plans found</p>
          )}
        </TabPane>
      </Tabs>
    </Modal>
  );
};

export default CopyWorkoutModal;
