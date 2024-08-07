import React from "react";
import { useNavigate } from "react-router-dom";

function Button(props) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(props.link);
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "500px",
        height: "50px",
        background: "#26599F",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        borderRadius: "50px",
        marginTop: "60px",
        marginLeft: "50px",
        position: "relative",
        top: "50%",
        transform: "translateY(-50%)",
      }}
    >
      <button
        style={{
          width: "100%",
          height: "100%",
          textAlign: "center",
          color: "white",
          fontSize: "30px",
          fontFamily: "Cardo",
          fontWeight: "700",
          background: "transparent",
          border: "none",
          cursor: "pointer",
        }}
        onClick={handleClick}
      >
        {props.action}
      </button>
    </div>
  );
}

export default Button;
