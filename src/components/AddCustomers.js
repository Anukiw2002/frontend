import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import CtaButton from "../components/CtaButton";
import NavBar from "../components/NavBar";
import Box from "@mui/material/Box";
import "../css/InputField.css";
import "../css/CtaButton.css";



function AddCustomer() {
  

  const drawerWidth = 240;

  return (
    <Box sx={{ display: "flex" }}>
      <NavBar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          ml: `${drawerWidth}px`,
          width: `calc(100% - ${drawerWidth}px)`,
        }}
      >
        <h2>Add New Customer </h2>
        <Box className="container">
          <TextField
            id="cutsomerName"
            label="Name"
            variant="filled"
            fullWidth
          />{" "}
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            id="customerNumber"
            label="Contact Number"
            variant="filled"
            fullWidth
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            id="email"
            label="Email Address"
            variant="filled"
            fullWidth
            onChange={(e) => {
              const email = e.target.value;
              const emailRegex = /^[^\s@]+@[^\s@]+\.[\s@]+$/;
              const isValidEmail = emailRegex.test(email);
              console.log(isValidEmail);
            }}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            id="customerAddress"
            label="Adress"
            variant="filled"
            fullWidth
          />
        </Box>
        <Box className="cta-container">
          <CtaButton ctaName="Add" />
        </Box>
      </Box>
    </Box>
  );
}

export default AddCustomer;
