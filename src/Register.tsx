import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [about, setAbout] = useState("");

  const navigate = useNavigate();

  const registrUser = () => {
    axios
      .post("http://127.0.0.1:5000/signup", {
        name: name,
        email: email,
        password: password,
        about: about
      })
      .then(function (response) {
        console.log(response);
        alert("c bn");
        navigate("/login");
      })
      .catch(function (error) {
        console.log(error, "error");
        if (error.response.status === 401) {
          alert("invalid credentials");
        }
      });
  };

  return (
    <>
      <div
        className="d-flex justify-content-center align-items-start vh-100"
        style={{ marginTop: "-50px" }}
      >
        <div className="d-flex justify-content-between w-75">
          <div className="w-50 d-flex align-items-center justify-content-center">
            <img
              src="/registre.webp"
              alt="Description de l'image"
              className="img-fluid"
              style={{ maxHeight: "500px" }}
            />
          </div>

          <form className="w-50 p-5 bg-light rounded shadow-lg mt-5">
            <div data-mdb-input-init className="form-outline mb-4">
              <input type="text" id="form3Example1" className="form-control" value={name} onChange={(e) => setName(e.target.value)}/>
              <label className="form-label">Full Name</label>
            </div>

            <div data-mdb-input-init className="form-outline mb-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="form3Example2"
                className="form-control"
              />
              <label className="form-label">Email address</label>
            </div>

            
            <div data-mdb-input-init className="form-outline mb-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="form3Example4"
                className="form-control"
              />
              <label className="form-label">Password</label>
            </div>
            <div data-mdb-input-init className="form-outline mb-4">
              <input
                type="text"
                id="form3Example3"
                value={about}

                className="form-control"
                onChange={(e) => setAbout(e.target.value)}

              />
              <label className="form-label">About</label>
            </div>


            <div className="d-flex justify-content-center">
              <button
                type="button"
                data-mdb-button-init
                data-mdb-ripple-init
                className="btn btn-primary mb-4"
                onClick={() => registrUser()}
              >
                Register
              </button>
            </div>

            <div className="text-center">
              <p>
                Already a member? <Link to="/">Sign in</Link>
              </p>
              <p>or sign up with:</p>
              <button
                type="button"
                data-mdb-button-init
                data-mdb-ripple-init
                className="btn btn-link btn-floating mx-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="auto"
                  fill="currentColor"
                  className="bi bi-facebook"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
                </svg>{" "}
              </button>

              <button
                type="button"
                data-mdb-button-init
                data-mdb-ripple-init
                className="btn btn-link btn-floating mx-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="auto"
                  fill="currentColor"
                  className="bi bi-google"
                  viewBox="0 0 16 16"
                >
                  <path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z" />
                </svg>{" "}
              </button>

              <button
                type="button"
                data-mdb-button-init
                data-mdb-ripple-init
                className="btn btn-link btn-floating mx-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="auto"
                  fill="currentColor"
                  className="bi bi-twitter-x"
                  viewBox="0 0 16 16"
                >
                  <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
                </svg>{" "}
              </button>

              <button
                type="button"
                data-mdb-button-init
                data-mdb-ripple-init
                className="btn btn-link btn-floating mx-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="auto"
                  fill="currentColor"
                  className="bi bi-github"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
                </svg>{" "}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
