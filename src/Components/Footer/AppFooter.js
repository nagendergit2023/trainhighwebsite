import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "bootstrap/dist/css/bootstrap.min.css";
import {
  AiOutlineHome,
  AiOutlineUser,
} from "react-icons/ai";
import { LuDumbbell } from "react-icons/lu"; 
import { PiBowlFood } from "react-icons/pi";
import "./AppFooter.css"; // 👈 import the CSS file

const BottomAppBar = () => {
  const navigate = useNavigate(); // 👈 initialize navigate
  const [active, setActive] = useState("/members/dashboard");

  const buttons = [
    { name: "/members/dashboard", label: "Home", icon: <AiOutlineHome /> },
    { name: "/members/workout", label: "Workout", icon: <LuDumbbell /> },
    { name: "/members/nutrition", label: "Nutrition", icon: <PiBowlFood /> },
    { name: "/members/account", label: "Account", icon: <AiOutlineUser /> },
  ];

   const handleClick = (path) => {
    setActive(path);
    navigate(path); // 👈 redirect user
  };

  return (
    <div className="bottom-bar">
      {buttons.map((btn) => (
        <button
          key={btn.name}
          className={`bottom-btn ${active === btn.name ? "active" : ""}`}
          onClick={() => handleClick(btn.name)}
        >
          <span className="icon">{btn.icon}</span>
          <small>{btn.label}</small>
        </button>
      ))}
    </div>
  );
};

export default BottomAppBar;
