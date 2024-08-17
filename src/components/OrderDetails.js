import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function OrderDetails() {
  const { id } = useParams();
  const [orderData, setOrderData] = useState(null);
  const [orderDetails, setOrderDetails] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/orders/${id}/details`)
      .then((response) => {
        setOrderData(response.data.order);
        setOrderDetails(response.data.orderDetails);
      })
      .catch((error) => console.error("Error fetching order details:", error));
  }, [id]);

  const handleEdit = (orderId) => {
    // Implement edit functionality
    console.log(`Edit order with id: ${orderId}`);
  };

  const handleDelete = (orderId) => {
    // Implement delete functionality
    console.log(`Delete order with id: ${orderId}`);
  };

  return (
    <Box sx={{ backgroundColor: "lightgray" }}>
      <Box sx={{ display: "flex" }}>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 10,
            mt: 17,
            mb: 18,
            mr: 3,
            ml: "280px",
            width: `calc(100% - 280px)`,
            backgroundColor: "white",
            borderRadius: "24px",
          }}
        >
          <h1>Order Details</h1>
          {orderData ? (
            <Box key={orderData._id}>
              <h3>
                Order Date -{" "}
                {new Date(orderData.orderDate).toLocaleDateString()}
              </h3>
              <h3>Customer ID - {orderData.customerID}</h3>
              <TableContainer component={Paper}>
                <Table>
                  <TableBody>
                    {orderDetails.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.productName}</TableCell>
                        <TableCell>${item.price.toFixed(2)}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>
                          <Button onClick={() => handleEdit(orderData._id)}>
                            <EditIcon />
                          </Button>
                          <Button onClick={() => handleDelete(orderData._id)}>
                            <DeleteIcon />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          ) : (
            <p>Loading order details...</p>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default OrderDetails;
