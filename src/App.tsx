import { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";

import reactLogo from "./assets/react.svg";
import "./App.css";
import NavBar from "./NavBar";
import Convertion from "./Convertion";
import Login from "./Login"; // Assurez-vous que ce fichier existe
import Register from "./Register";
import useToken from "./useToken";
import Profile from "./Profile";
import Compilateur from "./Compilateur";

function App() {
  const { token, removeToken, setToken } = useToken();

const handleToken = () => {
  setToken("");
};
  return (
    <>
      <BrowserRouter>
        {!token && token !== "" && token !== undefined ? 
          <Login setToken={setToken} />
         : (
          <Routes>
            <Route path="/convertion" element={<Convertion />} />
            <Route path="/compilateur" element={<Compilateur />} />
            <Route path="/profile" element={<Profile token={token}  setToken={setToken} />} />
            <Route path="/" element={<Login setToken={setToken} />} />
            <Route
              path="/profile"
              element={<Profile token={token} setToken={setToken} />}
            />
            <Route path="/Register" element={<Register />} />
          </Routes>
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
