import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import CtaButton from "../components/CtaButton";
import Box from "@mui/material/Box";
import "../css/InputField.css";
import "../css/CtaButton.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";

function AddProduct() {
  // State variables
  const [productID, setProductID] = useState("");
  const [productName, setProductName] = useState("");
  const [categoryID, setCategoryID] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate(); // Initialize useNavigate

  // Fetch categories from the server when the component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/categories");
        setCategories(response.data); // Assuming the data is an array of categories
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, []);

  // Handle category selection
  const handleCategoryChange = (event) => {
    const selectedCategoryID = event.target.value;
    setCategoryID(selectedCategoryID);

    // Find the corresponding category name
    const selectedCategory = categories.find(
      (category) => category.categoryID === selectedCategoryID
    );
    if (selectedCategory) {
      setCategoryName(selectedCategory.categoryName);
    }
  };

  const handleSubmit = async (event) => {
    if (event) event.preventDefault();

    try {
      const productResponse = await axios.post(
        "http://localhost:3001/api/products",
        {
          productID,
          productName,
          categoryID,
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

      // Navigate to product listing page
      navigate("/show-products");
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
              select
              label="Select Category ID"
              variant="filled"
              fullWidth
              value={categoryID}
              onChange={handleCategoryChange}
            >
              {categories.map((category) => (
                <MenuItem key={category.categoryID} value={category.categoryID}>
                  {category.categoryID}
                </MenuItem>
              ))}
            </TextField>
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
              label="Product Category"
              variant="filled"
              value={categoryName}
              fullWidth
              disabled
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
