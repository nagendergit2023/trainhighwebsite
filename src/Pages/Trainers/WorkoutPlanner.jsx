import { useEffect, useState } from "react";
import PostApiCall from "../../helpers/PostApi";
import GetApiCall from "../../helpers/GetApi";
import { notification } from "antd";

import WorkoutEditor, { WEEK_TEMPLATE } from "./WorkoutEditor";
import CopyWorkoutModal from "./CopyWorkoutModal";
import TemplateLibrary from "./TemplateLibrary";

const WorkoutPlanner = ({ selectedMemberId }) => {
  const [days, setDays] = useState(WEEK_TEMPLATE);
  const [trainerComment, setTrainerComment] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentPlanId, setCurrentPlanId] = useState(null);

  const [planType, setPlanType] = useState("week");
  const [planStartDate, setPlanStartDate] = useState("");

  const [history, setHistory] = useState([]);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);

  useEffect(() => {
    if (!selectedMemberId || !planStartDate) return;

    GetApiCall.getRequest(
      `GetWorkoutPlanByMember/${selectedMemberId}?type=${planType}&date=${planStartDate}`
    )
      .then((res) => (res.status === 204 ? null : res.json()))
      .then((data) => {
        if (data) {
          setCurrentPlanId(data.planId);
          setDays(mergeWithWeekTemplate(data.days));
          setTrainerComment(data.trainerComment || "");
          setIsEditMode(true);
        } else {
          setCurrentPlanId(null);
          setDays(WEEK_TEMPLATE);
          setTrainerComment("");
          setIsEditMode(false);
        }
      });
  }, [selectedMemberId, planType, planStartDate]);

  /* LOAD HISTORY */
  useEffect(() => {
    if (!selectedMemberId) return;

    GetApiCall.getRequest(`GetWorkoutPlanByMember/${selectedMemberId}`)
      .then((res) => res?.json())
      .then((data) => {
        console.log(data, "console data");
        setDays(mergeWithWeekTemplate(data?.days));
      });
  }, [selectedMemberId]);

  useEffect(() => {
    GetWorkoutPlanHistory();
  }, []);
  const GetWorkoutPlanHistory = () => {
    GetApiCall.getRequest(`GetWorkoutPlanHistory/${selectedMemberId}`)
      .then((res) => res?.json())
      .then((data) => {
        setHistory(data);
      });
  };

  console.log(history);

  /* SUBMIT */
  const submit = () => {
    PostApiCall.postRequest(
      {
        memberId: selectedMemberId,
        planType,
        planStartDate,
        days,
        trainerComment,
        mode: isEditMode ? "overwrite" : "new",
        planId: currentPlanId,
      },
      "SaveWorkoutPlan"
    ).then(() => {
      notification.success({
        description: isEditMode
          ? "Workout plan updated"
          : "Workout plan created",
      });
    });
  };

  /* COPY */
  const copyFromHistory = (plan) => {
    setDays(plan.days);
    setTrainerComment(plan.trainerComment || "");
    setCurrentPlanId(plan.planId);
    setShowHistoryModal(false);
    notification.success({ description: "Plan copied successfully" });
  };

  const copyFromTemplate = (template) => {
    setDays(template.days);
    setTrainerComment(template.comment || "");
    setShowTemplateModal(false);
  };
  const createNewPlan = () => {
    setDays(WEEK_TEMPLATE);
    setTrainerComment("");
    setPlanStartDate("");
    setIsEditMode(false);
  };
  const mergeWithWeekTemplate = (apiDays = []) => {
    return WEEK_TEMPLATE.map((templateDay) => {
      const apiDay = apiDays.find((d) => d.weekday === templateDay.weekday);

      return apiDay
        ? {
            ...templateDay,
            ...apiDay,
            exercises: apiDay.exercises || [],
          }
        : { ...templateDay };
    });
  };

  return (
    <div className="container-fluid px-4 mt-3">
      {/* PLAN META */}
      <div className="card p-3 shadow-sm mb-3">
        <div className="row g-3">
          <div className="col-md-4">
            <label className="fw-bold">Plan Type</label>
            <select
              className="form-select"
              value={planType}
              onChange={(e) => setPlanType(e.target.value)}
            >
              <option value="week">Weekly</option>
              <option value="month">Monthly</option>
            </select>
          </div>

          <div className="col-md-4">
            <label className="fw-bold">
              {planType === "week" ? "Week Start" : "Month"}
            </label>
            <input
              type={planType === "week" ? "date" : "month"}
              className="form-control"
              value={planStartDate}
              onChange={(e) => setPlanStartDate(e.target.value)}
            />
          </div>

          <div className="col-md-4 d-flex align-items-end gap-2">
            <button
              className="btn btn-outline-warning w-100"
              onClick={createNewPlan}
            >
              ➕ New Plan
            </button>

            <button
              className="btn btn-outline-secondary w-100"
              onClick={() => setShowHistoryModal(true)}
            >
              🔁 Copy Plan
            </button>

            <button
              className="btn btn-outline-secondary w-100"
              onClick={() => setShowTemplateModal(true)}
            >
              📚 Templates
            </button>
          </div>
        </div>
      </div>

      {/* WORKOUT EDITOR */}
      <WorkoutEditor
        days={days}
        setDays={setDays}
        trainerComment={trainerComment}
        setTrainerComment={setTrainerComment}
      />

      {/* SAVE */}
      <div className="sticky-bottom bg-white pt-3">
        <button className="btn btn-warning w-100 fw-bold py-2" onClick={submit}>
          {isEditMode ? "Update Workout Plan" : "Create Workout Plan"}
        </button>
      </div>

      {/* MODALS */}
      <CopyWorkoutModal
        open={showHistoryModal}
        history={history}
        onCopy={copyFromHistory}
        onClose={() => setShowHistoryModal(false)}
      />

      <TemplateLibrary
        open={showTemplateModal}
        onApply={copyFromTemplate}
        onClose={() => setShowTemplateModal(false)}
      />
    </div>
  );
};

export default WorkoutPlanner;
