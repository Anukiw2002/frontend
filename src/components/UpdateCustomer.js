import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import CtaButton from "../components/CtaButton";
import Box from "@mui/material/Box";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function UpdateCustomer() {
  const { id } = useParams(); // Get the customer ID from the URL
  const navigate = useNavigate();
  const drawerWidth = 280;

  const [fName, setfName] = useState("");
  const [lName, setlName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [contact_number, setContactNumber] = useState("");

  // Fetch the customer data when the component mounts
  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/customers/${id}`)
      .then((res) => {
        const customer = res.data;
        setfName(customer.fName || "");
        setlName(customer.lName || "");
        setEmail(customer.email || "");
        setAddress(customer.address || "");
        setContactNumber(customer.contact_number || "");
      })
      .catch((err) => {
        console.error("Error fetching customer data:", err);
        // Optionally, you can set an error state here and display it to the user
      });
  }, [id]);

  const handleSubmit = (event) => {
    if (event) event.preventDefault();

    axios
      .put(`http://localhost:3001/api/customers/${id}`, {
        fName,
        lName,
        email,
        address,
        contact_number,
      })
      .then((result) => {
        console.log(result);
        navigate("/customers"); // Redirect to customer list after updating
      })
      .catch((err) =>
        console.error(
          "Error updating customer:",
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
          <h2>Update Customer</h2>
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
            <CtaButton onClick={handleSubmit} ctaName="Update" />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default UpdateCustomer;
