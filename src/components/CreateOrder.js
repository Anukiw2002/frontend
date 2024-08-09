import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

function CreateOrder() {
  const drawerWidth = 280;
  const navigate = useNavigate();

  const [order, setOrder] = useState({
    name: "",
    quantity: "",
    date: "",
    price: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setOrder({ ...order, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you would usually send the data to the server
    console.log("Order submitted:", order);
    // Navigate to order history or another page
    navigate("/orderhistory");
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
            mb: 6,
            mr: 3,
            ml: `${drawerWidth}px`,
            width: `calc(100% - ${drawerWidth}px)`,
            backgroundColor: "white",
            borderRadius: "24px",
          }}
        >
          <h2>Create New Order</h2>
          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <TextField
              label="Order Name"
              variant="outlined"
              fullWidth
              margin="normal"
              name="name"
              value={order.name}
              onChange={handleChange}
              required
            />
            <TextField
              label="Quantity"
              variant="outlined"
              fullWidth
              margin="normal"
              name="quantity"
              value={order.quantity}
              onChange={handleChange}
              type="number"
              required
            />
            <TextField
              label="Order Date"
              variant="outlined"
              fullWidth
              margin="normal"
              name="date"
              value={order.date}
              onChange={handleChange}
              type="date"
              InputLabelProps={{ shrink: true }}
              required
            />
            <TextField
              label="Price"
              variant="outlined"
              fullWidth
              margin="normal"
              name="price"
              value={order.price}
              onChange={handleChange}
              type="number"
              InputProps={{ startAdornment: "$" }}
              required
            />
            <Box sx={{ mt: 2 }}>
              <Button type="submit" variant="contained">
                Submit Order
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
}

export default CreateOrder;
