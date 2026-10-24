import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
  Modal,
  Badge,
} from "react-bootstrap";
import { notification, Table, Timeline } from "antd";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import Hero from "../../Components/Hero/Hero.js";
import GetApiCall from "../../helpers/GetApi.js";
import PostApiCall from "../../helpers/PostApi.js";
import { FaBell, FaBellSlash } from "react-icons/fa";

function EnquiryList() {
  const navigate = useNavigate();
  const userData =
    localStorage.getItem("user") && JSON.parse(localStorage.getItem("user"));

  const branch = userData?.branch_id || userData?.fld_branch_id;
  const userRole = String(userData?.role || "").toUpperCase();
  const canViewAllBranches = userRole === "SUPER ADMIN";
  const [staff, setStaff] = useState([]);
  const [branches, setBranches] = useState([]);
  const [branchFilter, setBranchFilter] = useState(
    canViewAllBranches ? "" : String(branch || ""),
  );
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    showSizeChanger: true,
  });
  const [memberList, setMemberList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [searchField, setSearchField] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [assigneeFilter, setAssigneeFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [sourceFilter, setSourceFilter] = useState("");
  const [followupFilter, setFollowupFilter] = useState("");
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [followupLead, setFollowupLead] = useState(null);
  const [followupNote, setFollowupNote] = useState("");
  const [followupStatus, setFollowupStatus] = useState("");
  const [followupDate, setFollowupDate] = useState("");
  const [dueLeadIds, setDueLeadIds] = useState([]);
  const normalizeList = (data) =>
    Array.isArray(data) ? data : data?.data || data?.branches || [];
  const getBranchId = (item) =>
    item?.fld_branch_id || item?.branch_id || item?.branchId || item?.id || "";
  const getBranchName = (id) => {
    const item = branches.find(
      (branchItem) => String(getBranchId(branchItem)) === String(id),
    );
    return (
      item?.fld_branch_name ||
      item?.branch_name ||
      item?.name ||
      item?.location ||
      id ||
      "-"
    );
  };
  const getNextFollowupDate = (lead) =>
    lead?.fld_next_followup_at || lead?.next_followup_at || "";
  const isClosedLead = (lead) =>
    ["won", "lost", "converted", "closed"].includes(
      String(lead?.fld_status || "").toLowerCase(),
    );
  const normalizeStatusForApi = (status) => {
    const value = String(status || "new").toLowerCase();
    if (["new", "pending", "open"].includes(value)) return "new";
    if (["contacted", "follow up", "follow-up", "followup"].includes(value))
      return "contacted";
    if (["won", "converted"].includes(value)) return "converted";
    if (["lost", "closed"].includes(value)) return "closed";
    return "new";
  };
  const getStatusLabel = (status) =>
    ({
      new: "New",
      pending: "New",
      contacted: "Contacted",
      "follow up": "Contacted",
      "follow-up": "Contacted",
      converted: "Won",
      won: "Won",
      closed: "Lost",
      lost: "Lost",
    })[String(status || "new").toLowerCase()] || status;

  const [formData, setFormData] = useState({
    id: null,
    fld_name: "",
    fld_phone: "",
    fld_email: "",
    fld_type: "",
    fld_source: "Walk In",
    fld_message: "",
    fld_branch_id: branch,
    fld_client_rep: null,
    fld_gender: "",
  });

  // ---------------------------
  // FETCH ENQUIRIES
  // ---------------------------
  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      const res = await GetApiCall.getRequest("GetEnquiries?limit=1000");
      const data = await res.json();
      if (res.status === 200 || res.status === 201) {
        const list = normalizeList(data);
        setMemberList(list);
        setFilteredList(list);
      }
    } catch (err) {
      notification.error({ message: "Failed to load enquiries" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  // Apply search and filters together so no selection overrides another.
  useEffect(() => {
    const search = searchField.trim().toLowerCase();
    const today = moment().startOf("day");
    setFilteredList(
      memberList.filter((item) => {
        const itemBranch = item.fld_branch_id || item.branch_id;
        if (branchFilter && String(itemBranch) !== String(branchFilter))
          return false;
        const searchable = [
          item.fld_name,
          item.fld_phone,
          item.fld_email,
          item.fld_membership,
          item.repname,
        ].some((value) =>
          String(value || "")
            .toLowerCase()
            .includes(search),
        );
        if (search && !searchable) return false;

        const status = normalizeStatusForApi(item.fld_status);
        const statusMatches =
          !statusFilter ||
          (statusFilter === "open"
            ? status === "new"
            : statusFilter === "follow-up"
              ? status === "contacted"
              : statusFilter === "won"
                ? status === "converted"
                : status === "closed");
        if (!statusMatches) return false;

        const assignedTo = item.fld_client_rep || item.client_rep || "";
        if (assigneeFilter === "unassigned" && assignedTo) return false;
        if (
          assigneeFilter &&
          assigneeFilter !== "unassigned" &&
          String(assignedTo) !== String(assigneeFilter)
        )
          return false;
        if (
          typeFilter &&
          String(item.fld_type || "").toLowerCase() !== typeFilter.toLowerCase()
        )
          return false;
        if (
          sourceFilter &&
          String(item.fld_source || "").toLowerCase() !==
            sourceFilter.toLowerCase()
        )
          return false;

        if (followupFilter) {
          const dueAt = getNextFollowupDate(item);
          const dueDay =
            dueAt && moment(dueAt).isValid()
              ? moment(dueAt).startOf("day")
              : null;
          if (followupFilter === "unscheduled" && dueDay) return false;
          if (
            followupFilter === "overdue" &&
            (!dueDay || !dueDay.isBefore(today) || isClosedLead(item))
          )
            return false;
          if (
            followupFilter === "today" &&
            (!dueDay || !dueDay.isSame(today) || isClosedLead(item))
          )
            return false;
          if (
            followupFilter === "upcoming" &&
            (!dueDay || !dueDay.isAfter(today) || isClosedLead(item))
          )
            return false;
        }
        return true;
      }),
    );
  }, [
    searchField,
    memberList,
    branchFilter,
    statusFilter,
    assigneeFilter,
    typeFilter,
    sourceFilter,
    followupFilter,
  ]);
  const loadStaff = () => {
    GetApiCall.getRequest("staff")
      .then((res) => res.json().then((data) => setStaff(data.data || [])))
      .catch(() => setStaff([]));
  };

  useEffect(() => {
    loadStaff();
    GetApiCall.getRequest("GetBranches")
      .then((res) => res.json())
      .then((data) => setBranches(normalizeList(data)))
      .catch(() => {});
  }, []);

  const getTrail = (lead) => {
    const trail = lead?.fld_followup_trail || lead?.followup_trail || [];
    if (Array.isArray(trail)) return trail;
    try {
      return JSON.parse(trail);
    } catch (error) {
      return [];
    }
  };

  const getAssignmentHistory = (lead) => {
    const history = lead?.fld_assignment_history || [];
    if (Array.isArray(history)) return history;
    try {
      const parsed = JSON.parse(history);
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      return [];
    }
  };

  const getRepName = (repId, savedName) =>
    savedName ||
    staff.find((person) => String(person.id) === String(repId))?.name ||
    (repId ? `Rep #${repId}` : "Unassigned");

  useEffect(() => {
    const checkReminders = () => {
      const today = moment().format("YYYY-MM-DD");
      const due = memberList.filter((lead) => {
        const dueDate = getNextFollowupDate(lead);
        return (
          !isClosedLead(lead) &&
          dueDate &&
          moment(dueDate).isValid() &&
          moment(dueDate).isSameOrBefore(today, "day") &&
          (!branchFilter ||
            String(lead.fld_branch_id || lead.branch_id) ===
              String(branchFilter))
        );
      });
      setDueLeadIds(due.map((lead) => String(lead.id || lead.fld_id)));
      if (!due.length) return;
      const reminderKey = `lead-reminders-${today}-${due
        .map((lead) => lead.id || lead.fld_id)
        .sort()
        .join(",")}`;
      if (sessionStorage.getItem(reminderKey)) return;
      sessionStorage.setItem(reminderKey, "shown");
      notification.info({
        message: `${due.length} lead${due.length === 1 ? "" : "s"} due for follow-up today`,
        description: due
          .slice(0, 3)
          .map((lead) => lead.fld_name)
          .join(", "),
        duration: 8,
      });
      if ("Notification" in window && Notification.permission === "granted") {
        new Notification("Train High lead follow-ups", {
          body: `${due.length} lead${due.length === 1 ? " is" : "s are"} due for follow-up today.`,
        });
      }
    };
    checkReminders();
    const timer = setInterval(checkReminders, 60000);
    return () => clearInterval(timer);
  }, [memberList, branchFilter]);

  // const enableBrowserReminders = async () => {
  //   if (!("Notification" in window)) return notification.warning({ message: "Browser notifications are not available here" });
  //   const permission = await Notification.requestPermission();
  //   if (permission === "granted") notification.success({ message: "Browser reminders enabled" });
  //   else notification.info({ message: "Browser notifications were not enabled" });
  // };

  const saveLeadUpdate = async (lead, updates) => {
    const payload = {
      ...lead,
      ...updates,
      fld_id: lead.fld_id || lead.id,
      fld_status: normalizeStatusForApi(updates.fld_status || lead.fld_status),
    };
    const res = await PostApiCall.postRequest(payload, "UpdateEnquiries");
    if (res.status !== 200 && res.status !== 201)
      throw new Error("Unable to update enquiry");
    await fetchEnquiries();
  };

  const saveFollowup = async () => {
    if (!followupNote.trim() && !followupDate && !followupStatus)
      return notification.warning({
        message: "Add a note, status, or next follow-up date",
      });
    try {
      setLoading(true);
      const trail = getTrail(followupLead);
      const nextStatus = normalizeStatusForApi(
        followupStatus || followupLead.fld_status,
      );
      trail.push({
        note:
          followupNote.trim() ||
          (followupDate ? "Follow-up scheduled" : "Status updated"),
        status: nextStatus,
        next_followup_at: followupDate || null,
        date: new Date().toISOString(),
        by: userData?.name || userData?.full_name || "Team",
      });
      await saveLeadUpdate(followupLead, {
        fld_followup_trail: JSON.stringify(trail),
        fld_next_followup_at: followupDate || null,
        fld_status: nextStatus,
      });
      setFollowupLead(null);
      setFollowupNote("");
      setFollowupStatus("");
      setFollowupDate("");
      notification.success({ message: "Follow-up saved" });
    } catch (error) {
      notification.error({ message: "Could not save follow-up" });
    } finally {
      setLoading(false);
    }
  };

  // ---------------------------
  // HANDLE FORM CHANGE
  // ---------------------------
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ---------------------------
  // SAVE / UPDATE
  // ---------------------------
  const handleSaveEnquiry = async () => {
    try {
      if (!formData.fld_name || !formData.fld_phone) {
        notification.warning({
          message: "Name and Mobile Number are required",
        });
        return;
      }

      setLoading(true);

      const payload = {
        ...formData,
        fld_id: formData.fld_id || (isEdit ? formData.id : undefined),
        fld_status: normalizeStatusForApi(formData.fld_status || "new"),
      };
      delete payload.id;
      const res = await PostApiCall.postRequest(payload, "UpdateEnquiries");

      if (res.status === 200 || res.status === 201) {
        notification.success({
          message: isEdit
            ? "Enquiry Updated Successfully"
            : "Enquiry Added Successfully",
        });

        setShowModal(false);
        setIsEdit(false);
        resetForm();
        fetchEnquiries();
      } else {
        notification.error({ message: "Something went wrong" });
      }
    } catch (err) {
      notification.error({ message: "Server error" });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      id: null,
      fld_name: "",
      fld_phone: "",
      fld_email: "",
      fld_type: "",
      fld_source: "Walk In",
      fld_message: "",
      fld_branch_id: branch,
      fld_client_rep: null,
      fld_gender: "",
    });
  };

  // ---------------------------
  // TABLE COLUMNS
  // ---------------------------
  const columns = [
    {
      title: "S No.",
      dataIndex: "SNo",
      width: 80,
    },
    {
      title: "Name",
      dataIndex: "MemberName",
      sorter: (a, b) => a.MemberName.localeCompare(b.MemberName),
    },
    {
      title: "Mobile",
      dataIndex: "MobileNo",
      sorter: (a, b) => String(a.MobileNo).localeCompare(String(b.MobileNo)),
    },
    { title: "Branch", dataIndex: "Branch" },
    // { title: "Next Follow-up", dataIndex: "NextFollowUp" },
    {
      title: "Date",
      dataIndex: "StartDate",
      sorter: (a, b) =>
        moment(a.StartDate).valueOf() - moment(b.StartDate).valueOf(),
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Source",
      dataIndex: "source",
    },
    {
      title: "Client Rep",
      dataIndex: "clientrep",
    },
    {
      title: "Gender",
      dataIndex: "gender",
    },
    {
      title: "Status",
      dataIndex: "Status",
      render: (status) => (
        <Badge
          bg={
            status === "Won"
              ? "success"
              : status === "Lost"
                ? "danger"
                : status === "Contacted"
                  ? "primary"
                  : "warning"
          }
        >
          {status}
        </Badge>
      ),
    },
    {
      title: "Actions",
      render: (_, record) => (
        <>
          <div className="d-flex align-items-center justify-content-start">
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle btn-sm"
                type="button"
                // id={`member-actions-${member.fld_id}`}
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Manage
              </button>
              <ul
                className="dropdown-menu"
                // aria-labelledby={`member-actions-${member.fld_id}`}
              >
                <li>
                  <Link
                    className="dropdown-item"
                    onClick={() => {
                      setFollowupLead(record.originalData);
                      setFollowupNote("");
                      setFollowupStatus("");
                      setFollowupDate(
                        getNextFollowupDate(record.originalData)
                          ? moment(
                              getNextFollowupDate(record.originalData),
                            ).format("YYYY-MM-DD")
                          : "",
                      );
                    }}
                  >
                    Follow up
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item"
                    onClick={() => {
                      setFormData(record.originalData);
                      setIsEdit(true);
                      setShowModal(true);
                    }}
                  >
                    Edit
                  </Link>
                </li>
                <li>
                  <Link
                    className={`dropdown-item ${
                      record.originalData.fld_is_converted === 1 ||
                      normalizeStatusForApi(record.originalData.fld_status) ===
                        "converted"
                        ? "disabled"
                        : ""
                    }`}
                    to="/new-membership"
                    onClick={(e) => {
                      if (
                        record.originalData.fld_is_converted === 1 ||
                        normalizeStatusForApi(
                          record.originalData.fld_status,
                        ) === "converted"
                      ) {
                        e.preventDefault();
                      }
                    }}
                    aria-disabled={
                      record.originalData.fld_is_converted === 1 ||
                      normalizeStatusForApi(record.originalData.fld_status) ===
                        "converted"
                    }
                    tabIndex={
                      record.originalData.fld_is_converted === 1 ||
                      normalizeStatusForApi(record.originalData.fld_status) ===
                        "converted"
                        ? -1
                        : 0
                    }
                  >
                    Convert
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* <div className="d-flex gap-2">
            <Button size="sm" variant="outline-primary" onClick={() => { setFollowupLead(record.originalData); setFollowupNote(""); setFollowupStatus(""); setFollowupDate(getNextFollowupDate(record.originalData) ? moment(getNextFollowupDate(record.originalData)).format("YYYY-MM-DD") : ""); }}>Follow up</Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => {
                setFormData(record.originalData);
                setIsEdit(true);
                setShowModal(true);
              }}
            >
              Edit
            </Button>

            <Button
              size="sm"
              variant="success"
              onClick={() =>
                navigate("/new-membership", {
                  state: {
                    type: "convert",
                    enquiryData: record.originalData,
                  },
                })
              }
              disabled={record.originalData.fld_is_converted === 1 || normalizeStatusForApi(record.originalData.fld_status) === "converted"}
            >
              Convert
            </Button>
          </div> */}
        </>
      ),
    },
  ];

  const sortedFilteredList = filteredList.slice().sort((a, b) => {
    // 1. Latest created date first (default sorting)
    const aCreated = moment(a.fld_created_at).valueOf();
    const bCreated = moment(b.fld_created_at).valueOf();

    if (aCreated !== bCreated) {
      return bCreated - aCreated;
    }

    // 2. Keep closed leads at the bottom
    const aClosed = isClosedLead(a);
    const bClosed = isClosedLead(b);

    if (aClosed !== bClosed) {
      return aClosed ? 1 : -1;
    }

    // 3. Leads with follow-up dates first
    const aDate = getNextFollowupDate(a);
    const bDate = getNextFollowupDate(b);

    if (aDate && !bDate) return -1;
    if (!aDate && bDate) return 1;

    // 4. Sort follow-up dates ascending
    if (aDate && bDate) {
      return moment(aDate).valueOf() - moment(bDate).valueOf();
    }

    return 0;
  });

  const rows = sortedFilteredList.map((data, i) => ({
    key: data.id || i,
    SNo: i + 1,
    MemberName: data.fld_name,
    MobileNo: data.fld_phone,
    StartDate: moment(data.fld_created_at).format("ll"),
    type: data.fld_type,
    source: data.fld_source,
    Branch: getBranchName(data.fld_branch_id || data.branch_id),
    NextFollowUp: getNextFollowupDate(data)
      ? `${moment(getNextFollowupDate(data)).format("ll")}${dueLeadIds.includes(String(data.id || data.fld_id)) ? " · DUE" : ""}`
      : "Not scheduled",
    Status: getStatusLabel(data.fld_status),
    originalData: data,
    gender: data?.fld_gender,
    clientrep: data?.repname,
  }));
  const visibleStaff = staff.filter(
    (person) =>
      !branchFilter ||
      String(person.fld_branch_id || person.branch_id) === String(branchFilter),
  );
  const sources = [
    ...new Set(memberList.map((item) => item.fld_source).filter(Boolean)),
  ];
  const filteredDueLeads = filteredList.filter((lead) => {
    const dueDate = getNextFollowupDate(lead);
    return (
      !isClosedLead(lead) &&
      dueDate &&
      moment(dueDate).isValid() &&
      moment(dueDate).isSameOrBefore(moment(), "day")
    );
  });
  const hasActiveFilters = Boolean(
    searchField ||
    (canViewAllBranches && branchFilter) ||
    statusFilter ||
    assigneeFilter ||
    typeFilter ||
    sourceFilter ||
    followupFilter,
  );

  const [remindersEnabled, setRemindersEnabled] = useState(false);

  const toggleBrowserReminders = async () => {
    if (!("Notification" in window)) {
      notification.warning({
        message: "Browser notifications are not available",
      });
      return;
    }

    if (remindersEnabled) {
      setRemindersEnabled(false);
      notification.info({
        message: "Browser notifications disabled",
      });
      return;
    }

    try {
      let permission = Notification.permission;

      if (permission === "default") {
        permission = await Notification.requestPermission();
      }

      if (permission === "granted") {
        setRemindersEnabled(true);
        notification.success({
          message: "Browser notifications enabled",
        });
      } else {
        setRemindersEnabled(false);
        notification.info({
          message: "Browser notifications disabled",
          // description: "Allow notifications in your browser settings to enable reminders.",
        });
      }
    } catch {
      notification.error({
        message: "Failed to set browser notifications",
      });
    }
  };

  return (
    <>
      <section className="pb-5 inner-section">
        <Container>
          <Row className="justify-content-center mb-3">
            <Col lg={9}>
              <h2 className="section-title">Enquiries</h2>
              <p className="text-muted text-center">
                Track and manage prospective member enquiries, interactions, and
                follow-ups
              </p>
            </Col>
          </Row>
          <Row>
            {canViewAllBranches && (
              <Col lg={3} className="mb-3">
                <FloatingLabel label="Filter by branch">
                  <Form.Select
                    value={branchFilter}
                    onChange={(e) => setBranchFilter(e.target.value)}
                  >
                    <option value="">All branches</option>
                    {branches.map((item) => (
                      <option key={getBranchId(item)} value={getBranchId(item)}>
                        {item.fld_branch_name ||
                          item.branch_name ||
                          item.name ||
                          item.location}
                      </option>
                    ))}
                  </Form.Select>
                </FloatingLabel>
              </Col>
            )}
            <Col lg={7} className="mb-3">
              <div className="d-flex align-items-center gap-2">
                <FloatingLabel
                  label="Search by Name, Mobile or Membership"
                  className="flex-grow-1"
                >
                  <Form.Control
                    type="text"
                    value={searchField}
                    onChange={(e) => setSearchField(e.target.value)}
                    placeholder="Search by Name, Mobile or Membership"
                  />
                </FloatingLabel>

                <Button
                  variant={remindersEnabled ? "success" : "dark"}
                  className="d-flex align-items-center justify-content-center"
                  style={{ height: "58px", minWidth: "58px" }}
                  onClick={toggleBrowserReminders}
                  title={
                    remindersEnabled ? "Disable reminders" : "Enable reminders"
                  }
                  aria-label={
                    remindersEnabled ? "Disable reminders" : "Enable reminders"
                  }
                >
                  {remindersEnabled ? (
                    <FaBell size={20} />
                  ) : (
                    <FaBellSlash size={20} />
                  )}
                </Button>
              </div>
            </Col>
            <Col lg={2} className="mb-3 text-end">
              <Button
                variant="dark"
                onClick={() => {
                  resetForm();
                  setIsEdit(false);
                  setShowModal(true);
                }}
                className="w-100 h-100"
              >
                + Add New
              </Button>
            </Col>
            <Col xs={12} sm={6} md={4} lg={2} className="mb-3">
              <FloatingLabel label="Status">
                <Form.Select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="">All statuses</option>
                  <option value="open">Open</option>
                  <option value="follow-up">Follow-up</option>
                  <option value="won">Won</option>
                  <option value="lost">Lost</option>
                </Form.Select>
              </FloatingLabel>
            </Col>
            <Col xs={12} sm={6} md={4} lg={2} className="mb-3">
              <FloatingLabel label="Assigned to">
                <Form.Select
                  value={assigneeFilter}
                  onChange={(e) => setAssigneeFilter(e.target.value)}
                >
                  <option value="">All assignees</option>
                  <option value="unassigned">Unassigned</option>
                  {visibleStaff.map((person) => (
                    <option key={person.id} value={person.id}>
                      {person.name}
                    </option>
                  ))}
                </Form.Select>
              </FloatingLabel>
            </Col>
            <Col xs={12} sm={6} md={4} lg={2} className="mb-3">
              <FloatingLabel label="Enquiry type">
                <Form.Select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                >
                  <option value="">All types</option>
                  <option value="Membership">Membership</option>
                  <option value="Franchise">Franchise</option>
                </Form.Select>
              </FloatingLabel>
            </Col>
            <Col xs={12} sm={6} md={4} lg={2} className="mb-3">
              <FloatingLabel label="Source">
                <Form.Select
                  value={sourceFilter}
                  onChange={(e) => setSourceFilter(e.target.value)}
                >
                  <option value="">All sources</option>
                  {sources.map((source) => (
                    <option key={source} value={source}>
                      {source}
                    </option>
                  ))}
                </Form.Select>
              </FloatingLabel>
            </Col>
            <Col xs={12} sm={6} md={4} lg={2} className="mb-3">
              <FloatingLabel label="Follow-up timing">
                <Form.Select
                  value={followupFilter}
                  onChange={(e) => setFollowupFilter(e.target.value)}
                >
                  <option value="">Any timing</option>
                  <option value="overdue">Overdue</option>
                  <option value="today">Due today</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="unscheduled">No date set</option>
                </Form.Select>
              </FloatingLabel>
            </Col>
            <Col xs={12} sm={6} md={4} lg={2} className="mb-3">
              <Button
                variant="dark"
                className="w-100 h-100"
                disabled={!hasActiveFilters}
                onClick={() => {
                  setSearchField("");
                  setBranchFilter(
                    canViewAllBranches ? "" : String(branch || ""),
                  );
                  setStatusFilter("");
                  setAssigneeFilter("");
                  setTypeFilter("");
                  setSourceFilter("");
                  setFollowupFilter("");
                }}
              >
                Clear filters
              </Button>
            </Col>
            {filteredDueLeads.length > 0 && (
              <Col lg={12} className="mb-3">
                <div className="alert alert-warning mb-0">
                  <strong>
                    {filteredDueLeads.length} follow-up
                    {filteredDueLeads.length === 1 ? "" : "s"} due today or
                    overdue.
                  </strong>{" "}
                  Due leads are listed first.
                </div>
              </Col>
            )}

            <Col lg={12}>
              <Table
                rowKey="key"
                columns={columns}
                dataSource={rows}
                loading={loading}
                bordered
                pagination={{
                  ...pagination,
                  total: rows.length,
                  pageSizeOptions: ["10", "20", "50", "100"],
                  showSizeChanger: true,
                  showTotal: (total) => `Total ${total} records`,
                  onChange: (page, pageSize) => {
                    setPagination({
                      current: page,
                      pageSize,
                      showSizeChanger: true,
                    });
                  },
                }}
                scroll={{ x: 1000, y: 1000 }}
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* MODAL */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{isEdit ? "Edit Enquiry" : "Add Enquiry"}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Row>
              <Col lg={6}>
                <FloatingLabel label="Name" className="mb-3">
                  <Form.Control
                    name="fld_name"
                    value={formData.fld_name}
                    onChange={handleChange}
                  />
                </FloatingLabel>
              </Col>
              <Col lg={6}>
                <FloatingLabel label="Mobile" className="mb-3">
                  <Form.Control
                    name="fld_phone"
                    value={formData.fld_phone}
                    maxLength={10}
                    onChange={handleChange}
                  />
                </FloatingLabel>
              </Col>
              <Col lg={12}>
                <FloatingLabel label="Email" className="mb-3">
                  <Form.Control
                    name="fld_email"
                    value={formData.fld_email}
                    onChange={handleChange}
                  />
                </FloatingLabel>
              </Col>
              <Col lg={6}>
                <FloatingLabel label="Source" className="mb-3">
                  <Form.Select
                    name="fld_source"
                    value={formData.fld_source}
                    onChange={handleChange}
                  >
                    <option value="">Select Source</option>
                    <option value="WalkIn">Walk In</option>
                    <option value="Online">Online</option>
                    <option value="website">website</option>
                  </Form.Select>
                </FloatingLabel>
              </Col>
              <Col lg={6}>
                <FloatingLabel label="Client Rep" className="mb-3">
                  <Form.Select
                    name="fld_client_rep"
                    value={formData.fld_client_rep}
                    onChange={handleChange}
                  >
                    <option value="">Select Staff</option>
                    {staff
                      ?.filter((person) => {
                        if (canViewAllBranches) return true;

                        return (
                          String(person.fld_branch_id || person.branch_id) ===
                          String(formData.fld_branch_id || branch)
                        );
                      })
                      .map((data) => {
                        return (
                          <option key={data.id} value={data.id}>
                            {data.name}
                          </option>
                        );
                      })}
                  </Form.Select>
                </FloatingLabel>
              </Col>
              <Col lg={6}>
                <FloatingLabel label="Gender" className="mb-3">
                  <Form.Select
                    name="fld_gender"
                    value={formData.fld_gender}
                    onChange={handleChange}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="FeMale">FeMale</option>
                    <option value="Others">Others</option>
                  </Form.Select>
                </FloatingLabel>
              </Col>
              <Col lg={6}>
                <FloatingLabel label="Type" className="mb-3">
                  <Form.Select
                    name="fld_type"
                    value={formData.fld_type}
                    onChange={handleChange}
                  >
                    <option value="">Select Type</option>
                    <option value="Franchise">Franchise</option>
                    <option value="Membership">Membership</option>
                  </Form.Select>
                </FloatingLabel>
              </Col>
              <Col lg={12}>
                <FloatingLabel label="Message">
                  <Form.Control
                    as="textarea"
                    style={{ height: 100 }}
                    name="fld_message"
                    value={formData.fld_message}
                    onChange={handleChange}
                  />
                </FloatingLabel>
              </Col>
            </Row>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="dark" onClick={handleSaveEnquiry}>
            {isEdit ? "Update" : "Save"}
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={!!followupLead}
        onHide={() => setFollowupLead(null)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Lead follow-up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6>
            {followupLead?.fld_name}{" "}
            <small className="text-muted">· {followupLead?.fld_phone}</small>
          </h6>
          <p className="text-muted small mb-3">
            {getBranchName(
              followupLead?.fld_branch_id || followupLead?.branch_id,
            )}{" "}
            · Assigned to{" "}
            {followupLead?.repname ||
              staff.find(
                (person) =>
                  String(person.id) === String(followupLead?.fld_client_rep),
              )?.name ||
              "Unassigned"}
          </p>
          <Form.Group className="mb-3">
            <Form.Label>Update status</Form.Label>
            <Form.Select
              value={followupStatus}
              onChange={(e) => setFollowupStatus(e.target.value)}
            >
              <option value="">Keep current status</option>
              <option value="new">New</option>
              <option value="contacted">Contacted / follow-up</option>
              <option value="converted">Won</option>
              <option value="closed">Lost</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Next follow-up date</Form.Label>
            <Form.Control
              type="date"
              min={moment().format("YYYY-MM-DD")}
              value={followupDate}
              onChange={(e) => setFollowupDate(e.target.value)}
            />
            <Form.Text muted>
              We’ll remind you when this lead is due. Clear the date if no
              follow-up is planned.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>Follow-up note</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={followupNote}
              onChange={(e) => setFollowupNote(e.target.value)}
              placeholder="Call summary, next step, or reason lost"
            />
          </Form.Group>
          <h6>Client rep assignment history</h6>
          {getAssignmentHistory(followupLead).length ? (
            <Timeline
              className="mb-4"
              items={getAssignmentHistory(followupLead)
                .slice()
                .reverse()
                .map((event) => ({
                  children: (
                    <>
                      <div>
                        <strong>
                          {getRepName(
                            event.client_rep_id,
                            event.client_rep_name,
                          )}
                        </strong>
                        {event.previous_client_rep_id !== undefined && (
                          <span>
                            {" "}
                            ·{" "}
                            {getRepName(
                              event.previous_client_rep_id,
                              event.previous_client_rep_name,
                            )}{" "}
                            →{" "}
                            {getRepName(
                              event.client_rep_id,
                              event.client_rep_name,
                            )}
                          </span>
                        )}
                      </div>
                      <small className="text-muted">
                        {moment(event.assigned_at).isValid()
                          ? moment(event.assigned_at).format(
                              "MMM D, YYYY h:mm A",
                            )
                          : "Assignment date unavailable"}
                        {event.assigned_by_user_id
                          ? ` · Assigned by user #${event.assigned_by_user_id}`
                          : ""}
                      </small>
                    </>
                  ),
                }))}
            />
          ) : (
            <p className="small text-muted">
              No assignment history returned by the API.
            </p>
          )}
          <h6>Follow-up trail</h6>
          {getTrail(followupLead).length ? (
            <Timeline
              items={getTrail(followupLead)
                .slice()
                .reverse()
                .map((item) => ({
                  children: (
                    <>
                      <strong>{getStatusLabel(item.status || "new")}</strong>
                      <div>{item.note}</div>
                      <small className="text-muted">
                        {item.by || "Team"} ·{" "}
                        {moment(item.date).format("MMM D, YYYY h:mm A")}
                      </small>
                    </>
                  ),
                }))}
            />
          ) : (
            <p className="small text-muted">No follow-ups recorded yet.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setFollowupLead(null)}>
            Cancel
          </Button>
          <Button variant="dark" disabled={loading} onClick={saveFollowup}>
            Save update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EnquiryList;
