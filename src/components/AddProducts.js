import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import CtaButton from "../components/CtaButton";
import Box from "@mui/material/Box";
import "../css/InputField.css";
import "../css/CtaButton.css";
import "../css/AddProducts.css";

function AddInventory() {
  const [productCategory, setProductCategory] = useState("");

  const handleCategoryChange = (event) => {
    setProductCategory(event.target.value);
  };

  const drawerWidth = 280;

  return (
    <div className="box">
      <Box sx={{ display: "flex" }}>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 10,
            mt: 17,
            mb: 12,
            mr: 3,
            ml: `${drawerWidth}px`,
            width: `calc(100% - ${drawerWidth}px)`,
            backgroundColor: "white",
            borderRadius: "24px",
          }}
        >
          <h2>Products Details</h2>
          <Box sx={{ mb: 8 }}>
            <TextField
              id="filled-product-id"
              label="Enter Product ID"
              variant="filled"
              fullWidth
            />
          </Box>
          <Box sx={{ mb: 8 }}>
            <TextField
              id="filled-product-name"
              label="Product Name"
              variant="filled"
              fullWidth
            />
          </Box>
          <Box sx={{ mb: 8 }}>
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
              label="Selling Price"
              variant="filled"
              fullWidth
            />
          </Box>
          <Box className="cta-container">
            <CtaButton ctaName="Add" />
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default AddInventory;
