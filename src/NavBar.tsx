/*import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  return (
    <>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <Link to="/Convertion">
            <img
              src="https://avepdf.com/images/text-to-pdf-rating.png"
              alt="Logo"
              style={{ width: "60px", height: "auto" }}
            />
          </Link>

          <span className="navbar-brand mb-0 h1">TEXT TO PDF</span>

          <Link to="/login">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40px"
              height="auto"
              fill="currentColor"
              className="bi bi-box-arrow-in-right"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0z"
              />
              <path
                fill-rule="evenodd"
                d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
              />
            </svg>
          </Link>
        </div>
      </nav>
    </>
  );
}

export default NavBar;*/
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./NavBar.css";

interface NavBarProps {
  token: () => void;
}

const NavBar: React.FC<NavBarProps> = (props) => {
  const navigate = useNavigate();

  const logMeOut = (): void => {
    axios({
      method: "POST",
      url: "http://127.0.0.1:5000/logout",
    })
      .then((response) => {
        props.token();
        localStorage.removeItem('email');
        navigate("/");      })
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

  const logged = localStorage.getItem('email');

  return (
    <>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <Link to="/Convertion">
            <img
              src="https://avepdf.com/images/text-to-pdf-rating.png"
              alt="Logo"
              style={{ width: "60px", height: "auto" }}
            />
          </Link>

          <div className="navbar-brand">
            <span className="mb-0 h3"></span>
          </div>

          <div className="navbar-buttons">
            {logged ? (
              <>
                <Link to="/profile" className="btn btn-outline-info">
                  Project
                </Link>
                <Link to="/Compilateur" className="btn btn-outline-success">
                    Compilateur
                </Link>
                <Link to="/Convertion" className="btn btn-outline-success">
              Convertion TTP
          </Link>
                <button className="btn btn-outline-danger" type="button" onClick={logMeOut}>
                  Logout
                </button>
     
         
              </>
            ) : (
              <button className="btn btn-outline-success" type="button" onClick={showLogin}>
                Login
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
