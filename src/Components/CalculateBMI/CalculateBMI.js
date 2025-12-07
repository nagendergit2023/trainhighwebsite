import React, { useState } from "react";
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
  Table,
  Modal,
} from "react-bootstrap";
import Notiflix from "notiflix";
import "./CalculateBMI.css";

const ACTIVITY_FACTORS = {
  2: 1.2,
  1: 1.375,
  4: 1.55,
  5: 1.725,
  6: 1.9,
};

// const DEFAULT_SEGMENTAL = {
//   leftArm: 0,
//   rightArm: 0,
//   leftLeg: 0,
//   rightLeg: 0,
//   trunk: 0,
// };

function CalculateBMI() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [activityLevel, setActivityLevel] = useState("");
  const [waist, setWaist] = useState("");
  const [hip, setHip] = useState("");
  const [result, setResult] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleCalculate = (e) => {
    e.preventDefault();

    const h = parseFloat(height);
    const w = parseFloat(weight);
    const a = parseInt(age);

    // VALIDATION — Show Notiflix only
    if (!h || !w || !a || !gender || !activityLevel) {
      Notiflix.Notify.failure("Please fill all required fields correctly.");
      return; // Do NOT open modal
    }

    // BMI
    const bmiValue = (w / Math.pow(h / 100, 2)).toFixed(1);

    const bmiCategory =
      bmiValue < 18.5
        ? "Underweight"
        : bmiValue < 25
        ? "Healthy"
        : bmiValue < 30
        ? "Overweight"
        : "Obese";

    // BMR
    const bmr =
      gender === "1"
        ? 10 * w + 6.25 * h - 5 * a + 5
        : 10 * w + 6.25 * h - 5 * a - 161;

    // TDEE
    const tdee = (bmr * ACTIVITY_FACTORS[activityLevel]).toFixed(0);

    // Body Fat %
    const bodyFat =
      gender === "1"
        ? (1.2 * bmiValue + 0.23 * a - 16.2).toFixed(1)
        : (1.2 * bmiValue + 0.23 * a - 5.4).toFixed(1);

    // Visceral Fat
    const visceralFat = (
      0.1 * bmiValue +
      0.03 * a +
      (gender === "1" ? 2 : 1)
    ).toFixed(1);

    // Waist-Hip Ratio
    const whr = waist && hip ? (waist / hip).toFixed(2) : "0";

    // Segmental Muscle Mass
    const segmentalAnalysis = {
      leftArm: (w * 0.035).toFixed(1),
      rightArm: (w * 0.035).toFixed(1),
      leftLeg: (w * 0.18).toFixed(1),
      rightLeg: (w * 0.18).toFixed(1),
      trunk: (w * 0.57).toFixed(1),
    };

    setResult({
      bmiValue,
      bmiCategory,
      bmr: bmr.toFixed(0),
      tdee,
      bodyFat,
      visceralFat,
      whr,
      segmentalAnalysis,
    });

    setShowModal(true); // OPEN MODAL ONLY IF VALID
  };

  return (
    <section className="py-lg-5 py-3">
      <Container>
        <Row className="justify-content-center mb-4">
          <Col lg={6} className="text-center">
            <h2 className="section-title">Body Analysis</h2>
            <p>
              Effortless and fast BMI/BMR calculation to help you track your
              health, manage weight, and stay fit easily.
            </p>
          </Col>
        </Row>

        <Row className="justify-content-center">
          {/* FORM */}
          <Col lg={6}>
            <Form className="mb-4" onSubmit={handleCalculate}>
              <Row>
                <Col lg={6}>
                  <FloatingLabel controlId="heightInput" label="Height (cm)" className="mb-3">
                    <Form.Control
                    placeholder=""
                      type="text"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>

                <Col lg={6}>
                  <FloatingLabel controlId="weightInput" label="Weight (kg)" className="mb-3">
                    <Form.Control
                    placeholder=""
                      type="text"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>

                <Col lg={6}>
                  <FloatingLabel controlId="ageInput" label="Age" className="mb-3">
                    <Form.Control
                    placeholder=""
                      type="text"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>

                <Col lg={6}>
                  <FloatingLabel controlId="genderInput" label="Gender" className="mb-3">
                    <Form.Select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <option value="">Select Gender</option>
                      <option value="1">Male</option>
                      <option value="2">Female</option>
                    </Form.Select>
                  </FloatingLabel>
                </Col>

                <Col lg={6}>
                  <FloatingLabel controlId="waistInput" label="Waist (cm)" className="mb-3">
                    <Form.Control
                    placeholder=""
                      type="text"
                      value={waist}
                      onChange={(e) => setWaist(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>

                <Col lg={6}>
                  <FloatingLabel controlId="hipInput" label="Hip (cm)" className="mb-3">
                    <Form.Control
                    placeholder=""
                      type="text"
                      value={hip}
                      onChange={(e) => setHip(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>

                <Col lg={12}>
                  <FloatingLabel controlId="activityInput" label="Activity Level" className="mb-3">
                    <Form.Select
                      value={activityLevel}
                      onChange={(e) => setActivityLevel(e.target.value)}
                    >
                      <option value="">Select Activity Level</option>
                      <option value="2">Little or no exercise</option>
                      <option value="1">Light exercise (1–3 days/week)</option>
                      <option value="4">Moderate exercise (3–5 days/week)</option>
                      <option value="5">Heavy exercise (6–7 days/week)</option>
                      <option value="6">Very heavy physical job</option>
                    </Form.Select>
                  </FloatingLabel>
                </Col>

                <Col lg={6} className="mx-auto">
                  <Button variant="dark" type="submit" className="w-100 py-2 btn-lg rounded">
                    Calculate
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>

      {/* MODAL POPUP */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Body Analysis Result</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>
            <strong>Your BMI is {result.bmiValue}</strong>, which falls
                    in the <strong>{result.bmiCategory}</strong>. Your estimated BMR is <strong>{result.bmr} kcal/day</strong>.
                    Your total body fat is <strong>{result.bodyFat} percent</strong>. Visceral Fat in your body fat is <strong>{result.visceralFat} percent</strong>.
                    Based on your activity level, your daily calorie need (TDEE)
                    is approximately <strong>{result.tdee} kcal/day</strong>.

          </p>
          <Table striped bordered hover size="sm" className="health-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>BMI</td><td>{result?.bmiValue || 0}</td></tr>
              <tr><td>BMR</td><td>{result?.bmr || 0} kcal/day</td></tr>
              <tr><td>TDEE</td><td>{result?.tdee || 0} kcal/day</td></tr>
              <tr><td>Body Fat %</td><td>{result?.bodyFat || 0}%</td></tr>
              <tr><td>Visceral Fat</td><td>{result?.visceralFat || 0}%</td></tr>
              <tr><td>Waist-Hip Ratio</td><td>{result?.whr || 0}</td></tr>

              <tr>
                <td>Segmental Analysis</td>
                <td>
                  {result?.segmentalAnalysis ? (
                    <>
                      L-Arm: {result.segmentalAnalysis.leftArm} kg,{" "}
                      R-Arm: {result.segmentalAnalysis.rightArm} kg <br />
                      L-Leg: {result.segmentalAnalysis.leftLeg} kg,{" "}
                      R-Leg: {result.segmentalAnalysis.rightLeg} kg <br />
                      Trunk: {result.segmentalAnalysis.trunk} kg
                    </>
                  ) : (
                    "0"
                  )}
                </td>
              </tr>
            </tbody>
          </Table>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
}

export default CalculateBMI;
