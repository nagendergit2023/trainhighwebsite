import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Modal,
  Row,
} from "react-bootstrap";
import { notification, Table, Tag } from "antd";
import GetApiCall from "../../helpers/GetApi";
import PostApiCall from "../../helpers/PostApi";

const emptyForm = {
  id: "",
  name: "",
  mobile: "",
  email: "",
  role: "",
  status: "Active",
  fld_branch_id: "",
};

function StaffList() {
  const userData =
    localStorage.getItem("user") && JSON.parse(localStorage.getItem("user"));
  const userRole = String(userData?.role || "").toUpperCase();
  const userBranchId = userData?.branch_id || userData?.fld_branch_id || "";
  const canViewStaff = userRole === "SUPER ADMIN" || userRole === "ADMIN";
  const canViewAllBranches = userRole === "SUPER ADMIN";

  const [staff, setStaff] = useState([]);
  const [branches, setBranches] = useState([]);
  const [machines, setMachines] = useState([]);
  const [show, setShow] = useState(false);
  const [showBiometric, setShowBiometric] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [selectedDevice, setSelectedDevice] = useState("");
  const [formData, setFormData] = useState({
    ...emptyForm,
    fld_branch_id: userBranchId,
  });

  const normalizeBranchId = (item) =>
    item?.fld_branch_id || item?.branch_id || item?.branchId || "";

  const getBranchOptionId = useCallback(
    (item) => normalizeBranchId(item) || item?.id || "",
    [],
  );

  const getBranchName = useCallback(
    (branchId) => {
      const branch = branches.find(
        (item) => String(getBranchOptionId(item)) === String(branchId),
      );
      return (
        branch?.fld_branch_name ||
        branch?.branch_name ||
        branch?.name ||
        branch?.location ||
        branchId ||
        "-"
      );
    },
    [branches, getBranchOptionId],
  );

  const normalizeList = (data) => {
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.data)) return data.data;
    if (Array.isArray(data?.branches)) return data.branches;
    if (Array.isArray(data?.result)) return data.result;
    return [];
  };

  const filterStaffByAccess = useCallback(
    (list) => {
      if (canViewAllBranches) return list;
      return list.filter(
        (item) => String(normalizeBranchId(item)) === String(userBranchId),
      );
    },
    [canViewAllBranches, userBranchId],
  );

  const filterByBranchAccess = useCallback(
    (list) => {
      if (canViewAllBranches) return list;
      return list.filter(
        (item) => String(normalizeBranchId(item)) === String(userBranchId),
      );
    },
    [canViewAllBranches, userBranchId],
  );

  const loadStaff = useCallback(() => {
    if (!canViewStaff) return;

    GetApiCall.getRequest("staff").then((res) =>
      res.json().then((data) => setStaff(filterStaffByAccess(data.data || []))),
    );
  }, [canViewStaff, filterStaffByAccess]);

  const loadBranches = useCallback(async () => {
    if (!canViewStaff) return;

    try {
      const res = await GetApiCall.getRequest("GetBranches");
      if (res.status === 200 || res.status === 201) {
        const data = await res.json();
        const list = normalizeList(data);
        if (list.length) {
          setBranches(filterByBranchAccess(list));
          return;
        }
      }
    } catch (err) {}

    if (userBranchId) {
      setBranches([
        {
          branch_id: userBranchId,
          branch_name: userData?.branch_name || userBranchId,
        },
      ]);
    }
  }, [canViewStaff, filterByBranchAccess, userBranchId, userData?.branch_name]);

  const loadMachines = useCallback(() => {
    if (!canViewStaff) return;

    GetApiCall.getRequest("Machines/GetMachines").then((res) =>
      res.json().then((data) => setMachines(filterByBranchAccess(data || []))),
    );
  }, [canViewStaff, filterByBranchAccess]);

  useEffect(() => {
    loadStaff();
    loadBranches();
    loadMachines();
  }, [loadBranches, loadMachines, loadStaff]);

  const resetForm = () => {
    setFormData({
      ...emptyForm,
      fld_branch_id: userBranchId,
    });
  };

  const openAddModal = () => {
    resetForm();
    setShow(true);
  };

  const openEditModal = (record) => {
    setFormData({
      ...record,
      fld_branch_id: normalizeBranchId(record) || userBranchId,
    });
    setShow(true);
  };

  const openBiometricModal = (record) => {
    setSelectedStaff(record);
    setSelectedDevice(record.biometric_device_sn || record.deviceSn || "");
    setShowBiometric(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const branchId = canViewAllBranches ? formData.fld_branch_id : userBranchId;
    const payload = {
      ...formData,
      fld_branch_id: branchId,
      branch_id: branchId,
    };

    PostApiCall.postRequest(payload, "staff").then(() => {
      setShow(false);
      resetForm();
      loadStaff();
      notification.success({
        message: "Staff Details Updated Successfully",
        description: "",
      });
    });
  };

  const assignBiometric = async () => {
    if (!selectedStaff?.id) {
      notification.error({ message: "Please select staff" });
      return;
    }

    if (!selectedDevice) {
      notification.error({ message: "Please select biometric machine" });
      return;
    }

    const payload = {
      staffId: selectedStaff.id,
      userId: selectedStaff.id,
      userType: "STAFF",
      deviceSn: selectedDevice,
      biometric_device_sn: selectedDevice,
      branch_id: normalizeBranchId(selectedStaff),
    };

    let res = await PostApiCall.postRequest(payload, "biometric/assign-user");

    if (res.status === 200 || res.status === 201) {
      notification.success({ message: "Biometric Device Assigned" });
      setShowBiometric(false);
      loadStaff();
    } else {
      notification.error({ message: "Unable to assign biometric device" });
    }
  };

  const branchOptions = useMemo(() => {
    if (branches.length) return branches;
    if (userBranchId)
      return [{ branch_id: userBranchId, branch_name: userBranchId }];
    return [];
  }, [branches, userBranchId]);

  const availableMachines = useMemo(() => {
    const branchId = selectedStaff
      ? normalizeBranchId(selectedStaff)
      : formData.fld_branch_id;
    if (!branchId || canViewAllBranches) return machines;
    return machines.filter(
      (machine) => String(normalizeBranchId(machine)) === String(branchId),
    );
  }, [canViewAllBranches, formData.fld_branch_id, machines, selectedStaff]);

  const columns = [
    { title: "S No.", render: (_, __, i) => i + 1 },
    { title: "Code", dataIndex: "staff_code" },
    { title: "Name", dataIndex: "name" },
    { title: "Mobile", dataIndex: "mobile" },
    { title: "Email", dataIndex: "email" },
    { title: "Role", dataIndex: "role" },
    {
      title: "Branch",
      render: (record) => getBranchName(normalizeBranchId(record)),
    },
    {
      title: "Biometric",
      render: (record) => {
        const machineName = record.biometric_name || record.machine_name;
        const status = record.biometric_status;
        const device = record.biometric_device_sn || record.deviceSn;

        if (!machineName && !status && !device) return <Tag>Not Linked</Tag>;

        return (
          <Tag
            color={
              status === "ACTIVE" || status === "PENDING_ENROLLMENT"
                ? "green"
                : "gold"
            }
          >
            {machineName || device || status}
          </Tag>
        );
      },
    },
    { title: "Status", dataIndex: "status" },
    {
      title: "Action",
      render: (record) => (
        <div className="d-flex gap-2">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => openEditModal(record)}
          >
            Edit
          </Button>
          <Button
            size="sm"
            variant="outline-secondary"
            onClick={() => openBiometricModal(record)}
          >
            Biometric
          </Button>
        </div>
      ),
    },
  ];

  if (!canViewStaff) {
    return (
      <section className="pb-5 inner-section">
        <Container>
          <Row className="justify-content-center">
            <Col lg={7} className="text-center">
              <h2 className="section-title">Access Restricted</h2>
              <p className="text-muted mb-0">
                You do not have permission to view or manage staff records.
              </p>
            </Col>
          </Row>
        </Container>
      </section>
    );
  }

  return (
    <>
      <section className="pb-5 inner-section">
        <Container>
          <Row className="justify-content-center mb-3">
            <Col lg={9}>
              <h2 className="section-title">My Staff</h2>
            </Col>
          </Row>
          <Row>
            <Col lg={8} className="mb-3">
              <p className="text-muted mb-0">
                {canViewAllBranches
                  ? "Showing staff from all branches."
                  : `Showing staff from ${getBranchName(userBranchId)}.`}
              </p>
            </Col>
            <Col lg={4} className="mb-3 text-end">
              <Button variant="secondary" onClick={openAddModal}>
                Add Staff
              </Button>
            </Col>

            <Col lg={12}>
              <Table columns={columns} dataSource={staff} rowKey="id" />
            </Col>
          </Row>
        </Container>
      </section>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{formData.id ? "Edit Staff" : "Add Staff"}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <FloatingLabel label="Name" className="mb-3">
            <Form.Control
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
            />
          </FloatingLabel>

          <FloatingLabel label="Mobile" className="mb-3">
            <Form.Control
              name="mobile"
              value={formData.mobile || ""}
              onChange={handleChange}
            />
          </FloatingLabel>

          <FloatingLabel label="Email" className="mb-3">
            <Form.Control
              name="email"
              value={formData.email || ""}
              onChange={handleChange}
            />
          </FloatingLabel>

          <FloatingLabel label="Role" className="mb-3">
            <Form.Select
              name="role"
              value={formData.role || ""}
              onChange={handleChange}
            >
              <option value="">Select Role</option>
              {canViewAllBranches && (
                <option value="SUPER ADMIN">Super Admin</option>
              )}
              <option value="ADMIN">Admin</option>
              <option value="STAFF">Staff</option>
              <option value="TRAINER">Trainer</option>
            </Form.Select>
          </FloatingLabel>

          <FloatingLabel label="Branch" className="mb-3">
            <Form.Select
              name="fld_branch_id"
              value={formData.fld_branch_id || ""}
              onChange={handleChange}
              disabled={!canViewAllBranches}
            >
              <option value="">Select Branch</option>
              {branchOptions.map((branch) => {
                const branchId = getBranchOptionId(branch);
                return (
                  <option key={branchId} value={branchId}>
                    {getBranchName(branchId)}
                  </option>
                );
              })}
            </Form.Select>
          </FloatingLabel>

          <FloatingLabel label="Status">
            <Form.Select
              name="status"
              value={formData.status || "Active"}
              onChange={handleChange}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </Form.Select>
          </FloatingLabel>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cancel
          </Button>
          <Button variant="secondary" onClick={handleSubmit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showBiometric} onHide={() => setShowBiometric(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Staff Biometric</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="mb-3">
            <strong>{selectedStaff?.name}</strong>
            <br />
            <span className="text-muted">
              Branch: {getBranchName(normalizeBranchId(selectedStaff || {}))}
            </span>
          </p>
          <FloatingLabel label="Select Machine Terminal" className="mb-3">
            <Form.Select
              value={selectedDevice}
              onChange={(e) => setSelectedDevice(e.target.value)}
            >
              <option value="">Select Device</option>
              {availableMachines.map((machine) => (
                <option
                  key={machine.id || machine.serial_number}
                  value={machine.serial_number}
                >
                  {machine.machine_name} ({machine.serial_number})
                </option>
              ))}
            </Form.Select>
          </FloatingLabel>
          <p className="text-muted small mb-0">
            Assigned Device:{" "}
            {selectedStaff?.biometric_name ||
              selectedStaff?.biometric_device_sn ||
              "N/A"}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowBiometric(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={assignBiometric}>
            Add Staff to Biometric Device
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default StaffList;
