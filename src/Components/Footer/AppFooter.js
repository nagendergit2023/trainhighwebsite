import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { AiOutlineHome, AiOutlineUser } from "react-icons/ai";
import { LuCalendarCheck, LuDumbbell } from "react-icons/lu";
import { PiBowlFood } from "react-icons/pi";
import { GoHome } from "react-icons/go";
import { PiPersonSimpleBold } from "react-icons/pi";
import { CiCircleList } from "react-icons/ci";
import "./AppFooter.css";

const BottomAppBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const pathname = location.pathname;
  const isTrainerRoute = pathname.includes("/trainers/");

  const buttons = isTrainerRoute
    ? [
        { path: "/trainers/dashboard", label: "Dashboard", icon: <GoHome /> },
        { path: "/trainers/members", label: "Clients", icon: <PiPersonSimpleBold /> },
        { path: "/trainers/templates", label: "Templates", icon: <CiCircleList /> },
        { path: "/trainers/account", label: "Profile", icon: <AiOutlineUser /> },
      ]
    : [
        { path: "/members/dashboard", label: "Home", icon: <GoHome /> },
        { path: "/members/workout", label: "Workout", icon: <LuDumbbell /> },
        { path: "/members/classes", label: "Classes", icon: <LuCalendarCheck /> },
        { path: "/members/nutrition", label: "Nutrition", icon: <PiBowlFood /> },
        { path: "/members/account", label: "Profile", icon: <AiOutlineUser /> },
      ];

  return (
    <div className="bottom-bar">
      {buttons.map((btn) => (
        <button
          key={btn.path}
          className={`bottom-btn ${pathname === btn.path || pathname.startsWith(`${btn.path}/`) ? "active" : ""}`}
          onClick={() => navigate(btn.path)}
        >
          <span className="icon">{btn.icon}</span>
          <small>{btn.label}</small>
        </button>
      ))}
    </div>
  );
};

export default BottomAppBar;

