import React from "react";
import bg from "../pictures/bgImage.png";
import logo from "../pictures/Logo.png";
import "../css/SignUp.css";
import InputField from "./InputField";
import Button from "./Button";
import { Link } from "react-router-dom";

function LogInManager() {
  return (
    <div className="signUpContainer">
      <img src={bg} alt="Background" className="bgImage2" />
      <div className="formContainer">
        <p className="signUp">Log in</p>
        <InputField detail="Manager ID:" inputLabel="Enter your ID..." />
        <InputField detail="Password:" inputLabel="Enter your password..." />
        <Button action="Log In" link="/show-products" />
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
