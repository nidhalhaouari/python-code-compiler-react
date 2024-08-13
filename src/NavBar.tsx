import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar";
import "./NavBar.css";
import { FaCode, FaFilePdf, FaProjectDiagram, FaSignOutAlt } from "react-icons/fa";

interface NavBarProps {
  token: () => void;
}

const NavBar: React.FC<NavBarProps> = (props) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const logMeOut = (): void => {
    axios({
      method: "POST",
      url: "http://127.0.0.1:5000/logout",
    })
      .then((response) => {
        props.token();
        localStorage.removeItem("email");
        navigate("/");
      })
      .catch((error: any) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  };

  const showLogin = (): void => {
    navigate("/");
  };

  const logged = localStorage.getItem("email");

  const toggleSidebar = (): void => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = (): void => {
    setSidebarOpen(false);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link to="/Convertion" className="navbar-brand">
            <img
              src="https://avepdf.com/images/text-to-pdf-rating.png"
              alt="Logo"
              style={{ width: "60px", height: "auto" }}
            />
          </Link>


          <div className="collapse navbar-collapse" id="navbarNav">
            <div className="navbar-nav d-flex justify-content-center w-100">
              {logged ? (
                <>
                  <Link to="/profile" className="nav-link mx-3">
                    <FaProjectDiagram className="icon" /> Project
                  </Link>
                  <Link to="/Compilateur" className="nav-link mx-3">
                    <FaCode className="icon" /> Compilateur
                  </Link>
                  <Link to="/Convertion" className="nav-link mx-3">
                    <FaFilePdf className="icon" /> Convertion TTP
                  </Link>
                </>
              ) : null}
            </div>
          </div>

          <div className="d-flex">
            {logged ? (
              <>
                <button
                  type="button"
                  onClick={logMeOut}
                  className="logout-button"
                >
                  <FaSignOutAlt className="icon" />
                </button>
               
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleSidebar}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-layout-text-sidebar-reverse"
              viewBox="0 0 16 16"
            >
              <path d="M12.5 3a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1zm0 3a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1zm.5 3.5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 .5-.5m-.5 2.5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1z" />
              <path d="M16 2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2zM4 1v14H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zm1 0h9a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5z" />
            </svg>
          </button>
              </>
            ) : (
              <button
                className="btn btn-outline-success"
                type="button"
                onClick={showLogin}
              >
                Login
              </button>
            )}
          </div>
        </div>
      </nav>

      <Sidebar
        show={sidebarOpen}
        onClose={closeSidebar}
        logged={!!logged}
        logMeOut={logMeOut}
      />
    </>
  );
};

export default NavBar;
