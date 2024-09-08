import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import CtaButton from "../components/CtaButton";
import "../css/InputField.css";
import "../css/CtaButton.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddInventory() {
  const [productID, setProductID] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [quantity, setQuantity] = useState(""); 
  const [date, setDate] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    if (event) event.preventDefault();

    const isoDate = new Date(date).toISOString();

    axios
      .post("http://localhost:3001/api/products/add-sellingprice-date", {
        productID,
        date: isoDate,
        sellingPrice,
        quantity, 
      })
      .then(() => {
        setProductID("");
        setDate("");
        setSellingPrice("");
        setQuantity(""); 

        navigate("/show-employee-inventory");
      })
      .catch((err) =>
        console.error(
          "Error submitting form:",
          err.response ? err.response.data : err.message
        )
      );
  };

  const drawerWidth = 280;

  return (
    <Box sx={{ backgroundColor: "lightgray", minHeight: "100vh" }}>
      <Box sx={{ display: "flex" }}>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 10,
            mt: 2,
            mb: 2,
            mr: 3,
            ml: `${drawerWidth}px`,
            width: `calc(100% - ${drawerWidth}px)`,
            backgroundColor: "white",
            borderRadius: "24px",
          }}
        >
          <h2>Add Inventory</h2>

          <Box sx={{ mb: 3 }}>
            <TextField
              id="filled-product-id"
              label="Enter Product ID"
              variant="filled"
              fullWidth
              value={productID}
              onChange={(e) => setProductID(e.target.value)}
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <TextField
              id="selling-price"
              label="Selling Price"
              variant="filled"
              fullWidth
              value={sellingPrice}
              onChange={(e) => setSellingPrice(e.target.value)}
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <TextField
              id="quantity"
              label="Quantity"
              variant="filled"
              fullWidth
              value={quantity} 
              onChange={(e) => setQuantity(e.target.value)} 
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <TextField
              id="date"
              label="Date"
              variant="filled"
              type="date"
              fullWidth
              value={date}
              onChange={(e) => setDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Box>
          <Box className="cta-container">
            <CtaButton ctaName="Add" onClick={handleSubmit} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default AddInventory;
