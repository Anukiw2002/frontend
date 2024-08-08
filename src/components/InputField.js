import React from "react";
import "../css/InputField.css";

function InputField(props) {
  return (
    <div className="inputField">
      <p className="detail">{props.detail}</p>
      <div className="box">
        <input
          type="text"
          className="inputLabel"
          placeholder={props.inputLabel}
        />
      </div>
    </div>
  );
}

export default InputField;
