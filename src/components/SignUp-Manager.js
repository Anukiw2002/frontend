import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import bg from "../pictures/bgImage.png";
import logo from "../pictures/Logo.png";
import "../css/SignUp.css";
import Button from "./Button";
import axios from "axios";

const ManagerRegistration = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setError(""); // Clear error on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("it works");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3001/api/employees", {
        username: formData.username.trim(),
        password: formData.password.trim(),
      });

      console.log("Registration successful:", response.data);
      navigate("/loginmanager");
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("Failed to create manager");
      }
      console.error("Error during registration:", error);
    }
  };

  return (
    <div className="signUpContainer">
      <img src={bg} alt="Background" className="bgImage2" />
      <div className="formContainer">
        <p className="signUp">Sign Up</p>
        <form onSubmit={handleSubmit}>
          {/* Directly using input fields */}
          <div className="inputField">
            <p className="detail">Manager ID:</p>
            <div className="box">
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="inputLabel"
                placeholder="Enter your ID..."
                required
              />
            </div>
          </div>
          <div className="inputField">
            <p className="detail">Password:</p>
            <div className="box">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="inputLabel"
                placeholder="Enter your password..."
                required
              />
            </div>
          </div>
          <div className="inputField">
            <p className="detail">Re-enter Password:</p>
            <div className="box">
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="inputLabel"
                placeholder="Re-enter your password..."
                required
              />
            </div>
          </div>
          {error && <p className="error">{error}</p>}
          <Button action="Sign Up" type="submit" />
        </form>
        <p className="loginPrompt">
          Already have an account? <Link to="/loginmanager"> Login </Link>
        </p>
      </div>
      <div className="logoContainer">
        <img src={logo} alt="Logo" className="logo" />
      </div>
    </div>
  );
};

export default ManagerRegistration;
