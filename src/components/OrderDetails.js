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
      .get(`http://localhost:3001/api/orders/${id}/details`)
      .then((response) => {
        console.log("API response:", response.data); 
        const order = response.data;

        const subtotal = order.orderDetails.reduce((acc, item) => {
          return acc + item.price * item.quantity;
        }, 0);

        if (subtotal !== order.totalprice) {
          axios
            .put(`http://localhost:3001/api/orders/${id}`, {
              totalprice: subtotal,
            })
            .then((updateResponse) => {
              setOrderData({ ...order, totalprice: subtotal });
            })
            .catch((error) =>
              console.error("Error updating order subtotal:", error)
            );
        } else {
          setOrderData(order);
        }
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
                  <h3>
                    Customer ID: {orderData.customer_ID?.customer_ID || "N/A"}
                  </h3>
                </div>
                <div>
                  <h3>Order ID: {orderData.orderID}</h3>
                  <h3>
                    Customer Name:{" "}
                    {`${orderData.customer_ID?.fName || "N/A"} ${
                      orderData.customer_ID?.lName || ""
                    }`}
                  </h3>
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
                        <strong>
                          Rs.{" "}
                          {orderData.totalprice
                            ? orderData.totalprice.toFixed(2)
                            : "N/A"}
                        </strong>
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
