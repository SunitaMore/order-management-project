import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
//import "./Login.css"; // Import CSS file
//import loginImage from "./loginimage.jpeg"; // Replace with the actual image path


const Login = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/login", { username, password });

      if (response.data.success) {
        localStorage.setItem("isAuthenticated", "true");
        setIsAuthenticated(true);
        navigate("/dashboard");
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError("Invalid username or password.");
    }
  };

  return (
    <div className="login-container">
    <div className="login-box">
      {/* Left Image Section */}
      {/* <div className="login-image-container">
        <img src={loginImage} alt="Login" className="login-image" />
      </div> */}

      {/* Right Login Form Section */}
      <div className="login-form-container">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleLogin} className="login-form">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="login-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login-input"
          />
          <button type="submit" className="login-button">Login</button>
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </div>
  </div>
);
};

export default Login;
