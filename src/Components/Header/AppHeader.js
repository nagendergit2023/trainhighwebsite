import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { AiOutlineArrowLeft } from "react-icons/ai";
import "./AppHeader.css";
import image1 from "../../assets/images/train_high_gym_logo.png";

const routeTitles = {
  "/": "Home",
  "/profile": "Profile",
  "/workout": "Workout",
  "/meal-plan": "Meal Plan",
  "/exercise-list": "Exercises",
};

const BottomAppBar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const title =
    routeTitles[location.pathname] ||
    location.pathname
      .split("/")
      .pop()
      .replace(/-/g, " ");

  return (
    <div className="top-bar">
      <Container>
        <Row className="align-items-center">

          {/* Back Button */}
          <Col xs={2}>
            <AiOutlineArrowLeft
              size={24}
              className="text-white cursor-pointer"
              onClick={() => navigate(-1)}
            />
          </Col>

          {/* Dynamic Title */}
          <Col xs={8} className="text-center">
            <img src={image1} className="navbar-logo-app-header" alt="Logo" />
          </Col>

          <Col xs={2}></Col>
        </Row>
      </Container>
    </div>
  );
};

export default BottomAppBar;
