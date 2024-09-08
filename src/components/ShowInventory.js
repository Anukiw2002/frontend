import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function ShowEmployeeInventory() {
  const drawerWidth = 280;
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch products
    axios
      .get("http://localhost:3001/api/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the products!", error);
      });
  }, []);

  const handleAddButtonClick = () => {
    navigate("/add-inventory");
  };

  const handleEdit = (id) => {
    navigate(`/update-inventory/${id}`);
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/api/products/${id}`)
      .then((res) => {
        console.log(res);
        setProducts(products.filter((product) => product._id !== id)); // Remove the deleted product from state
      })
      .catch((err) => console.log(err));
  };

  const formatDate = (isoDate) => {
    if (!isoDate) {
      return ""; // Return an empty string or a default value if isoDate is undefined
    }
    return isoDate.split("T")[0]; // Extracts the date in YYYY-MM-DD format
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
          <h2>Product List</h2>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Product ID</TableCell>
                  <TableCell>Product</TableCell>
                  <TableCell>Category ID</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Price (Rs.)</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product._id}>
                    <TableCell>{product.productID}</TableCell>
                    <TableCell>{product.productName}</TableCell>
                    <TableCell>{product.categoryID}</TableCell>
                    <TableCell>{formatDate(product.date)}</TableCell>
                    <TableCell>{product.quantity}</TableCell>
                    <TableCell>Rs. {product.sellingPrice}</TableCell>{" "}
                    {/* Display price in Rs. */}
                    <TableCell>
                      <Button onClick={() => handleEdit(product._id)}>
                        <EditIcon />
                      </Button>
                      <Button onClick={() => handleDelete(product._id)}>
                        <DeleteIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
}

export default ShowEmployeeInventory;
