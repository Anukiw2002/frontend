import React from "react";
import Button from "@mui/material/Button";

function CtaButton(prop) {
  return (
    <div>
      <Button variant="contained">{prop.ctaName}</Button>
    </div>
  );
}

export default CtaButton;
