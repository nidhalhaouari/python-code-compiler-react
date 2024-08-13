// App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Convertion from './Convertion';
import Login from './Login';
import Register from './Register';
import Profile from './Profile';
import Compilateur from './Compilateur';
import PrivateRoute from './PrivateRoute';
import useToken from './useToken';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const { token, setToken } = useToken();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute
              element={<Profile token={token ?? ''} setToken={setToken} />}
              token={token}
            />
          }
        />
        <Route
          path="/convertion"
          element={<PrivateRoute element={<Convertion />} token={token} />}
        />
        <Route
          path="/compilateur"
          element={<PrivateRoute element={<Compilateur />} token={token} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
