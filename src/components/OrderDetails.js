import React, { useState } from "react";
import Box from "@mui/material/Box";
import "../css/InputField.css";
import "../css/CtaButton.css";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

function OrderHistory() {
  const drawerWidth = 280;

  const navigate = useNavigate();


  const [orders, setOrders] = useState([
    {
      id: 1,
      date: "2024-08-01",
      items: [
        { name: "iPhone", quantity: "1", price: "$2000" },
        { name: "macbook", quantity: "1", price: "$1300" },
      ],
    },
  ]);

  const handleEdit = (id) => {
    console.log(`Edit order with id: ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Delete order with id: ${id}`);
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
            ml: `${drawerWidth}px`,
            width: `calc(100% - ${drawerWidth}px)`,
            backgroundColor: "white",
            borderRadius: "24px",
          }}
        >
          <h1>Order Details</h1>
          {orders.map((order) => (
            <Box key={order.id}>
              <h3>Order Date - {order.date}</h3>
              <h3>Customer ID - {order.id}</h3>
              <TableContainer component={Paper}>
                <Table>
                  <TableBody>
                    {order.items.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.price}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>
                          <Button onClick={() => handleEdit(order.id)}></Button>
                          <Button onClick={() => handleDelete(order.id)}></Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default OrderHistory;
