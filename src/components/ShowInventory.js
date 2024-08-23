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
  // console.log(groupedProducts);

  const handleEdit = (id) => {
    navigate(`/update-product/${id}`);
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/api/products/${id}`)
      .then((res) => {
        console.log(res);
        setProducts(products.filter((product) => product._id !== id)); // Remove the deleted customer from state
      })
      .catch((err) => console.log(err));
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
                  <TableCell>Category ID</TableCell>
                  <TableCell>Category Name</TableCell>
                  <TableCell>Product ID</TableCell>
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
                      <TableCell>{product.productID}</TableCell>
                      <TableCell>{product.productName}</TableCell>
                      <TableCell>{product.quantity}</TableCell>
                      <TableCell>
                        <Button onClick={() => handleEdit(product._id)}>
                          <EditIcon />
                        </Button>
                        <Button onClick={() => handleDelete(product._id)}>
                          <DeleteIcon />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
}

export default ShowInventory;
