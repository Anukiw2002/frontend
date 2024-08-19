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
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function OrderHistory() {
  const drawerWidth = 280;
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/orders")
      .then((response) => {
        console.log("API response:", response.data);
        setOrders(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSeeMore = (id) => {
    navigate(`/orderdetails/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/update-order/${id}`);
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/api/orders/${id}`)
      .then((res) => {
        console.log(res);
        setOrders(orders.filter((order) => order._id !== id));
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
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order._id}>
                    <TableCell>
                      {order.orderDate
                        ? new Date(order.orderDate).toLocaleDateString()
                        : "N/A"}
                    </TableCell>
                    <TableCell>{order.orderID || "N/A"}</TableCell>
                    <TableCell>
                      {order.totalPrice != null
                        ? `Rs. ${order.totalPrice.toFixed(2)}`
                        : "N/A"}
                    </TableCell>

                    <TableCell>
                      <Button onClick={() => handleEdit(order._id)}>
                        <EditIcon />
                      </Button>
                      <Button onClick={() => handleDelete(order._id)}>
                        <DeleteIcon />
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="text"
                        color="primary"
                        onClick={() => handleSeeMore(order._id)}
                      >
                        See More
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

export default OrderHistory;
