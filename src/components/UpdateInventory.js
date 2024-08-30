import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import CtaButton from "../components/CtaButton";
import Box from "@mui/material/Box";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function UpdateInventory() {
  const { id } = useParams();
  const navigate = useNavigate();
  const drawerWidth = 280;

  const [productID, setProductID] = useState("");
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/products/${id}`)
      .then((res) => {
        const product = res.data;
        setProductID(product.productID || "");
        setProductName(product.productName || "");
        setQuantity(product.quantity || "");
        setSellingPrice(product.sellingPrice || "");
      })
      .catch((err) => {
        console.error("Error fetching product data:", err);
      });
  }, [id]);

  const handleSubmit = (event) => {
    if (event) event.preventDefault();

    axios
      .put(`http://localhost:3001/api/products/update-inventory/${id}`, {
        productID,
        productName,
        quantity,
        sellingPrice,
      })
      .then((result) => {
        console.log(result);
        navigate("/show-employee-inventory");
      })
      .catch((err) =>
        console.error(
          "Error updating product:",
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
          <h2>Update Product</h2>
          <Box sx={{ mb: 4 }}>
            <TextField
              id="prodyctID"
              label="Product ID"
              variant="filled"
              fullWidth
              value={productID}
              onChange={(e) => setProductID(e.target.value)}
            />
          </Box>
          <Box sx={{ mb: 4 }}>
            <TextField
              id="productName"
              label="Product Name"
              variant="filled"
              fullWidth
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </Box>
          <Box sx={{ mb: 4 }}>
            <TextField
              id="quantity"
              label="Quantity"
              variant="filled"
              fullWidth
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </Box>
          <Box sx={{ mb: 4 }}>
            <TextField
              id="sellingPrice"
              label="Selling Price"
              variant="filled"
              fullWidth
              value={sellingPrice}
              onChange={(e) => setSellingPrice(e.target.value)}
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

export default UpdateInventory;
