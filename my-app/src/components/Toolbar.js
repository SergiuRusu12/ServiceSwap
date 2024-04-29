import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faSignOutAlt,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import "../components-css/Toolbar.css";
import PostServiceModal from "./PostServiceModal";

const Toolbar = ({ onEditService, ...props }) => {
  const { refreshServices } = props;
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("hashedUserID");
    navigate("/");
  };

  const navigateToMain = () => {
    const hashedUserID = localStorage.getItem("hashedUserID");
    if (hashedUserID) {
      navigate(`/main/${hashedUserID}`);
    } else {
      navigate("/");
    }
  };

  const handlePostServiceClick = () => {
    setModalOpen(true);
  };

  const navigateToProfile = () => {
    const hashedUserID = localStorage.getItem("hashedUserID");
    if (hashedUserID) {
      const userID = atob(hashedUserID);
      navigate(`/user/${userID}`);
    }
  };

  return (
    <>
      <div className="toolbar">
        <div className="toolbar-title" onClick={navigateToMain}>
          ServiceSwap
        </div>
        <div className="toolbar-actions">
          <button onClick={handlePostServiceClick}>
            <FontAwesomeIcon icon={faPlus} /> Post Service
          </button>
          <button onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} /> Logout
          </button>
          <button className="profile-icon" onClick={navigateToProfile}>
            <FontAwesomeIcon icon={faUser} />
          </button>
        </div>
      </div>
      {isModalOpen && (
        <PostServiceModal
          isOpen={isModalOpen}
          setModalOpen={setModalOpen}
          refreshServices={refreshServices}
        />
      )}
    </>
  );
};

export default Toolbar;
