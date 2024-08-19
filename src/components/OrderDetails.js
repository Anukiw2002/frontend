import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
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

function OrderDetails() {
  const { id } = useParams();
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/orders/${id}`)
      .then((response) => {
        setOrderData(response.data);
      })
      .catch((error) => console.error("Error fetching order details:", error));
  }, [id]);

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
            <Box>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <h3>
                    Order Date:{" "}
                    {new Date(orderData.orderDate).toLocaleDateString()}
                  </h3>
                  <h3>Customer ID: {orderData.customer_ID}</h3>
                </div>
                <div>
                  <h3>Order ID: {orderData.orderID}</h3>
                  <h3>Customer Name: {orderData.fName || "N/A"}</h3>
                </div>
              </div>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Product Name</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell>Quantity</TableCell>
                      <TableCell>Total</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orderData.orderDetails.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.productName}</TableCell>
                        <TableCell>Rs. {item.price.toFixed(2)}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>
                          Rs. {(item.price * item.quantity).toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell colSpan={3} align="right">
                        <strong>Sub Total</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Rs. {orderData.totalPrice.toFixed(2)}</strong>
                      </TableCell>
                    </TableRow>
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
