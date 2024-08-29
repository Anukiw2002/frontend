import React, { useState } from "react";
import TextField from "@mui/material/TextField";
//import MenuItem from "@mui/material/MenuItem";
import CtaButton from "../components/CtaButton";
import Box from "@mui/material/Box";
import "../css/InputField.css";
import "../css/CtaButton.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const [productID, setProductID] = useState("");
  const [productName, setProductName] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [categoryID, setCategoryID] = useState("");

  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (event) => {
    if (event) event.preventDefault();

    try {
      // Check if the category exists or create it if not
      const categoryResponse = await axios.post(
        "http://localhost:3001/api/categories/check-or-create",
        {
          categoryID,
          categoryName,
        }
      );

      if (categoryResponse.status === 200 || categoryResponse.status === 201) {
        // Proceed to add or update the product
        const productResponse = await axios.post(
          "http://localhost:3001/api/products",
          {
            productID,
            productName,
            categoryID,
            quantity,
          }
        );

        console.log(
          "Product added or updated successfully!",
          productResponse.data
        );

        // Clear the form
        setProductID("");
        setProductName("");
        setCategoryID("");
        setCategoryName("");
        setQuantity("");

        navigate("/show-products");
      }
    } catch (err) {
      console.error(
        "Error submitting form:",
        err.response ? err.response.data : err.message
      );
    }
  };

  const drawerWidth = 280;

  return (
    <Box sx={{ backgroundColor: "lightgray" }}>
      <Box sx={{ display: "flex" }}>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 10,
            mt: 6,
            mb: 6,
            mr: 3,
            ml: `${drawerWidth}px`,
            width: `calc(100% - ${drawerWidth}px)`,
            backgroundColor: "white",
            borderRadius: "24px",
          }}
        >
          <h2>Products Details</h2>
          <Box sx={{ mb: 3 }}>
            <TextField
              id="filled-category-id"
              label="Enter Category ID"
              variant="filled"
              fullWidth
              value={categoryID}
              onChange={(e) => setCategoryID(e.target.value)}
            />
          </Box>
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
          <Box sx={{ mb: 3 }}>
            <TextField
              id="filled-product-name"
              label="Product Name"
              variant="filled"
              fullWidth
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </Box>
          <Box sx={{ mb: 3 }}>
            <TextField
              id="filled-product-category"
              label="Select Product Category"
              variant="filled"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              fullWidth
            ></TextField>
          </Box>
          <Box sx={{ mb: 2 }}>
            <TextField
              id="filled-selling-price"
              label="Quantity"
              variant="filled"
              fullWidth
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
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

export default AddProduct;
