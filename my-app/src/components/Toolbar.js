// Toolbar.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faSignOutAlt,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import "../components-css/Toolbar.css";

const Toolbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("hashedUserID"); // Clear the stored ID on logout
    navigate("/");
  };

  const navigateToMain = () => {
    const hashedUserID = localStorage.getItem("hashedUserID");
    if (hashedUserID) {
      navigate(`/main/${hashedUserID}`);
    } else {
      navigate("/"); // Navigate to login if no hashedUserID found
    }
  };

  const handlePostService = () => {
    alert("Post Service Clicked!"); // Placeholder for actual functionality
  };

  return (
    <div className="toolbar">
      <div className="toolbar-title" onClick={navigateToMain}>
        ServiceSwap
      </div>
      <div className="toolbar-actions">
        <button onClick={handlePostService}>
          <FontAwesomeIcon icon={faPlus} /> Post Service
        </button>
        <button onClick={handleLogout}>
          <FontAwesomeIcon icon={faSignOutAlt} /> Logout
        </button>
        <button className="profile-icon">
          <FontAwesomeIcon icon={faUser} />
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
