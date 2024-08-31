import React from "react";
import { Link } from "react-router-dom";
import bg from "../pictures/bgImage.png";
import logo from "../pictures/Logo.png";
import "../css/SignUp.css";
import InputField from "./InputField";
import Button from "./Button";

function SignUpManager() {
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
    } else {
      // Proceed with sign up logic
    }
  };

  return (
    <div className="signUpContainer">
      <img src={bg} alt="Background" className="bgImage2" />
      <div className="formContainer">
        <p className="signUp">Sign Up</p>
        <InputField
          detail="Manager ID:"
          inputLabel="Enter your ID..."
        />
        <InputField
          detail="Password:"
          inputLabel="Enter your password..."
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <InputField
          detail="Re-enter Password:"
          inputLabel="Enter your password..."
          type="password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          error={passwordError}
        />
        <Button action="Sign Up" link="/show-products" onClick={handleSignUp} />
        <p className="loginPrompt">
          Already have an account? <Link to="/loginmanager"> Login </Link>
        </p>
      </div>
      <div className="logoContainer">
        <img src={logo} alt="Logo" className="logo" />
      </div>
    </div>
  );
}

export default SignUpManager;
