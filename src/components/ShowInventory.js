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

function ShowInventory() {
  const drawerWidth = 280;
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch products
    axios
      .get("http://localhost:3001/api/products")
      .then((response) => {
        // console.log("Fetched Products:", response.data); // Log products
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the products!", error);
      });

    // Fetch categories
    axios
      .get("http://localhost:3001/api/categories")
      .then((response) => {
        // console.log("Fetched Categories:", response.data); // Log categories
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the categories!", error);
      });
  }, []);

  const handleAddButtonClick = () => {
    navigate("/add-product");
  };

  // Group products by categoryID and include categoryName
  const groupedProducts = products.reduce((acc, product) => {
    const { categoryID } = product;
    const category = categories.find(
      (cat) => String(cat.categoryID) === String(categoryID)
    );
    if (!acc[categoryID]) {
      acc[categoryID] = {
        categoryID,
        categoryName: category ? category.categoryName : "N/A",
        products: [],
      };
    }

    acc[categoryID].products.push(product);
    return acc;
  }, {});
  console.log(groupedProducts);

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
                  <TableCell>Category ID</TableCell>
                  <TableCell>Category Name</TableCell>
                  <TableCell>Product Names</TableCell>
                  <TableCell>Quantities</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.values(groupedProducts).map((group) =>
                  group.products.map((product, idx) => (
                    <TableRow key={`${group.categoryID}-${idx}`}>
                      {idx === 0 ? (
                        <>
                          <TableCell rowSpan={group.products.length}>
                            {group.categoryID}
                          </TableCell>
                          <TableCell rowSpan={group.products.length}>
                            {group.categoryName}
                          </TableCell>
                        </>
                      ) : null}
                      <TableCell>{product.productName}</TableCell>
                      <TableCell>{product.quantity}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Button
          onClick={handleAddButtonClick}
          variant="contained"
          sx={{
            position: "absolute",
            bottom: "20px",
            right: "20px",
          }}
        >
          Add Product
        </Button>
      </Box>
    </Box>
  );
}

export default ShowInventory;
