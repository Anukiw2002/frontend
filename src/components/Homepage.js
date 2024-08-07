import React from "react";
import bg from "../pictures/bgImage.png";
import logo from "../pictures/Logo.png";
import Button from "./Button";
import "../css/HomePage.css";

function Homepage() {
  return (
    <div className="container">
      <img src={bg} alt="BackgroundImage" className="bgImage" />
      <img src={logo} alt="logo" className="logo" />
      <div className="buttonContainer">
        <Button action="Manager" link="/signup-manager" />
        <Button action="Employee" link="/signup-employee" />
      </div>
    </div>
  );
}

export default Homepage;
