import React, { useState } from "react";
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
  Table,
} from "react-bootstrap";

function CalculateBMI() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [resultMessage, setResultMessage] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("1"); // 1: Male, 2: Female
  const [activityLevel, setActivityLevel] = useState("1");
  const [result, setResult] = useState(null);

  const handleCalculate = (e) => {
    e.preventDefault();

    const h = parseFloat(height);
    const w = parseFloat(weight);
    const a = parseInt(age);

    if (!h || !w || !a || h <= 0 || w <= 0 || a <= 0) {
      setResult({ message: "Please enter valid height, weight, and age." });
      return;
    }

    // BMI Calculation
    const heightM = h / 100;
    const bmiValue = (w / (heightM * heightM)).toFixed(1);

    let bmiCategory = "";
    if (bmiValue < 18.5) bmiCategory = "underweight range (less than 18.5)";
    else if (bmiValue < 25) bmiCategory = "healthy range (18.5–24.9)";
    else if (bmiValue < 30) bmiCategory = "overweight range (25–29.9)";
    else bmiCategory = "obese range (30 and above)";

    // BMR Calculation
    let bmr;
    if (gender === "1") {
      bmr = 10 * w + 6.25 * h - 5 * a + 5;
    } else {
      bmr = 10 * w + 6.25 * h - 5 * a - 161;
    }

    // Activity factor
    const activityFactors = {
      1: 1.375,
      2: 1.2,
      3: 1.375,
      4: 1.55,
      5: 1.725,
      6: 1.9,
    };
    const tdee = (bmr * activityFactors[activityLevel]).toFixed(0);

    setResult({
      bmiValue,
      bmiCategory,
      bmr: bmr.toFixed(0),
      tdee,
    });
  };
  return (
    <section className="py-lg-5 py-3">
      <Container>
        <Row className="justify-content-center ">
          <Col lg={6}>
            <h2 className="section-title">calculate your BMI</h2>
            <p className="text-center px-lg-5 px-2 mb-5">
              Effortless and fast BMI calculation to help you track your health,
              manage weight, and stay fit easily.
            </p>
          </Col>
        </Row>
        <Row className="justify-content-center">
          {/* <Col lg={6}>
                <Table striped bordered hover>
      <thead>
        <tr>
          <th>BMI</th>
          <th>WEIGHT STATUS</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Below 18.5</td>
          <td>Underweight</td>
        </tr>
        <tr>
          <td>18.5 - 24.9</td>
          <td>Healthy</td>
        </tr>
        <tr>
          <td>25.0 - 29.9</td>
          <td>Overweight</td>
        </tr>
        <tr>
          <td>30.0 - and Above</td>
          <td>Obese</td>
        </tr>
        <tr>
            <td colSpan={2} className="text-center">
            BMR - Body Metabolic Rate / BMI - Body Mass Index
            </td>
        </tr>
      </tbody>
    </Table>
            </Col> */}
          <Col lg={6}>
            <Form className="mb-4" onSubmit={handleCalculate}>
              <Row>
                <Col lg={6}>
                  <FloatingLabel
                    controlId="heightInput"
                    label="Height (in cm)"
                    className="mb-3"
                  >
                    <Form.Control
                      type="number"
                      placeholder="180"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>
                <Col lg={6}>
                  <FloatingLabel
                    controlId="weightInput"
                    label="Weight (in kg)"
                    className="mb-3"
                  >
                    <Form.Control
                      type="number"
                      placeholder="75"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>
                <Col lg={6}>
                  <FloatingLabel
                    controlId="ageInput"
                    label="Age"
                    className="mb-3"
                  >
                    <Form.Control
                      type="number"
                      placeholder="25"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>
                <Col lg={6}>
                  <FloatingLabel
                    controlId="genderInput"
                    label="Gender"
                    className="mb-3"
                  >
                    <Form.Select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <option value="1">Male</option>
                      <option value="2">Female</option>
                      <option value="3">Other</option>
                    </Form.Select>
                  </FloatingLabel>
                </Col>
                <Col lg={12}>
                  <FloatingLabel
                    controlId="activityInput"
                    label="Select your activity level"
                    className="mb-3"
                  >
                    <Form.Select
                      value={activityLevel}
                      onChange={(e) => setActivityLevel(e.target.value)}
                    >
                      <option value="1">
                        Light exercise / sports 1–3 days/week
                      </option>
                      <option value="2">
                        Little or no Exercise / desk job
                      </option>
                      <option value="3">
                        Light exercise / sports 1–3 days/week
                      </option>
                      <option value="4">
                        Moderate Exercise, sports 3–5 days/week
                      </option>
                      <option value="5">
                        Heavy Exercise / sports 6–7 days/week
                      </option>
                      <option value="6">
                        Very heavy exercise / physical job / training 2x/day
                      </option>
                    </Form.Select>
                  </FloatingLabel>
                </Col>
                <Col lg={6} className="mx-auto">
                  <Button
                    variant="dark"
                    className="text-capitalize py-lg-2 w-100 btn-lg rounded"
                    type="submit"
                  >
                    Calculate
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
        {result && (
          <Row>
            <Col lg={12}>
              <p className="text-center">
                {result.message ? (
                  <strong>{result.message}</strong>
                ) : (
                  <>
                    <strong>Your BMI is {result.bmiValue}</strong>, which falls
                    in the <strong>{result.bmiCategory}</strong>.<br />
                    Your estimated BMR is <strong>{result.bmr} kcal/day</strong>
                    .<br />
                    Based on your activity level, your daily calorie need (TDEE)
                    is approximately <strong>{result.tdee} kcal/day</strong>.
                  </>
                )}
              </p>
            </Col>
          </Row>
        )}
      </Container>
    </section>
  );
}

export default CalculateBMI;
