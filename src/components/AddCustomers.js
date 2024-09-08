import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import CtaButton from "../components/CtaButton";
import Box from "@mui/material/Box";
import axios from "axios";

function AddCustomer() {
  const drawerWidth = 280;

  const [customer_ID, setCustomerID] = useState("");
  const [fName, setfName] = useState("");
  const [lName, setlName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [contact_number, setContactNumber] = useState("");

  const handleSubmit = (event) => {
    if (event) event.preventDefault();

    axios
      .post("http://localhost:3001/api/customers", {
        customer_ID,
        fName,
        lName,
        email,
        address,
        contact_number,
      })
      .then((result) => {
        console.log(result);
        
        setCustomerID("");
        setfName("");
        setlName("");
        setEmail("");
        setAddress("");
        setContactNumber("");
        
      })
      .catch((err) =>
        console.error(
          "Error submitting form:",
          err.response ? err.response.data : err.message
        )
      );
  };

  return (
    <Box sx={{ backgroundColor: "lightgray" }}>
      <Box sx={{ display: "flex" }}>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 10,
            mt: 5,
            mb: 5,
            mr: 3,
            ml: `${drawerWidth}px`,
            width: `calc(100% - ${drawerWidth}px)`,
            backgroundColor: "white",
            borderRadius: "24px",
          }}
        >
          <h2>Add New Customer</h2>
          <Box sx={{ mb: 4 }}>
            <TextField
              id="customerID"
              label="Customer ID"
              variant="filled"
              fullWidth
              value={customer_ID}
              onChange={(e) => setCustomerID(e.target.value)}
            />
          </Box>
          <Box sx={{ mb: 4 }}>
            <TextField
              id="fName"
              label="First Name"
              variant="filled"
              fullWidth
              value={fName}
              onChange={(e) => setfName(e.target.value)}
            />
          </Box>
          <Box sx={{ mb: 4 }}>
            <TextField
              id="lName"
              label="Last Name"
              variant="filled"
              fullWidth
              value={lName}
              onChange={(e) => setlName(e.target.value)}
            />
          </Box>
          <Box sx={{ mb: 4 }}>
            <TextField
              id="contactNumber"
              label="Contact Number"
              variant="filled"
              fullWidth
              value={contact_number}
              onChange={(e) => setContactNumber(e.target.value)}
            />
          </Box>
          <Box sx={{ mb: 4 }}>
            <TextField
              id="email"
              label="Email Address"
              variant="filled"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Box>
          <Box sx={{ mb: 4 }}>
            <TextField
              id="address"
              label="Address"
              variant="filled"
              fullWidth
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Box>
          <Box className="cta-container">
            <CtaButton onClick={handleSubmit} ctaName="Add" />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default AddCustomer;
