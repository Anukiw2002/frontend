import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import CtaButton from "../components/CtaButton";
import NavBar from "../components/NavBar";
import Box from "@mui/material/Box";
import "../css/InputField.css";
import "../css/CtaButton.css";

function AddInventory() {
  const [productCategory, setProductCategory] = useState("");

  const handleCategoryChange = (event) => {
    setProductCategory(event.target.value);
  };

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
        <h2>Add Stock levels</h2>
        <Box className="container">
          <TextField
            id="date-picker"
            label="Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            variant="filled"
            fullWidth
          />{" "}
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            id="filled-product-id"
            label="Enter Product ID"
            variant="filled"
            fullWidth
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            id="filled-product-name"
            label="Product Name"
            variant="filled"
            fullWidth
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            id="filled-product-category"
            select
            label="Select Product Category"
            value={productCategory}
            onChange={handleCategoryChange}
            variant="filled"
            fullWidth
          >
            <MenuItem value="Electronics">Electronics</MenuItem>
            <MenuItem value="Apparel">Apparel</MenuItem>
            <MenuItem value="Home Goods">Home Goods</MenuItem>
          </TextField>
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            id="filled-inventory-quantity"
            label="Inventory Quantity"
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

export default AddInventory;
