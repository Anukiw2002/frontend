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
import axios from "axios";

function OrderHistory() {
  const drawerWidth = 280;
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  const handleRowClick = (id) => {
    navigate(`/orderhistory/${id}`);
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/orders")
      .then((response) => {
        console.log("API response:", response.data);
        setOrders(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  /*const orders = [
    {
      id: 1,
      name: "Lewis Hamilton",
      quantity: "150",
      date: "2024-08-01",
      price: "$2000",
    },
    {
      id: 2,
      name: "George Russell",
      quantity: "119",
      date: "2024-08-02",
      price: "$1800",
    },
    // Add more order data as needed
  ];*/

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
            ml: `${drawerWidth}px`,
            width: `calc(100% - ${drawerWidth}px)`,
            backgroundColor: "white",
            borderRadius: "24px",
          }}
          className="table-wrapper"
        >
          <h2>Order History</h2>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Order Date</TableCell>
                  <TableCell>Order ID</TableCell>
                  <TableCell>Total Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow
                    key={order._id}
                    onClick={() => handleRowClick(order._id)}
                    style={{ cursor: "pointer" }}
                  >
                    <TableCell>
                      {new Date(order.orderDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{order.orderID}</TableCell>
                    <TableCell>${order.totalPrice.toFixed(2)}</TableCell>
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

export default OrderHistory;
