import React, { useEffect, useState, useCallback } from "react";
import { Col, Container, FloatingLabel, Form, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { DatePicker, Space, Table, notification } from "antd";
import dayjs from "dayjs";
import axios from "axios";

import PostApiCall from "../../helpers/PostApi.js";
import GetApiCall from "../../helpers/GetApi.js";
import Hero from "../../Components/Hero/Hero.js";
import uploadimage from "../../assets/images/customer_photo.png";
import MemberAttendanceHistory from "../Members/MemberAttendanceHistory.jsx";

function NewMembership() {
  const location = useLocation();
  const navigate = useNavigate();
  const userData =
    localStorage.getItem("user") && JSON.parse(localStorage.getItem("user"));
  const currentBranchId = userData?.branch_id || "";
  const cashierId =
    userData?.id || userData?.staffId || userData?.user_id || "";
  const cashierName =
    userData?.name ||
    userData?.staff_name ||
    userData?.mobile ||
    "Current User";

  const [paymentSummary, setPaymentSummary] = useState({
    packageAmount: 0,
    totalPaid: 0,
    balanceAmount: 0,
  });

  // Multi-outlet contextual information
  const [outletContext, setOutletContext] = useState({
    brandId: "",
    outletId: currentBranchId, // specific branch identifier
  });

  // Consolidated Main Member Profile Form State
  const [memberData, setMemberData] = useState({
    id: null,
    type: "",
    oldMembershipId: null,
    applicationNumber: "",
    membershipNumber: "",
    name: "",
    mobile: "",
    gender: "",
    dateOfBirth: null,
    fitnessGoal: "",
    email: "",
    address: "",
    pincode: "",
    state: "",
    selectedCity: "",
    status: "",
    membershipPeriod: "", // '1', '3', '6', '12', 'custom'
    startDate: null,
    endDate: null,
    amountPerMonth: 0,
    trainerId: "",
    biometric_name: "",
  });

  // Consolidated Payment State Breakdown
  const [payment, setPayment] = useState({
    discount: 0,
    paidToday: 0,
    paymentMode: "Cash",
    paymentDate: dayjs(),
    transactionId: "",
    receiptNumber: "",
    remarks: "",
  });

  // Feature Component Arrays & UI States
  const [citiesList, setCitiesList] = useState([]);
  const [staff, setStaff] = useState([]);
  const [machines, setMachines] = useState([]);
  const [selectedLogo, setSelectedLogo] = useState("");
  const [selectedDevice, setSelectedDevice] = useState("");
  const [biometricStatus, setBiometricStatus] = useState("");
  const [showBiometric, setShowBiometric] = useState(true);
  const [paymentHistory, setPaymentHistory] = useState([]);

  // Financial Calculators
  const membershipMonths = Number(memberData.membershipPeriod || 0);
  const totalAmount =
    memberData.membershipPeriod === "custom" || !membershipMonths
      ? Number(memberData.amountPerMonth || 0)
      : Number(memberData.amountPerMonth || 0);
  // * membershipMonths;
  const payableAmount = Number(paymentSummary.balanceAmount || totalAmount);
  const remainingAmount = payableAmount - Number(payment.paidToday || 0);
  const balanceAmount = Math.max(
    payableAmount - Number(payment.paidToday || 0),
    0,
  );

  const paymentStatus =
    payableAmount <= 0
      ? "No Due"
      : balanceAmount <= 0
        ? "Paid"
        : Number(payment.paidToday || 0) > 0
          ? "Partial"
          : "Unpaid";

  // const historyPaidAmount = paymentHistory.reduce(
  //   (sum, item) =>
  //     sum +
  //     Number(item.amount || item.fld_total_amount || item.payment_amount || 0),
  //   0,
  // );
  const historyBalanceAmount = Math.max(payableAmount);

  const presets = [
    { label: "Yesterday", value: dayjs().subtract(1, "day") },
    { label: "Last Week", value: dayjs().subtract(7, "day") },
    { label: "Last Month", value: dayjs().subtract(1, "month") },
  ];

  // Reusable text input updates handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMemberData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPayment((prev) => ({ ...prev, [name]: value }));
  };

  const generateReceiptNumber = useCallback(() => {
    const year = dayjs().format("YYYY");
    const seed = Date.now().toString().slice(-5);
    return "RCPT-" + year + "-" + seed;
  }, []);

  const normalizePaymentHistory = (data) => {
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.data)) return data.data;
    if (Array.isArray(data?.payments)) return data.payments;
    return [];
  };

  const loadPaymentHistory = useCallback(async (memberId) => {
    if (!memberId) {
      setPaymentHistory([]);
      return;
    }

    try {
      const res = await PostApiCall.postRequest(
        {
          memberId: memberId,
        },
        "GetMembershipPayments",
      );
      if (res.status === 200 || res.status === 201) {
        const data = await res.json();
        setPaymentHistory(normalizePaymentHistory(data));
        setPaymentSummary(
          data.summary || {
            packageAmount: 0,
            totalPaid: 0,
            balanceAmount: 0,
          },
        );
        return;
      }
    } catch (err) {}
  }, []);

  // Reusable system value state mutation handler
  const handleDirectValueUpdate = (key, value) => {
    setMemberData((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    if (!payment.receiptNumber) {
      setPayment((prev) => ({
        ...prev,
        receiptNumber: generateReceiptNumber(),
      }));
    }
  }, [generateReceiptNumber, payment.receiptNumber]);

  useEffect(() => {
    loadPaymentHistory(memberData.id);
  }, [memberData.id, loadPaymentHistory]);

  // Fetch contextual details (e.g. from sub-domains or headers)
  useEffect(() => {
    // Dynamically query current brand or location context safely here
    setOutletContext({ brandId: "trainhigh-gym", outletId: currentBranchId });
  }, [currentBranchId]);

  // Fetching pincode data securely
  const handlePincodeChange = useCallback(async (e) => {
    const value = typeof e === "object" ? e.target.value : e;
    setMemberData((prev) => ({ ...prev, pincode: value }));

    if (value?.length !== 6) {
      setCitiesList([]);
      handleDirectValueUpdate("state", "");
      return;
    }

    try {
      const response = await axios.get(
        `https://api.postalpincode.in/pincode/${value}`,
      );
      const data = response.data?.[0];
      if (data && data.Status === "Success") {
        setCitiesList(data.PostOffice || []);
        handleDirectValueUpdate("state", data.PostOffice[0]?.State || "");
      } else {
        setCitiesList([]);
        handleDirectValueUpdate("state", "");
      }
    } catch (error) {
      console.error("Error fetching pincode context:", error);
      setCitiesList([]);
    }
  }, []);

  // Hydrate lists configuration
  useEffect(() => {
    GetApiCall.getRequest("staff").then((res) =>
      res
        .json()
        .then((data) =>
          setStaff(
            currentBranchId
              ? (data.data || []).filter(
                  (item) =>
                    String(
                      item.fld_branch_id || item.branch_id || item.branchId,
                    ) === String(currentBranchId),
                )
              : data.data || [],
          ),
        ),
    );
    GetApiCall.getRequest("Machines/GetMachines").then((res) =>
      res
        .json()
        .then((data) =>
          setMachines(
            currentBranchId
              ? (data || []).filter(
                  (item) =>
                    String(
                      item.fld_branch_id || item.branch_id || item.branchId,
                    ) === String(currentBranchId),
                )
              : data || [],
          ),
        ),
    );
  }, [currentBranchId]);

  // Handle initialization route variants (create, edit, convert, renew)
  useEffect(() => {
    const stateData = location.state?.data;
    const typeRoute = location.state?.type;

    if (!location.state) {
      // Direct Fresh Enrollment Action
      GetApiCall.getRequest("GetSerialNumber").then((res) =>
        res.json().then((obj) => {
          setMemberData((prev) => ({
            ...prev,
            applicationNumber: obj.appNumber,
            membershipNumber: obj.membershipNumber,
          }));
        }),
      );
      return;
    }

    if (typeRoute === "update" && stateData) {
      handlePincodeChange(stateData.fld_pincode);
      setMemberData({
        id: stateData.fld_id,
        type: stateData.fld_type,
        oldMembershipId: stateData.fld_old_membership,
        applicationNumber: stateData.fld_application_number,
        membershipNumber: stateData.fld_membership_number,
        name: stateData.fld_name,
        mobile: stateData.fld_mobile_number,
        gender: stateData.fld_gender || "",
        dateOfBirth: stateData.date_of_birth
          ? dayjs(stateData.date_of_birth)
          : null,
        fitnessGoal: stateData.fld_fitness_goal || stateData.fitnessGoal || "",
        email: stateData.fld_email,
        address: stateData.fld_address,
        pincode: stateData.fld_pincode,
        state: stateData.fld_state,
        selectedCity: stateData.fld_city,
        status: stateData.fld_status,
        membershipPeriod: stateData.fld_membership,
        startDate: stateData.fld_start_date
          ? dayjs(stateData.fld_start_date)
          : null,
        endDate: stateData.fld_end_date ? dayjs(stateData.fld_end_date) : null,
        amountPerMonth: stateData.fld_amount_permnth || 0,
        trainerId: stateData.trainer_id || "",
        biometric_name: stateData?.biometric_name,
      });
      setPayment({
        discount: stateData.fld_discount || stateData.discount || 0,
        paidToday: 0,
        paymentMode:
          stateData.fld_payment_mode || stateData.paymentMode || "Cash",
        paymentDate: stateData.fld_payment_date
          ? dayjs(stateData.fld_payment_date)
          : dayjs(),
        transactionId:
          stateData.fld_transaction_id || stateData.transactionId || "",
        receiptNumber: generateReceiptNumber(),
        remarks: stateData.fld_payment_remarks || stateData.remarks || "",
      });
    } else if (typeRoute === "renew" && stateData) {
      handlePincodeChange(stateData.fld_pincode);
      setMemberData((prev) => ({
        ...prev,
        id: stateData.fld_id,
        name: stateData.fld_name,
        mobile: stateData.fld_mobile_number,
        gender: stateData.fld_gender || "",
        dateOfBirth: stateData.date_of_birth
          ? dayjs(stateData.date_of_birth)
          : null,
        fitnessGoal: stateData.fld_fitness_goal || stateData.fitnessGoal || "",
        email: stateData.fld_email,
        address: stateData.fld_address,
        pincode: stateData.fld_pincode,
        state: stateData.fld_state,
        selectedCity: stateData.fld_city,
        status: stateData.fld_status,
        membershipPeriod: stateData.fld_membership,
        startDate: stateData.fld_start_date
          ? dayjs(stateData.fld_start_date)
          : null,
        endDate: stateData.fld_end_date ? dayjs(stateData.fld_end_date) : null,
        oldMembershipId: stateData.fld_id,
        trainerId: stateData.trainer_id || "",
        type: "New",
        biometric_name: stateData?.biometric_name,
      }));
      GetApiCall.getRequest("GetSerialNumber").then((res) =>
        res
          .json()
          .then((obj) =>
            handleDirectValueUpdate("applicationNumber", obj.appNumber),
          ),
      );
    } else if (typeRoute === "convert") {
      const enquiry = location.state.enquiryData;
      setMemberData((prev) => ({
        ...prev,
        name: enquiry.fld_name,
        mobile: enquiry.fld_phone,
        gender: enquiry.fld_gender || "",
        dateOfBirth: enquiry.fld_dob ? dayjs(enquiry.fld_dob) : null,
        fitnessGoal: enquiry.fld_fitness_goal || enquiry.fitnessGoal || "",
        email: enquiry.fld_email,
        type: "New",
        status: "Active",
      }));
      GetApiCall.getRequest("GetSerialNumber").then((res) =>
        res.json().then((obj) => {
          setMemberData((p) => ({
            ...p,
            applicationNumber: obj.appNumber,
            membershipNumber: obj.membershipNumber,
          }));
        }),
      );
    }
  }, [location.state, handlePincodeChange, generateReceiptNumber]);

  // Date management hooks updates
  const onChangeStartDate = (date) => {
    setMemberData((prev) => {
      const parsedEnd =
        date && prev.membershipPeriod && prev.membershipPeriod !== "custom"
          ? date.add(Number(prev.membershipPeriod), "month")
          : null;
      return { ...prev, startDate: date, endDate: parsedEnd };
    });
  };

  const onChangeMembershipPeriod = (value) => {
    setMemberData((prev) => {
      const parsedEnd =
        prev.startDate && value && value !== "custom"
          ? prev.startDate.add(Number(value), "month")
          : null;
      return { ...prev, membershipPeriod: value, endDate: parsedEnd };
    });
  };

  const validateForm = () => {
    const {
      name,
      mobile,
      address,
      email,
      status,
      amountPerMonth,
      startDate,
      membershipPeriod,
      gender,
      pincode,
    } = memberData;
    if (!name?.trim()) return "Please Enter Name";
    if (!mobile || !/^[6-9]\d{9}$/.test(String(mobile)))
      return "Please Enter Valid Mobile Number Starting With 6-9";
    if (!gender) return "Please Select Gender";
    if (!address?.trim()) return "Please Enter Address";
    // if (!email?.trim()) return "Please Enter Email";
    if (email?.trim() && !/^\S+@\S+\.\S+$/.test(email))
      return "Please Enter Valid Email";
    if (!/^\d{6}$/.test(String(pincode || "")))
      return "Please Enter Valid 6 Digit Pincode";
    if (!status) return "Please Select Status Of Member";
    if (!amountPerMonth) return "Please Enter Fee Per Month";
    if (!startDate) return "Please Enter Start Date";
    if (!membershipPeriod) return "Please Select Membership Period";
    if (!memberData.endDate) return "Please Enter End Date";
    if (!dayjs(memberData.endDate).isAfter(dayjs(startDate), "day"))
      return "End Date Must Be Greater Than Start Date";
    if (Number(payment.discount || 0) > totalAmount)
      return "Discount cannot be greater than Membership Total";
    if (Number(payment.paidToday || 0) > payableAmount)
      return "Paid Today cannot be greater than Payable Amount";
    return null;
  };

  const getSavedMemberId = (data) => {
    if (Array.isArray(data)) return data[0]?.fld_id || data[0]?.id;
    return (
      data?.fld_id ||
      data?.id ||
      data?.memberId ||
      data?.data?.fld_id ||
      data?.data?.id
    );
  };

  const saveMembershipPayment = async (savedMemberId, savedMembershipId) => {
    if (!savedMemberId || Number(payment.paidToday || 0) <= 0) return;

    await PostApiCall.postRequest(
      {
        member_id: savedMemberId,
        memberId: savedMemberId,
        // membership_id:
        //   savedMembershipId || memberData.id || memberData.membershipNumber,
        // membershipId:
        //   savedMembershipId || memberData.id || memberData.membershipNumber,
        amount: Number(payment.paidToday || 0),
        payment_date: payment.paymentDate?.format("YYYY-MM-DD"),
        paymentDate: payment.paymentDate?.format("YYYY-MM-DD"),
        payment_mode: payment.paymentMode,
        paymentMode: payment.paymentMode,
        transaction_id: payment.transactionId,
        transactionId: payment.transactionId,
        remarks: payment.remarks,
        receipt_number: payment.receiptNumber,
        receiptNumber: payment.receiptNumber,
        created_by: cashierId,
        createdBy: cashierId,
      },
      "AddMembershipPayments",
    );
  };

  const getMembershipPeriodForApi = () => {
    if (memberData.membershipPeriod !== "custom") {
      return memberData.membershipPeriod;
    }

    if (!memberData.startDate || !memberData.endDate) {
      return "";
    }

    const months = memberData.endDate.diff(memberData.startDate, "month");

    if (months > 0) {
      return String(months);
    }

    const days = memberData.endDate.diff(memberData.startDate, "day");

    return `${days} Days`;
  };

  const SaveForm = async () => {
    const error = validateForm();
    if (error) {
      notification.error({ message: "Validation Error", description: error });
      return;
    }

    try {
      const response = await PostApiCall.postRequest(
        {
          id: memberData.id,
          name: memberData.name,
          mobile: memberData.mobile,
          gender: memberData.gender,
          fld_gender: memberData.gender,
          dob: memberData.dateOfBirth?.format("YYYY-MM-DD"),
          dateOfBirth: memberData.dateOfBirth?.format("YYYY-MM-DD"),
          fitnessGoal: memberData.fitnessGoal,
          fld_fitness_goal: memberData.fitnessGoal,
          address: memberData.address,
          application: memberData.applicationNumber,
          membershipnumber: memberData.membershipNumber,
          membership: getMembershipPeriodForApi(),
          pincode: memberData.pincode,
          state: memberData.state,
          city: memberData.selectedCity,
          startDate: memberData.startDate?.format("YYYY-MM-DD"),
          endDate: memberData.endDate?.format("YYYY-MM-DD"),
          email: memberData.email,
          userstatus: memberData.status,
          amount: memberData.amountPerMonth,
          totalAmount,
          discount: Number(payment.discount || 0),
          paidAmount: Number(payment.paidToday || 0),
          paidToday: Number(payment.paidToday || 0),
          payableAmount,
          balanceAmount,
          paymentMode: payment.paymentMode,
          paymentDate: payment.paymentDate?.format("YYYY-MM-DD"),
          paymentStatus,
          transactionId: payment.transactionId,
          paymentReference: payment.transactionId,
          receiptNumber: payment.receiptNumber,
          cashier: cashierName,
          cashierId,
          paymentRemarks: payment.remarks,
          type: memberData.type,
          oldmembership: memberData.oldMembershipId,
          branch_id: currentBranchId,
          branchId: currentBranchId || null,
          fld_branch_id: currentBranchId,
          brandContextId: outletContext.brandId, // Multitenant mapping tracking
          outletContextId: outletContext.outletId, // Dynamic context tracking
        },
        "AddUserDetails",
      );

      if (response.status === 200 || response.status === 201) {
        const obj = await response.json();
        const savedMemberId = getSavedMemberId(obj) || memberData.id;
        await saveMembershipPayment(savedMemberId, memberData.membershipNumber);
        await loadPaymentHistory(savedMemberId);
        setShowBiometric(true);
        setBiometricStatus("PENDING_ENROLLMENT");
        notification.success({ message: "Member Saved Successfully" });
        navigate("/membership-list", {
          state: obj,
        });
      }
    } catch (err) {
      notification.error({
        message: "Server Error",
        description: "Failed to securely write membership records",
      });
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const preview = URL.createObjectURL(file);
    setSelectedLogo(preview);

    const form = new FormData();
    form.append("file", file);
    form.append("filename", `UserLogo-${file.name.replace(/\s/g, "")}`);

    fetch("https://trainhighgym.com/trainhighgym-api//AddImage", {
      method: "POST",
      body: form,
    });
  };

  const ImgUpload = ({ onChange, src }) => (
    <label
      htmlFor="photo-upload"
      className="custom-file-upload img-upload-input fas w-100 style-pointer"
    >
      <div className="img-wrap img-upload upload-image-component">
        <img alt="Profile preview" src={src} className="img-upload-input" />
      </div>
      <input
        accept="image/*"
        id="photo-upload"
        type="file"
        className="d-none"
        onChange={onChange}
      />
    </label>
  );

  const data = {
    columns: [
      {
        title: "#",
        dataIndex: "SNo",
        sorter: (a, b) => a.SNo - b.SNo,
        width: "60px",
      },
      {
        title: "Date",
        dataIndex: "date",
        sorter: (a, b) => a.Membership - b.Membership,
        width: "150px",
      },
      {
        title: "Amount",
        dataIndex: "amount",
        sorter: (a, b) => a.MemberName - b.MemberName,
        width: "160px",
      },
      {
        title: "Mode",
        dataIndex: "mode",
        sorter: (a, b) => a.MobileNo - b.MobileNo,
        width: "125px",
      },
      {
        title: "Transaction Id",
        dataIndex: "transactionid",
        width: "140px",
      },

      {
        title: "Receipt No",
        dataIndex: "recieptno",
        sorter: (a, b) => a.StartDate - b.StartDate,
        width: "120px",
      },
      {
        title: "Collected by",
        dataIndex: "cashier",
        sorter: (a, b) => a.StartDate - b.StartDate,
        width: "120px",
      },
      {
        title: "Remarks",
        dataIndex: "remarks",
        sorter: (a, b) => a.Status - b.Status,
        width: "100px",
      },
    ],
    rows: paymentHistory.map((data, i) => {
      return {
        key: data.fld_id,
        SNo: i + 1,
        amount: data?.fld_total_amount,
        date: dayjs(
          data.payment_date || data.fld_payment_date || data.paymentDate,
        ).format("DD MMM YYYY"),
        mode: data.fld_payment_mode,
        cashier: data?.cashier_name,
        transactionid: data?.fld_transaction_id,
        recieptno: data.fld_receipt_number,
        remarks: data.fld_remarks,
      };
    }),
  };

  return (
    <>
      <Hero />
      <section className="py-5 inner-section">
        <Container>
          <Row className="justify-content-center align-items-center">
            <Col lg={12}>
              <Row>
                <Col lg={3} className="text-center mb-3">
                  <div className="customer-photo">
                    <ImgUpload
                      onChange={handleImageUpload}
                      src={selectedLogo || uploadimage}
                    />
                  </div>
                </Col>
                <Col lg={9}>
                  <Row>
                    <Col lg={6}>
                      <FloatingLabel
                        label="Application Number"
                        className="mb-3"
                      >
                        <Form.Control
                          type="text"
                          value={memberData.applicationNumber}
                          disabled
                        />
                      </FloatingLabel>
                    </Col>
                    <Col lg={6}>
                      <FloatingLabel label="Membership Number" className="mb-3">
                        <Form.Control
                          type="text"
                          value={memberData.membershipNumber}
                          disabled
                        />
                      </FloatingLabel>
                    </Col>
                    <Col lg={6}>
                      <FloatingLabel label="Full Name" className="mb-3">
                        <Form.Control
                          type="text"
                          name="name"
                          value={memberData.name}
                          onChange={handleInputChange}
                        />
                      </FloatingLabel>
                    </Col>
                    <Col lg={6}>
                      <FloatingLabel label="Mobile Number" className="mb-3">
                        <Form.Control
                          type="text"
                          name="mobile"
                          value={memberData.mobile || ""}
                          onChange={handleInputChange}
                          maxLength={10}
                        />
                      </FloatingLabel>
                    </Col>
                    <Col lg={6}>
                      <FloatingLabel label="Email" className="mb-3">
                        <Form.Control
                          type="email"
                          name="email"
                          value={memberData.email}
                          onChange={handleInputChange}
                        />
                      </FloatingLabel>
                    </Col>

                    <Col lg={3}>
                      <FloatingLabel label="Gender" className="mb-3">
                        <Form.Select
                          name="gender"
                          value={memberData.gender}
                          onChange={handleInputChange}
                        >
                          <option value="">Select Gender</option>
                          <option value="MALE">Male</option>
                          <option value="FEMALE">Female</option>
                          <option value="Other">Other</option>
                        </Form.Select>
                      </FloatingLabel>
                    </Col>
                    <Col lg={3}>
                      <FloatingLabel label="" className="mb-3">
                        <DatePicker
                          value={memberData.dateOfBirth}
                          format="YYYY-MM-DD"
                          className="w-100 py-3"
                          placeholder="Date of Birth"
                          onChange={(date) =>
                            handleDirectValueUpdate("dateOfBirth", date)
                          }
                          disabledDate={(current) => {
                            if (!current) return false;

                            const today = dayjs().startOf("day");

                            // Disable dates before today
                            if (current.isAfter(today)) return true;

                            return false;
                          }}
                        />
                      </FloatingLabel>
                    </Col>
                    <Col lg={3}>
                      <FloatingLabel label="Pincode" className="mb-3">
                        <Form.Control
                          type="text"
                          value={memberData.pincode}
                          onChange={handlePincodeChange}
                        />
                      </FloatingLabel>
                    </Col>
                    <Col lg={3}>
                      <FloatingLabel label="State" className="mb-3">
                        <Form.Control
                          type="text"
                          value={memberData.state}
                          disabled
                        />
                      </FloatingLabel>
                    </Col>
                    <Col lg={3}>
                      <FloatingLabel label="Select City" className="mb-3">
                        <Form.Select
                          value={memberData.selectedCity}
                          onChange={(e) =>
                            handleDirectValueUpdate(
                              "selectedCity",
                              e.target.value,
                            )
                          }
                        >
                          <option value="">Select City</option>
                          {citiesList.map((data, index) => (
                            <option
                              key={index}
                              value={`${data.Block}-${data.Name}`}
                            >{`${data.Block}-${data.Name}`}</option>
                          ))}
                        </Form.Select>
                      </FloatingLabel>
                    </Col>
                    <Col lg={3}>
                      <FloatingLabel label="Branch" className="mb-3">
                        <Form.Control
                          type="text"
                          value={
                            userData?.branch_name ||
                            userData?.branch ||
                            currentBranchId ||
                            "All Branches"
                          }
                          disabled
                        />
                      </FloatingLabel>
                    </Col>
                    <Col lg={6}>
                      <FloatingLabel label="Full Address" className="mb-3">
                        <Form.Control
                          type="text"
                          name="address"
                          value={memberData.address}
                          onChange={handleInputChange}
                        />
                      </FloatingLabel>
                    </Col>

                    <Col lg={6}>
                      <FloatingLabel label="Fitness Goal" className="mb-3">
                        <Form.Select
                          name="fitnessGoal"
                          value={memberData.fitnessGoal}
                          onChange={handleInputChange}
                        >
                          <option value="">Select Goal</option>
                          <option value="Weight Loss">Weight Loss</option>
                          <option value="Muscle Gain">Muscle Gain</option>
                          <option value="Strength">Strength</option>
                          <option value="General Fitness">
                            General Fitness
                          </option>
                          <option value="Rehabilitation">Rehabilitation</option>
                        </Form.Select>
                      </FloatingLabel>
                    </Col>
                    <Col lg={3}>
                      <FloatingLabel label="Select Membership" className="mb-3">
                        <Form.Select
                          value={memberData.membershipPeriod}
                          onChange={(e) =>
                            onChangeMembershipPeriod(e.target.value)
                          }
                        >
                          <option value="">Select</option>
                          <option value="1">1 Month</option>
                          <option value="3">3 Months</option>
                          <option value="6">6 Month</option>
                          <option value="12">12 Month</option>
                          <option value="custom">Custom</option>
                        </Form.Select>
                      </FloatingLabel>
                    </Col>
                    <Col lg={3}>
                      <Space
                        direction="vertical"
                        size={12}
                        className="w-100 mb-3"
                      >
                        <DatePicker
                          presets={presets}
                          value={memberData.startDate}
                          format="YYYY-MM-DD"
                          placeholder="Start Date"
                          className="w-100 py-3"
                          onChange={onChangeStartDate}
                        />
                      </Space>
                    </Col>
                    <Col lg={3}>
                      <Space
                        direction="vertical"
                        size={12}
                        className="w-100 mb-3"
                      >
                        <DatePicker
                          disabled={memberData.membershipPeriod !== "custom"}
                          format="YYYY-MM-DD"
                          value={memberData.endDate}
                          placeholder="End Date"
                          className="w-100 py-3"
                          onChange={(date) =>
                            handleDirectValueUpdate("endDate", date)
                          }
                          disabledDate={(current) => {
                            if (!current) return false;

                            const today = dayjs().startOf("day");

                            // Disable dates before today
                            if (current.isBefore(today)) return true;

                            // Disable dates before selected start date
                            if (
                              memberData?.startDate &&
                              current.isBefore(
                                memberData?.startDate.startOf("day"),
                              )
                            )
                              return true;

                            return false;
                          }}
                        />
                      </Space>
                    </Col>

                    <Col lg={3}>
                      <FloatingLabel label="Membership Amount" className="mb-3">
                        <Form.Control
                          type="text"
                          name="amountPerMonth"
                          value={memberData.amountPerMonth}
                          onChange={handleInputChange}
                        />
                      </FloatingLabel>
                    </Col>
                    <Col lg={3}>
                      <FloatingLabel label="Status" className="mb-3">
                        <Form.Select
                          value={memberData.status}
                          onChange={(e) =>
                            handleDirectValueUpdate("status", e.target.value)
                          }
                        >
                          <option value="">Select</option>
                          <option value="Active">Active</option>
                          <option value="InActive">In Active</option>
                        </Form.Select>
                      </FloatingLabel>
                    </Col>

                    <Col lg={12}>
                      <h5 className="mt-3 mb-3">Payment</h5>
                    </Col>
                    <Col lg={3}>
                      <FloatingLabel label="Membership Amount">
                        <Form.Control
                          type="number"
                          value={totalAmount}
                          disabled
                        />
                      </FloatingLabel>
                    </Col>
                    <Col lg={3}>
                      <FloatingLabel label="Receipt Number">
                        <Form.Control value={payment.receiptNumber} disabled />
                      </FloatingLabel>
                    </Col>
                    {/* <Col lg={3}>
                      <FloatingLabel label="Discount">
                        <Form.Control
                          type="number"
                          name="discount"
                          value={payment.discount}
                          min="0"
                          onChange={handlePaymentChange}
                        />
                      </FloatingLabel>
                    </Col> */}
                    <Col lg={3}>
                      <FloatingLabel label="Payable Amount">
                        <Form.Control
                          type="number"
                          value={payableAmount}
                          disabled
                        />
                      </FloatingLabel>
                    </Col>
                    <Col lg={3}>
                      <FloatingLabel label="Paid Amount">
                        <Form.Control
                          type="number"
                          name="paidToday"
                          value={payment.paidToday}
                          min="0"
                          onChange={handlePaymentChange}
                        />
                      </FloatingLabel>
                    </Col>
                    <Col lg={3} className="mt-3">
                      <FloatingLabel label="Payment Mode">
                        <Form.Select
                          name="paymentMode"
                          value={payment.paymentMode}
                          onChange={handlePaymentChange}
                        >
                          <option>Cash</option>
                          <option>UPI</option>
                          <option>Card</option>
                          <option>Bank Transfer</option>
                        </Form.Select>
                      </FloatingLabel>
                    </Col>
                    <Col lg={3} className="mt-3">
                      <DatePicker
                        value={payment.paymentDate}
                        onChange={(date) =>
                          setPayment((p) => ({ ...p, paymentDate: date }))
                        }
                        format="YYYY-MM-DD"
                        className="w-100 py-2"
                      />
                    </Col>
                    <Col lg={3} className="mt-3">
                      <FloatingLabel label="Remaining Amount">
                        <Form.Control value={balanceAmount} disabled />
                      </FloatingLabel>
                    </Col>
                    <Col lg={3} className="mt-3">
                      <FloatingLabel label="Payment Status">
                        <Form.Control value={paymentStatus} disabled />
                      </FloatingLabel>
                    </Col>
                    <Col lg={3} className="mt-3">
                      <FloatingLabel label="Transaction ID">
                        <Form.Control
                          type="text"
                          name="transactionId"
                          value={payment.transactionId}
                          onChange={handlePaymentChange}
                        />
                      </FloatingLabel>
                    </Col>
                    <Col lg={3} className="mt-3"></Col>
                    <Col lg={3} className="mt-3">
                      <FloatingLabel label="Collected by">
                        <Form.Control value={cashierName} disabled />
                      </FloatingLabel>
                    </Col>
                    <Col lg={12} className="mt-3">
                      <FloatingLabel label="Remarks">
                        <Form.Control
                          type="text"
                          name="remarks"
                          value={payment.remarks}
                          onChange={handlePaymentChange}
                        />
                      </FloatingLabel>
                    </Col>

                    <Col lg={12} className="mt-4">
                      <h5 className="mb-3">Payment History</h5>
                      <Table
                        size="small"
                        bordered={true}
                        striped
                        // scroll={{ x: 400, y: 1000 }}
                        className="customTable"
                        columns={data.columns}
                        dataSource={data.rows}
                      />
                      <div className="text-end fw-bold">
                        Balance : Rs. {historyBalanceAmount}
                      </div>
                    </Col>

                    <Col lg={12} className="ms-auto my-4 d-lg-flex gap-3">
                      <button
                        type="button"
                        className="btn btn-warning w-100 py-2 btn-lg"
                        onClick={() => navigate("/membership-list")}
                      >
                        View Members List
                      </button>
                      <button
                        type="button"
                        className="btn btn-dark w-100 py-2 btn-lg"
                        onClick={SaveForm}
                      >
                        {location.state ? "Update Member" : "Add New Member"}
                      </button>
                    </Col>

                    {memberData.id && (
                      <section className="mt-4 p-4 border rounded bg-light">
                        <h5 className="mb-3 fw-bold">
                          {memberData.trainerId ? "Change" : "Assign"} Trainer
                        </h5>
                        <Row>
                          <Col lg={6}>
                            <FloatingLabel label="Select a trainer to assign">
                              <Form.Select
                                value={memberData.trainerId}
                                onChange={(e) =>
                                  handleDirectValueUpdate(
                                    "trainerId",
                                    e.target.value,
                                  )
                                }
                              >
                                <option value="">Select Trainer</option>
                                {staff
                                  ?.filter((t) => t?.role !== "Admin")
                                  .map((t) => (
                                    <option key={t.id} value={t.id}>
                                      {t.name} - {t.staff_code}
                                    </option>
                                  ))}
                              </Form.Select>
                            </FloatingLabel>
                          </Col>
                          <Col lg={6}>
                            <button
                              className="btn btn-dark w-100 h-100"
                              onClick={() => {
                                PostApiCall.postRequest(
                                  {
                                    memberId: memberData.id,
                                    trainerId: memberData.trainerId,
                                  },
                                  "AssignTrainer",
                                ).then(() =>
                                  notification.success({
                                    message:
                                      "Trainer Configuration Updated Successfully",
                                  }),
                                );
                              }}
                            >
                              {memberData.trainerId ? "Update" : "Assign"}{" "}
                              Trainer
                            </button>
                          </Col>
                        </Row>
                      </section>
                    )}

                    {showBiometric && (
                      <section className="mt-4 p-4 border rounded bg-light">
                        <h5 className="mb-3 fw-bold">
                          Biometric Synchronization
                        </h5>
                        <Row>
                          <Col lg={6}>
                            <FloatingLabel
                              label="Select Machine Terminal"
                              className="mb-3"
                            >
                              <Form.Select
                                onChange={(e) =>
                                  setSelectedDevice(e.target.value)
                                }
                              >
                                <option value="">Select Device</option>
                                {machines.map((m) => (
                                  <option key={m.id} value={m.serial_number}>
                                    {m.machine_name} ({m.serial_number})
                                  </option>
                                ))}
                              </Form.Select>
                            </FloatingLabel>
                          </Col>
                          <Col lg={6}>
                            <button
                              className="btn btn-success w-100 h-75"
                              onClick={() => {
                                PostApiCall.postRequest(
                                  {
                                    memberId: memberData.id,
                                    deviceSn: selectedDevice,
                                  },
                                  "biometric/assign-user",
                                ).then(() =>
                                  notification.success({
                                    message:
                                      "Sync commands emitted to target endpoint terminal device.",
                                  }),
                                );
                              }}
                            >
                              Add Customer to Biometric Device
                            </button>
                          </Col>
                        </Row>
                        {/* <p className="mt-2 text-muted text-sm">
                          Status Profile:{" "}
                          <strong>{biometricStatus || "N/A"}</strong>
                        </p> */}
                        <p className="mt-2 text-muted text-sm">
                          Assigned Devices:{" "}
                          <strong>{memberData?.biometric_name || "N/A"}</strong>
                        </p>
                      </section>
                    )}
                    <MemberAttendanceHistory id={memberData.id} />
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default NewMembership;
