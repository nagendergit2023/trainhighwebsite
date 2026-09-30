import React, { useState } from "react";
import {
    Form,
    Button,
    Container,
    Row,
    Col,
    Card,
    Alert,
    FloatingLabel,
    Spinner,
} from "react-bootstrap";

import { notification } from "antd";
import Notiflix from "notiflix";

import PostApiCall from "../../helpers/PostApi";
import "bootstrap/dist/css/bootstrap.min.css";

/* =========================================================
   INITIAL FORM DATA
========================================================= */

const initialFormData = {
    childName: "",
    dob: "",
    age: "",
    gender: "",
    tShirtSize: "",

    parentName: "",
    relationship: "",
    phone: "",
    email: "",
    address: "",

    emergencyName: "",
    emergencyRelationship: "",
    emergencyPhone: "",

    medicalConditions: "",
    medications: "",
    limitations: "",

    division: "",
    waiverAgreed: false,

    type: "Kids Championship Registration",
};

/* =========================================================
   VALIDATION LIMITS
========================================================= */

const MIN_ADDRESS_LENGTH = 10;
const MAX_ADDRESS_LENGTH = 250;

const MAX_MEDICAL_LENGTH = 500;
const MAX_MEDICATION_LENGTH = 500;
const MAX_LIMITATIONS_LENGTH = 500;

/* =========================================================
   VALIDATION REGEX
========================================================= */

const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s.'-]+$/;

const phoneRegex = /^[0-9]{10}$/;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/* =========================================================
   COMPONENT
========================================================= */

const TrainHighKidsChampionship = () => {
    const [formData, setFormData] =
        useState(initialFormData);

    const [errors, setErrors] = useState({});

    const [touched, setTouched] =
        useState({});

    const [success, setSuccess] =
        useState(false);

    const [isSubmitting, setIsSubmitting] =
        useState(false);

    /* =========================================================
       CALCULATE AGE
    ========================================================= */

    const calculateAge = (dob) => {
        if (!dob) return "";

        const birthDate = new Date(
            `${dob}T00:00:00`
        );

        const today = new Date();

        let age =
            today.getFullYear() -
            birthDate.getFullYear();

        const monthDifference =
            today.getMonth() -
            birthDate.getMonth();

        if (
            monthDifference < 0 ||
            (
                monthDifference === 0 &&
                today.getDate() <
                birthDate.getDate()
            )
        ) {
            age--;
        }

        return age;
    };

    /* =========================================================
       GET DIVISION
    ========================================================= */

    const getDivisionForAge = (age) => {
        const numericAge = Number(age);

        if (
            numericAge >= 5 &&
            numericAge <= 7
        ) {
            return "Division A";
        }

        if (
            numericAge >= 8 &&
            numericAge <= 10
        ) {
            return "Division B";
        }

        if (
            numericAge >= 11 &&
            numericAge <= 13
        ) {
            return "Division C";
        }

        if (
            numericAge >= 14 &&
            numericAge <= 17
        ) {
            return "Division D";
        }

        if (
            numericAge >= 18
        ) {
            return "Division E";
        }

        return "";
    };

    /* =========================================================
       VALIDATE SINGLE FIELD
    ========================================================= */

    const validateField = (
        name,
        value,
        data = formData
    ) => {
        const trimmedValue =
            typeof value === "string"
                ? value.trim()
                : value;

        switch (name) {

            /* =============================================
               CHILD NAME
            ============================================= */

            case "childName":

                if (!trimmedValue) {
                    return "Please enter the participant's full name.";
                }

                if (trimmedValue.length < 2) {
                    return "Participant's name must be at least 2 characters.";
                }

                if (trimmedValue.length > 80) {
                    return "Participant's name cannot exceed 80 characters.";
                }

                if (!nameRegex.test(trimmedValue)) {
                    return "Participant's name contains invalid characters.";
                }

                return "";

            /* =============================================
               DOB
            ============================================= */

            case "dob": {

                if (!value) {
                    return "Please select the participant's date of birth.";
                }

                const birthDate = new Date(
                    `${value}T00:00:00`
                );

                if (
                    Number.isNaN(
                        birthDate.getTime()
                    )
                ) {
                    return "Please enter a valid date of birth.";
                }

                const today = new Date();

                today.setHours(0, 0, 0, 0);

                if (birthDate > today) {
                    return "Date of birth cannot be in the future.";
                }

                const age =
                    calculateAge(value);

                if (age < 5 || age > 50) {
                    return "The participant must be between 5 and 50 years old.";
                }

                return "";
            }

            /* =============================================
               GENDER
            ============================================= */

            case "gender":

                if (!value) {
                    return "Please select a gender.";
                }

                return "";

            /* =============================================
               T-SHIRT
            ============================================= */

            case "tShirtSize":

                if (!value) {
                    return "Please select a T-shirt size.";
                }

                return "";

            /* =============================================
               PARENT NAME
            ============================================= */

            case "parentName":

                if (!trimmedValue) {
                    return "Please enter the parent/guardian's full name.";
                }

                if (trimmedValue.length < 2) {
                    return "Parent/guardian name must be at least 2 characters.";
                }

                if (trimmedValue.length > 80) {
                    return "Parent/guardian name cannot exceed 80 characters.";
                }

                if (!nameRegex.test(trimmedValue)) {
                    return "Parent/guardian name contains invalid characters.";
                }

                return "";

            /* =============================================
               RELATIONSHIP
            ============================================= */

            case "relationship":

                if (!value) {
                    return "Please select the relationship to the participant.";
                }

                return "";

            /* =============================================
               PRIMARY PHONE
            ============================================= */

            case "phone": {

                if (!value) {
                    return "Please enter a primary phone number.";
                }

                const cleanedPhone =
                    value.replace(/\D/g, "");

                if (
                    cleanedPhone.length !== 10
                ) {
                    return "Phone number must contain exactly 10 digits.";
                }

                if (
                    !phoneRegex.test(cleanedPhone)
                ) {
                    return "Please enter a valid 10-digit phone number.";
                }

                return "";
            }

            /* =============================================
               EMAIL
            ============================================= */

            case "email":

                if (!trimmedValue) {
                    return "Please enter an email address.";
                }

                if (
                    trimmedValue.length > 120
                ) {
                    return "Email address cannot exceed 120 characters.";
                }

                if (
                    !emailRegex.test(
                        trimmedValue
                    )
                ) {
                    return "Please enter a valid email address.";
                }

                return "";

            /* =============================================
               ADDRESS
            ============================================= */

            case "address":

                if (!trimmedValue) {
                    return "Please enter the home address.";
                }

                if (
                    trimmedValue.length <
                    MIN_ADDRESS_LENGTH
                ) {
                    return `Address must be at least ${MIN_ADDRESS_LENGTH} characters.`;
                }

                if (
                    trimmedValue.length >
                    MAX_ADDRESS_LENGTH
                ) {
                    return `Address cannot exceed ${MAX_ADDRESS_LENGTH} characters.`;
                }

                return "";

            /* =============================================
               EMERGENCY NAME
            ============================================= */

            case "emergencyName":

                if (!trimmedValue) {
                    return "Please enter the emergency contact name.";
                }

                if (trimmedValue.length < 2) {
                    return "Emergency contact name must be at least 2 characters.";
                }

                if (trimmedValue.length > 80) {
                    return "Emergency contact name cannot exceed 80 characters.";
                }

                if (!nameRegex.test(trimmedValue)) {
                    return "Emergency contact name contains invalid characters.";
                }

                return "";

            /* =============================================
               EMERGENCY RELATIONSHIP
            ============================================= */

            case "emergencyRelationship":

                if (!trimmedValue) {
                    return "Please enter the emergency contact relationship.";
                }

                if (trimmedValue.length < 2) {
                    return "Relationship must be at least 2 characters.";
                }

                if (trimmedValue.length > 50) {
                    return "Relationship cannot exceed 50 characters.";
                }

                return "";

            /* =============================================
               EMERGENCY PHONE
            ============================================= */

            case "emergencyPhone": {

                if (!value) {
                    return "Please enter the emergency phone number.";
                }

                const cleanedPhone =
                    value.replace(/\D/g, "");

                if (
                    cleanedPhone.length !== 10
                ) {
                    return "Emergency phone number must contain exactly 10 digits.";
                }

                if (
                    !phoneRegex.test(cleanedPhone)
                ) {
                    return "Please enter a valid emergency phone number.";
                }

                return "";
            }

            /* =============================================
               MEDICAL CONDITIONS
            ============================================= */

            case "medicalConditions":

                if (
                    trimmedValue.length >
                    MAX_MEDICAL_LENGTH
                ) {
                    return `Medical information cannot exceed ${MAX_MEDICAL_LENGTH} characters.`;
                }

                return "";

            /* =============================================
               MEDICATIONS
            ============================================= */

            case "medications":

                if (
                    trimmedValue.length >
                    MAX_MEDICATION_LENGTH
                ) {
                    return `Medication information cannot exceed ${MAX_MEDICATION_LENGTH} characters.`;
                }

                return "";

            /* =============================================
               LIMITATIONS
            ============================================= */

            case "limitations":

                if (
                    trimmedValue.length >
                    MAX_LIMITATIONS_LENGTH
                ) {
                    return `Physical limitations cannot exceed ${MAX_LIMITATIONS_LENGTH} characters.`;
                }

                return "";

            /* =============================================
               DIVISION
            ============================================= */

            case "division": {

                const numericAge =
                    Number(data.age);

                if (
                    !numericAge ||
                    numericAge < 5 ||
                    numericAge > 50
                ) {
                    return "Please enter a valid age between 5 and 50.";
                }

                const expectedDivision =
                    getDivisionForAge(
                        numericAge
                    );

                if (!value) {
                    return "Please select the correct age bracket.";
                }

                if (
                    value !== expectedDivision
                ) {
                    return "The selected age bracket does not match the participant's age.";
                }

                return "";
            }

            /* =============================================
               WAIVER
            ============================================= */

            case "waiverAgreed":

                if (!value) {
                    return "You must accept the Liability Waiver & Consent.";
                }

                return "";

            default:
                return "";
        }
    };

    /* =========================================================
       VALIDATE ENTIRE FORM
    ========================================================= */

    const validateForm = () => {
        const validationErrors = {};

        const fieldsToValidate = [
            "childName",
            "dob",
            "gender",
            "tShirtSize",
            "parentName",
            "relationship",
            "phone",
            "email",
            "address",
            "emergencyName",
            "emergencyRelationship",
            "emergencyPhone",
            "medicalConditions",
            "medications",
            "limitations",
            "division",
            "waiverAgreed",
        ];

        fieldsToValidate.forEach((field) => {
            const error = validateField(
                field,
                formData[field],
                formData
            );

            if (error) {
                validationErrors[field] =
                    error;
            }
        });

        setErrors(validationErrors);

        /* Mark all fields as touched */

        const allTouched = {};

        fieldsToValidate.forEach(
            (field) => {
                allTouched[field] = true;
            }
        );

        setTouched(allTouched);

        return validationErrors;
    };

    /* =========================================================
       HANDLE CHANGE
    ========================================================= */

    const handleChange = (e) => {
        const {
            name,
            value,
            type,
            checked,
        } = e.target;

        setSuccess(false);

        /* -----------------------------------------
           DOB
        ----------------------------------------- */

        if (name === "dob") {
            const calculatedAge =
                calculateAge(value);

            const automaticDivision =
                getDivisionForAge(
                    calculatedAge
                );

            const updatedData = {
                ...formData,
                dob: value,
                age: calculatedAge,
                division:
                    automaticDivision,
            };

            setFormData(updatedData);

            setTouched((prev) => ({
                ...prev,
                dob: true,
                division: true,
            }));

            setErrors((prev) => ({
                ...prev,
                dob: validateField(
                    "dob",
                    value,
                    updatedData
                ),
                division: validateField(
                    "division",
                    automaticDivision,
                    updatedData
                ),
            }));

            return;
        }

        /* -----------------------------------------
           CHECKBOX
        ----------------------------------------- */

        if (
            type === "checkbox"
        ) {
            const updatedValue =
                checked;

            setFormData((prev) => ({
                ...prev,
                [name]: updatedValue,
            }));

            if (touched[name]) {
                setErrors((prev) => ({
                    ...prev,
                    [name]:
                        validateField(
                            name,
                            updatedValue,
                            {
                                ...formData,
                                [name]:
                                    updatedValue,
                            }
                        ),
                }));
            }

            return;
        }

        /* -----------------------------------------
           PHONE INPUT
        ----------------------------------------- */

        if (
            name === "phone" ||
            name === "emergencyPhone"
        ) {
            const digitsOnly =
                value
                    .replace(/\D/g, "")
                    .slice(0, 10);

            setFormData((prev) => ({
                ...prev,
                [name]: digitsOnly,
            }));

            if (touched[name]) {
                setErrors((prev) => ({
                    ...prev,
                    [name]:
                        validateField(
                            name,
                            digitsOnly,
                            {
                                ...formData,
                                [name]:
                                    digitsOnly,
                            }
                        ),
                }));
            }

            return;
        }

        /* -----------------------------------------
           NORMAL INPUT
        ----------------------------------------- */

        const updatedData = {
            ...formData,
            [name]: value,
        };

        setFormData(updatedData);

        if (touched[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]:
                    validateField(
                        name,
                        value,
                        updatedData
                    ),
            }));
        }
    };

    /* =========================================================
       HANDLE BLUR
    ========================================================= */

    const handleBlur = (e) => {
        const { name, value, type, checked } =
            e.target;

        const fieldValue =
            type === "checkbox"
                ? checked
                : value;

        setTouched((prev) => ({
            ...prev,
            [name]: true,
        }));

        setErrors((prev) => ({
            ...prev,
            [name]:
                validateField(
                    name,
                    fieldValue,
                    formData
                ),
        }));
    };

    /* =========================================================
       SUBMIT
    ========================================================= */

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isSubmitting) {
            return;
        }

        setSuccess(false);

        const validationErrors = validateForm();

        if (Object.keys(validationErrors).length > 0) {
            notification.error({
                message: "Registration Incomplete",
                description:
                    "Please check the highlighted fields and complete the required information.",
                placement: "topRight",
                duration: 5,
            });

            setTimeout(() => {
                const firstError =
                    document.querySelector(".is-invalid");

                if (firstError) {
                    firstError.focus();
                }
            }, 0);

            return;
        }

        setIsSubmitting(true);

        try {
            Notiflix.Loading.circle("Submitting registration...");

            const payload = {
                name: formData.parentName.trim(),
                email: "trainhighgym@gmail.com",
                senderemail: formData.email.trim(),
                mobile: formData.phone,
                type: "Kids Championship Registration",
                desciption: `Kids Championship Registration

Child Name: ${formData.childName}
Date of Birth: ${formData.dob}
Age: ${formData.age}
Gender: ${formData.gender}
T-Shirt Size: ${formData.tShirtSize}
Division: ${formData.division}

Parent / Guardian Name: ${formData.parentName}
Relationship: ${formData.relationship}
Phone: ${formData.phone}
Email: ${formData.email}

Address:
${formData.address}

Emergency Contact Name: ${formData.emergencyName}
Relationship: ${formData.emergencyRelationship}
Phone: ${formData.emergencyPhone}

Medical Conditions:
${formData.medicalConditions || "None"}

Medications:
${formData.medications || "None"}

Physical Limitations:
${formData.limitations || "None"}

Parent/Guardian Waiver Accepted: ${formData.waiverAgreed ? "Yes" : "No"
                    }
                `,
            };

            console.log(
                "Kids Championship Registration Payload:",
                payload
            );

            const results = await PostApiCall.postRequest(
                payload,
                "contactus"
            );

            let response = {};

            try {
                response = await results.json();
            } catch (jsonError) {
                console.warn(
                    "API response is not valid JSON:",
                    jsonError
                );
            }

            console.log(
                "Registration API Response:",
                response
            );

            if (
                results.status === 200 ||
                results.status === 201
            ) {
                notification.success({
                    message: "Registration Successful",
                    description:
                        "The Kids Championship registration has been submitted successfully.",
                    placement: "topRight",
                    duration: 5,
                });

                setSuccess(true);

                setFormData({
                    ...initialFormData,
                });

                setErrors({});
                setTouched({});

                window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                });
            } else {
                throw new Error(
                    response?.message ||
                    "Unable to submit registration. Please try again."
                );
            }
        } catch (error) {
            console.error(
                "Kids Championship Registration Error:",
                error
            );

            setSuccess(false);

            setErrors((prev) => ({
                ...prev,
                submit:
                    error?.message ||
                    "Something went wrong while submitting the registration. Please try again.",
            }));

            notification.error({
                message: "Registration Failed",
                description:
                    error?.message ||
                    "Something went wrong while submitting the registration. Please try again.",
                placement: "topRight",
                duration: 5,
            });

            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        } finally {
            Notiflix.Loading.remove();
            setIsSubmitting(false);
        }
    };

    /* =========================================================
       FIELD ERROR HELPER
    ========================================================= */

    const getFieldError = (name) => {
        if (!touched[name]) {
            return "";
        }

        return errors[name] || "";
    };

    /* =========================================================
       FIELD INVALID HELPER
    ========================================================= */

    const isFieldInvalid = (name) => {
        return Boolean(
            touched[name] &&
            errors[name]
        );
    };

    /* =========================================================
       RENDER
    ========================================================= */

    return (
        <Container className="my-5">

            {/* ==========================================
                HEADER
            ========================================== */}

            <Row className="justify-content-center mb-4">

                <Col lg={9}>

                    <h2 className="section-title text-center">
                        Train High Championship
                    </h2>

                    <p className="text-muted text-center mb-0">
                        A world class fitness format where
                        Young Champions Train, Compete & Shine.
                    </p>

                </Col>

            </Row>

            {/* ==========================================
                FORM
            ========================================== */}

            <Row className="justify-content-center">

                <Col
                    xs={12}
                    lg={10}
                    xl={10}
                >

                    <Card className="border-0">

                        <Card.Body className="p-4 p-md-5">

                            {/* SUCCESS */}

                            {success && (
                                <Alert
                                    variant="success"
                                    dismissible
                                    onClose={() =>
                                        setSuccess(false)
                                    }
                                >
                                    Registration submitted
                                    successfully!
                                </Alert>
                            )}

                            {/* SUBMIT ERROR */}

                            {errors.submit && (
                                <Alert
                                    variant="danger"
                                    dismissible
                                    onClose={() =>
                                        setErrors(
                                            (prev) => {
                                                const next = {
                                                    ...prev,
                                                };

                                                delete next.submit;

                                                return next;
                                            }
                                        )
                                    }
                                >
                                    {errors.submit}
                                </Alert>
                            )}

                            <Form
                                onSubmit={
                                    handleSubmit
                                }
                                noValidate
                            >

                                {/* =====================================================
                                    SECTION 1
                                ===================================================== */}

                                <h5 className="text-black fw-bold mb-4">
                                    1. Participant Information
                                </h5>

                                <Row className="g-3">

                                    {/* CHILD NAME */}

                                    <Col xs={12}>

                                        <FloatingLabel
                                            label="Full Name *"
                                        >

                                            <Form.Control
                                                type="text"
                                                name="childName"
                                                value={
                                                    formData.childName
                                                }
                                                onChange={
                                                    handleChange
                                                }
                                                onBlur={
                                                    handleBlur
                                                }
                                                placeholder="Full Name of Child"
                                                maxLength={80}
                                                isInvalid={isFieldInvalid(
                                                    "childName"
                                                )}
                                            />

                                            <Form.Control.Feedback type="invalid">
                                                {getFieldError(
                                                    "childName"
                                                )}
                                            </Form.Control.Feedback>

                                        </FloatingLabel>

                                    </Col>

                                    {/* DOB */}

                                    <Col
                                        xs={12}
                                        md={6}
                                    >

                                        <FloatingLabel
                                            label="Date of Birth *"
                                        >

                                            <Form.Control
                                                type="date"
                                                name="dob"
                                                value={
                                                    formData.dob
                                                }
                                                onChange={
                                                    handleChange
                                                }
                                                onBlur={
                                                    handleBlur
                                                }
                                                max={
                                                    new Date()
                                                        .toISOString()
                                                        .split(
                                                            "T"
                                                        )[0]
                                                }
                                                isInvalid={isFieldInvalid(
                                                    "dob"
                                                )}
                                            />

                                            <Form.Control.Feedback type="invalid">
                                                {getFieldError(
                                                    "dob"
                                                )}
                                            </Form.Control.Feedback>

                                        </FloatingLabel>

                                    </Col>

                                    {/* AGE */}

                                    <Col
                                        xs={12}
                                        md={6}
                                    >

                                        <FloatingLabel
                                            label="Age"
                                        >

                                            <Form.Control
                                                type="number"
                                                value={
                                                    formData.age
                                                }
                                                placeholder="Age"
                                                readOnly
                                                tabIndex={-1}
                                            />

                                        </FloatingLabel>

                                    </Col>

                                    {/* GENDER */}

                                    <Col
                                        xs={12}
                                        md={6}
                                    >

                                        <FloatingLabel
                                            label="Gender *"
                                        >

                                            <Form.Select
                                                name="gender"
                                                value={
                                                    formData.gender
                                                }
                                                onChange={
                                                    handleChange
                                                }
                                                onBlur={
                                                    handleBlur
                                                }
                                                isInvalid={isFieldInvalid(
                                                    "gender"
                                                )}
                                            >

                                                <option value="">
                                                    Select gender
                                                </option>

                                                <option value="Male">
                                                    Male
                                                </option>

                                                <option value="Female">
                                                    Female
                                                </option>

                                                <option value="Prefer not to say">
                                                    Prefer not to say
                                                </option>

                                            </Form.Select>

                                            <Form.Control.Feedback type="invalid">
                                                {getFieldError(
                                                    "gender"
                                                )}
                                            </Form.Control.Feedback>

                                        </FloatingLabel>

                                    </Col>

                                    {/* T-SHIRT */}

                                    <Col
                                        xs={12}
                                        md={6}
                                    >

                                        <FloatingLabel
                                            label="T-Shirt Size *"
                                        >

                                            <Form.Select
                                                name="tShirtSize"
                                                value={
                                                    formData.tShirtSize
                                                }
                                                onChange={
                                                    handleChange
                                                }
                                                onBlur={
                                                    handleBlur
                                                }
                                                isInvalid={isFieldInvalid(
                                                    "tShirtSize"
                                                )}
                                            >

                                                <option value="">
                                                    Select size
                                                </option>

                                                <option value="Youth S">
                                                    Youth S
                                                </option>

                                                <option value="Youth M">
                                                    Youth M
                                                </option>

                                                <option value="Youth L">
                                                    Youth L
                                                </option>

                                                <option value="Adult S">
                                                    Adult S
                                                </option>

                                                <option value="Adult M">
                                                    Adult M
                                                </option>

                                                <option value="Adult L">
                                                    Adult L
                                                </option>

                                                <option value="Adult XL">
                                                    Adult XL
                                                </option>

                                                <option value="Adult XXL">
                                                    Adult XXL
                                                </option>

                                                <option value="Adult XXXL">
                                                    Adult XXXL
                                                </option>

                                            </Form.Select>

                                            <Form.Control.Feedback type="invalid">
                                                {getFieldError(
                                                    "tShirtSize"
                                                )}
                                            </Form.Control.Feedback>

                                        </FloatingLabel>

                                    </Col>

                                </Row>

                                <hr className="my-5" />

                                {/* =====================================================
                                    SECTION 2
                                ===================================================== */}

                                <h5 className="text-black fw-bold mb-4">
                                    2. Parent / Guardian Information
                                </h5>

                                <Row className="g-3">

                                    {/* PARENT NAME */}

                                    <Col
                                        xs={12}
                                        md={6}
                                    >

                                        <FloatingLabel
                                            label="Parent / Guardian Full Name *"
                                        >

                                            <Form.Control
                                                type="text"
                                                name="parentName"
                                                value={
                                                    formData.parentName
                                                }
                                                onChange={
                                                    handleChange
                                                }
                                                onBlur={
                                                    handleBlur
                                                }
                                                placeholder="Parent Name"
                                                maxLength={80}
                                                isInvalid={isFieldInvalid(
                                                    "parentName"
                                                )}
                                            />

                                            <Form.Control.Feedback type="invalid">
                                                {getFieldError(
                                                    "parentName"
                                                )}
                                            </Form.Control.Feedback>

                                        </FloatingLabel>

                                    </Col>

                                    {/* RELATIONSHIP */}

                                    <Col
                                        xs={12}
                                        md={6}
                                    >

                                        <FloatingLabel
                                            label="Relationship to Participant *"
                                        >

                                            <Form.Select
                                                name="relationship"
                                                value={
                                                    formData.relationship
                                                }
                                                onChange={
                                                    handleChange
                                                }
                                                onBlur={
                                                    handleBlur
                                                }
                                                isInvalid={isFieldInvalid(
                                                    "relationship"
                                                )}
                                            >

                                                <option value="">
                                                    Select relationship
                                                </option>

                                                <option value="Father">
                                                    Father
                                                </option>

                                                <option value="Mother">
                                                    Mother
                                                </option>

                                                <option value="Guardian">
                                                    Legal Guardian
                                                </option>

                                                <option value="Other">
                                                    Other
                                                </option>

                                            </Form.Select>

                                            <Form.Control.Feedback type="invalid">
                                                {getFieldError(
                                                    "relationship"
                                                )}
                                            </Form.Control.Feedback>

                                        </FloatingLabel>

                                    </Col>

                                    {/* PHONE */}

                                    <Col
                                        xs={12}
                                        md={6}
                                    >

                                        <FloatingLabel
                                            label="Primary Phone Number *"
                                        >

                                            <Form.Control
                                                type="tel"
                                                name="phone"
                                                value={
                                                    formData.phone
                                                }
                                                onChange={
                                                    handleChange
                                                }
                                                onBlur={
                                                    handleBlur
                                                }
                                                placeholder="Phone Number"
                                                inputMode="numeric"
                                                maxLength={10}
                                                isInvalid={isFieldInvalid(
                                                    "phone"
                                                )}
                                            />

                                            <Form.Control.Feedback type="invalid">
                                                {getFieldError(
                                                    "phone"
                                                )}
                                            </Form.Control.Feedback>

                                        </FloatingLabel>

                                    </Col>

                                    {/* EMAIL */}

                                    <Col
                                        xs={12}
                                        md={6}
                                    >

                                        <FloatingLabel
                                            label="Email Address *"
                                        >

                                            <Form.Control
                                                type="email"
                                                name="email"
                                                value={
                                                    formData.email
                                                }
                                                onChange={
                                                    handleChange
                                                }
                                                onBlur={
                                                    handleBlur
                                                }
                                                placeholder="Email"
                                                maxLength={120}
                                                isInvalid={isFieldInvalid(
                                                    "email"
                                                )}
                                            />

                                            <Form.Control.Feedback type="invalid">
                                                {getFieldError(
                                                    "email"
                                                )}
                                            </Form.Control.Feedback>

                                        </FloatingLabel>

                                    </Col>

                                    {/* ADDRESS */}

                                    <Col xs={12}>

                                        <FloatingLabel
                                            label="Home Address *"
                                        >

                                            <Form.Control
                                                as="textarea"
                                                name="address"
                                                value={
                                                    formData.address
                                                }
                                                onChange={
                                                    handleChange
                                                }
                                                onBlur={
                                                    handleBlur
                                                }
                                                placeholder="Home Address"
                                                maxLength={
                                                    MAX_ADDRESS_LENGTH
                                                }
                                                style={{
                                                    height: "110px",
                                                }}
                                                isInvalid={isFieldInvalid(
                                                    "address"
                                                )}
                                            />

                                            <Form.Control.Feedback type="invalid">
                                                {getFieldError(
                                                    "address"
                                                )}
                                            </Form.Control.Feedback>

                                        </FloatingLabel>

                                        <div className="text-end mt-1">
                                            <small className="text-muted">
                                                {
                                                    formData.address
                                                        .length
                                                }/
                                                {
                                                    MAX_ADDRESS_LENGTH
                                                }
                                            </small>
                                        </div>

                                    </Col>

                                </Row>

                                <hr className="my-5" />

                                {/* =====================================================
                                    SECTION 3
                                ===================================================== */}

                                <h5 className="text-black fw-bold mb-4">
                                    3. Emergency Contact Details
                                </h5>

                                <Row className="g-3">

                                    {/* EMERGENCY NAME */}

                                    <Col
                                        xs={12}
                                        md={4}
                                    >

                                        <FloatingLabel
                                            label="Contact Name *"
                                        >

                                            <Form.Control
                                                type="text"
                                                name="emergencyName"
                                                value={
                                                    formData.emergencyName
                                                }
                                                onChange={
                                                    handleChange
                                                }
                                                onBlur={
                                                    handleBlur
                                                }
                                                placeholder="Contact Name"
                                                maxLength={80}
                                                isInvalid={isFieldInvalid(
                                                    "emergencyName"
                                                )}
                                            />

                                            <Form.Control.Feedback type="invalid">
                                                {getFieldError(
                                                    "emergencyName"
                                                )}
                                            </Form.Control.Feedback>

                                        </FloatingLabel>

                                    </Col>

                                    {/* EMERGENCY RELATIONSHIP */}

                                    <Col
                                        xs={12}
                                        md={4}
                                    >

                                        <FloatingLabel
                                            label="Relationship *"
                                        >

                                            <Form.Control
                                                type="text"
                                                name="emergencyRelationship"
                                                value={
                                                    formData.emergencyRelationship
                                                }
                                                onChange={
                                                    handleChange
                                                }
                                                onBlur={
                                                    handleBlur
                                                }
                                                placeholder="Relationship"
                                                maxLength={50}
                                                isInvalid={isFieldInvalid(
                                                    "emergencyRelationship"
                                                )}
                                            />

                                            <Form.Control.Feedback type="invalid">
                                                {getFieldError(
                                                    "emergencyRelationship"
                                                )}
                                            </Form.Control.Feedback>

                                        </FloatingLabel>

                                    </Col>

                                    {/* EMERGENCY PHONE */}

                                    <Col
                                        xs={12}
                                        md={4}
                                    >

                                        <FloatingLabel
                                            label="Emergency Phone *"
                                        >

                                            <Form.Control
                                                type="tel"
                                                name="emergencyPhone"
                                                value={
                                                    formData.emergencyPhone
                                                }
                                                onChange={
                                                    handleChange
                                                }
                                                onBlur={
                                                    handleBlur
                                                }
                                                placeholder="Phone"
                                                inputMode="numeric"
                                                maxLength={10}
                                                isInvalid={isFieldInvalid(
                                                    "emergencyPhone"
                                                )}
                                            />

                                            <Form.Control.Feedback type="invalid">
                                                {getFieldError(
                                                    "emergencyPhone"
                                                )}
                                            </Form.Control.Feedback>

                                        </FloatingLabel>

                                    </Col>

                                </Row>

                                <hr className="my-5" />

                                {/* =====================================================
                                    SECTION 4
                                ===================================================== */}

                                <h5 className="text-black fw-bold mb-4">
                                    4. Medical & Health Information
                                </h5>

                                <Row className="g-3">

                                    {/* MEDICAL */}

                                    <Col xs={12}>

                                        <FloatingLabel
                                            label="Medical Conditions or Allergies"
                                        >

                                            <Form.Control
                                                as="textarea"
                                                name="medicalConditions"
                                                value={
                                                    formData.medicalConditions
                                                }
                                                onChange={
                                                    handleChange
                                                }
                                                onBlur={
                                                    handleBlur
                                                }
                                                placeholder="Medical Conditions"
                                                maxLength={
                                                    MAX_MEDICAL_LENGTH
                                                }
                                                style={{
                                                    height: "120px",
                                                }}
                                                isInvalid={isFieldInvalid(
                                                    "medicalConditions"
                                                )}
                                            />

                                            <Form.Control.Feedback type="invalid">
                                                {getFieldError(
                                                    "medicalConditions"
                                                )}
                                            </Form.Control.Feedback>

                                        </FloatingLabel>

                                        <small className="text-muted">
                                            Leave blank if none.
                                        </small>

                                    </Col>

                                    {/* MEDICATIONS */}

                                    <Col xs={12}>

                                        <FloatingLabel
                                            label="Regular Medications"
                                        >

                                            <Form.Control
                                                as="textarea"
                                                name="medications"
                                                value={
                                                    formData.medications
                                                }
                                                onChange={
                                                    handleChange
                                                }
                                                onBlur={
                                                    handleBlur
                                                }
                                                placeholder="Medications"
                                                maxLength={
                                                    MAX_MEDICATION_LENGTH
                                                }
                                                style={{
                                                    height: "120px",
                                                }}
                                                isInvalid={isFieldInvalid(
                                                    "medications"
                                                )}
                                            />

                                            <Form.Control.Feedback type="invalid">
                                                {getFieldError(
                                                    "medications"
                                                )}
                                            </Form.Control.Feedback>

                                        </FloatingLabel>

                                        <small className="text-muted">
                                            Leave blank if none.
                                        </small>

                                    </Col>

                                    {/* LIMITATIONS */}

                                    <Col xs={12}>

                                        <FloatingLabel
                                            label="Physical Limitations or Past Injuries"
                                        >

                                            <Form.Control
                                                as="textarea"
                                                name="limitations"
                                                value={
                                                    formData.limitations
                                                }
                                                onChange={
                                                    handleChange
                                                }
                                                onBlur={
                                                    handleBlur
                                                }
                                                placeholder="Physical Limitations"
                                                maxLength={
                                                    MAX_LIMITATIONS_LENGTH
                                                }
                                                style={{
                                                    height: "120px",
                                                }}
                                                isInvalid={isFieldInvalid(
                                                    "limitations"
                                                )}
                                            />

                                            <Form.Control.Feedback type="invalid">
                                                {getFieldError(
                                                    "limitations"
                                                )}
                                            </Form.Control.Feedback>

                                        </FloatingLabel>

                                        <small className="text-muted">
                                            Leave blank if none.
                                        </small>

                                    </Col>

                                </Row>

                                <hr className="my-5" />

                                {/* =====================================================
                                    SECTION 5
                                ===================================================== */}

                                <h5 className="text-black fw-bold mb-4">
                                    5. Competition Category
                                </h5>

                                <Form.Group>

                                    <Form.Label className="fw-semibold">
                                        Select Age Bracket
                                        <span className="text-danger">
                                            {" "}*
                                        </span>
                                    </Form.Label>

                                    <div className="d-flex flex-column flex-md-row gap-3">

                                        {/* DIVISION A */}

                                        <Form.Check
                                            type="radio"
                                            label="Division A (5–7)"
                                            name="division"
                                            value="Division A"
                                            checked={
                                                formData.division ===
                                                "Division A"
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            onBlur={
                                                handleBlur
                                            }
                                            disabled={
                                                Number(
                                                    formData.age
                                                ) < 5 ||
                                                Number(
                                                    formData.age
                                                ) > 7
                                            }
                                        />

                                        {/* DIVISION B */}

                                        <Form.Check
                                            type="radio"
                                            label="Division B (8–10)"
                                            name="division"
                                            value="Division B"
                                            checked={
                                                formData.division ===
                                                "Division B"
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            onBlur={
                                                handleBlur
                                            }
                                            disabled={
                                                Number(
                                                    formData.age
                                                ) < 8 ||
                                                Number(
                                                    formData.age
                                                ) > 10
                                            }
                                        />

                                        {/* DIVISION C */}

                                        <Form.Check
                                            type="radio"
                                            label="Division C (11–13)"
                                            name="division"
                                            value="Division C"
                                            checked={
                                                formData.division ===
                                                "Division C"
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            onBlur={
                                                handleBlur
                                            }
                                            disabled={
                                                Number(
                                                    formData.age
                                                ) < 11 ||
                                                Number(
                                                    formData.age
                                                ) > 13
                                            }
                                        />

                                        {/* DIVISION D */}

                                        <Form.Check
                                            type="radio"
                                            label="Division D (14–17)"
                                            name="division"
                                            value="Division D"
                                            checked={
                                                formData.division ===
                                                "Division D"
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            onBlur={
                                                handleBlur
                                            }
                                            disabled={
                                                Number(
                                                    formData.age
                                                ) < 14 ||
                                                Number(
                                                    formData.age
                                                ) > 17
                                            }
                                        />

                                        {/* DIVISION E */}

                                        <Form.Check
                                            type="radio"
                                            label="Division E (18 Above)"
                                            name="division"
                                            value="Division E"
                                            checked={
                                                formData.division ===
                                                "Division E"
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            onBlur={
                                                handleBlur
                                            }
                                            disabled={
                                                Number(
                                                    formData.age
                                                ) < 18
                                            }
                                        />

                                    </div>

                                    {touched.division &&
                                        errors.division && (
                                            <div className="text-danger small mt-2">
                                                {
                                                    errors.division
                                                }
                                            </div>
                                        )}

                                </Form.Group>

                                <hr className="my-5" />

                                {/* =====================================================
                                    SECTION 6
                                ===================================================== */}

                                <h5 className="text-black fw-bold mb-4">
                                    6. Liability Waiver & Consent
                                </h5>

                                <Card className="bg-light border-0 mb-4">

                                    <Card.Body>

                                        <p className="fw-semibold">
                                            By checking the box below,
                                            you agree to the following:
                                        </p>

                                        <ol className="mb-0">

                                            <li className="mb-2">
                                                I give permission for my participant
                                                to participate in the Kids
                                                Fitness Competition.
                                            </li>

                                            <li className="mb-2">
                                                I certify that my participant is
                                                physically fit and capable of
                                                participating in physical
                                                activities.
                                            </li>

                                            <li className="mb-2">
                                                I understand that physical
                                                activities may involve
                                                inherent risks.
                                            </li>

                                            <li className="mb-2">
                                                I release the event organizers
                                                from liability to the extent
                                                permitted by applicable law.
                                            </li>

                                            <li>
                                                I grant permission for photos
                                                and videos taken during the
                                                event to be used for
                                                promotional purposes.
                                            </li>

                                        </ol>

                                    </Card.Body>

                                </Card>

                                {/* WAIVER CHECKBOX */}

                                <Form.Check
                                    type="checkbox"
                                    name="waiverAgreed"
                                    checked={
                                        formData.waiverAgreed
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    onBlur={
                                        handleBlur
                                    }
                                    isInvalid={isFieldInvalid(
                                        "waiverAgreed"
                                    )}
                                    label={
                                        <>
                                            I am the parent/legal guardian
                                            and I accept the terms listed
                                            above.
                                            <span className="text-danger">
                                                {" "}*
                                            </span>
                                        </>
                                    }
                                    className="mb-4"
                                />

                                {touched.waiverAgreed &&
                                    errors.waiverAgreed && (
                                        <div className="text-danger small mt-1 mb-3">
                                            {
                                                errors.waiverAgreed
                                            }
                                        </div>
                                    )}

                                {/* =====================================================
                                    SUBMIT
                                ===================================================== */}

                                <div className="d-grid mt-4">

                                    <Button
                                        type="submit"
                                        variant="dark"
                                        size="lg"
                                        disabled={
                                            isSubmitting
                                        }
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Spinner
                                                    animation="border"
                                                    size="sm"
                                                    className="me-2"
                                                />
                                                Submitting...
                                            </>
                                        ) : (
                                            "Continue to pay"
                                        )}
                                    </Button>

                                </div>

                            </Form>

                        </Card.Body>

                    </Card>

                </Col>

            </Row>

        </Container>
    );
};

export default TrainHighKidsChampionship;