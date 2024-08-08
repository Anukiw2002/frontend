import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

function CreateOrder() {
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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "lightgray",
        p: 4,
        borderRadius: "8px",
        mt: 5,
        mx: "auto",
        maxWidth: "600px",
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
  );
}

export default CreateOrder;
