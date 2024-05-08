import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import "../components-css/AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    // Add any logout logic you might need here
    navigate("/");
  };

  return (
    <div className="admin-dashboard">
      <button className="logout-button" onClick={handleLogout}>
        <FontAwesomeIcon icon={faSignOutAlt} /> Logout
      </button>
      <h1>Admin Dashboard</h1>
      <div className="admin-sections">
        <div className="admin-section">
          <h2>Tickets Management</h2>
          <p>Review and manage user submitted tickets.</p>
          <button onClick={() => handleNavigate("/adminTicketManagement")}>
            Manage Tickets
          </button>
        </div>
        <div className="admin-section">
          <h2>Services Approval</h2>
          <p>Approve or reject new service submissions.</p>
          <button onClick={() => handleNavigate("/adminServiceApproval")}>
            Approve Services
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
