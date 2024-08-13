import React from "react";
import { Link } from "react-router-dom";
import { FaProjectDiagram, FaCode, FaFilePdf, FaSignOutAlt, FaSignInAlt } from "react-icons/fa";
import "./Sidebar.css";

interface SidebarProps {
  show: boolean;
  onClose: () => void;
  logged: boolean;
  logMeOut: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ show, onClose, logged, logMeOut }) => {
  const sidebarClass = show ? "sidebar open" : "sidebar";

  return (
    <div className={sidebarClass}>
      <div className="sidebar-header">
        <h3>Menu</h3>
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
      </div>
      <div className="sidebar-content">
        {logged ? (
          <>
            <Link to="/profile" className="nav-link" onClick={onClose}>
              <FaProjectDiagram className="icon" /> Project
            </Link>
            <Link to="/Compilateur" className="nav-link" onClick={onClose}>
              <FaCode className="icon" /> Compilateur
            </Link>
            <Link to="/Convertion" className="nav-link" onClick={onClose}>
              <FaFilePdf className="icon" /> Convertion TTP
            </Link>
            <button
              className="nav-link btn"
              onClick={() => {
                logMeOut();
                onClose();
              }}
            >
              <FaSignOutAlt className="icon" /> Logout
            </button>
          </>
        ) : (
          <button className="nav-link btn" onClick={onClose}>
            <FaSignInAlt className="icon" /> Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
