import React from "react";
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
import "../css/OrderHistory.css";

function OrderHistory() {
  const drawerWidth = 280;
  const navigate = useNavigate();

  const handleRowClick = (id) => {
    navigate(`/orderhistory/${id}`);
  };

  const orders = [
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
    // Add more customer data as needed
  ];

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
                  <TableCell>Customer Name</TableCell>
                  <TableCell>Order ID</TableCell>
                  <TableCell>Order Quantity</TableCell>
                  <TableCell>Order Date</TableCell>
                  <TableCell>Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow
                    key={order.id}
                    onClick={() => handleRowClick(order.id)}
                    style={{ cursor: "pointer" }}
                  >
                    <TableCell>{order.name}</TableCell>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.quantity}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>{order.price}</TableCell>
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
