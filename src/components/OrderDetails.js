import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
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
        console.log("API response:", response.data); // Log the response data
        const order = response.data;

        // Calculate the subtotal
        const subtotal = order.orderDetails.reduce((acc, item) => {
          return acc + item.price * item.quantity;
        }, 0);

        // Update the order's totalprice with the calculated subtotal
        if (subtotal !== order.totalprice) {
          axios
            .put(`http://localhost:3001/api/orders/${id}`, {
              totalprice: subtotal,
            })
            .then((updateResponse) => {
              // Set the updated order data with the correct subtotal
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
            ml: `${drawerWidth}px`,
            width: `calc(100% - ${drawerWidth}px)`,
            backgroundColor: "white",
            borderRadius: "24px",
          }}
        >
          <h1>Order Details</h1>
          {order ? (
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
                          <Button onClick={() => handleEdit(order.id)}>
                            <EditIcon />
                          </Button>
                          <Button onClick={() => handleDelete(order.id)}>
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
            <p>Order not found.</p>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default OrderHistory;
