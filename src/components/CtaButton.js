import React from "react";
import Button from "@mui/material/Button";

function CtaButton({ ctaName, onClick }) {
  return (
    <div>
      <Button variant="contained" onClick={onClick}>
        {ctaName}
      </Button>
    </div>
  );
}

export default CtaButton;
