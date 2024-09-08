import React, { useState, useEffect, useContext } from "react";
import bg from "../pictures/bgImage.png";
import logo from "../pictures/Logo.png";
import "../css/SignUp.css";
import Button from "./Button";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "./AuthContext"; 

function LogInManager() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { loginAsManager } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault(); 
    try {
      console.log("Logging in...");
      const { data } = await axios.post(
        "http://localhost:3001/api/employees/verify",
        {
          username,
          password,
        }
      );

      localStorage.setItem("jwtToken", data.token);

      loginAsManager();

      window.location.href = "/show-products";
    } catch (error) {
      console.error("Login error:", error);
      console.log(error.response.data); 
      alert("Login failed. Please check your credentials.");
    }
  };

  useEffect(() => {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("jwtToken")}`;
  }, []);

  return (
    <div className="signUpContainer">
      <img src={bg} alt="Background" className="bgImage2" />
      <div className="formContainer">
        <p className="signUp">Log in</p>
        {/* Form with native input fields */}
        <form onSubmit={handleLogin}>
          <div className="inputField">
            <p className="detail">Username:</p>
            <div className="box">
              <input
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="inputLabel"
                placeholder="Enter your username..."
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="inputLabel"
                placeholder="Enter your password..."
                required
              />
            </div>
          </div>
          {/* Attach the handleLogin function to the button */}
          <Button action="Log In" type="submit" />
        </form>
        <p className="loginPrompt">
          Not registered yet? <Link to="/signup-manager"> Sign Up </Link>
        </p>
      </div>
      <div className="logoContainer">
        <img src={logo} alt="Logo" className="logo" />
      </div>
    </div>
  );
}

export default LogInManager;
