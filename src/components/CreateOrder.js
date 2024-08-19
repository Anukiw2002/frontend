import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

function CreateOrder() {
  const drawerWidth = 280;
  const navigate = useNavigate();

  const [order, setOrder] = useState({
    orderID: "",
    orderDate: "",
    totalPrice: "",
    customerID: "",
    items: [{ productName: "", quantity: "", price: "" }],
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setOrder({ ...order, [name]: value });
  };

  const handleItemChange = (index, event) => {
    const { name, value } = event.target;
    const newItems = [...order.items];
    newItems[index] = { ...newItems[index], [name]: value };
    setOrder({ ...order, items: newItems });
  };

  const handleAddItem = () => {
    setOrder({
      ...order,
      items: [...order.items, { productName: "", quantity: "", price: "" }],
    });
  };

  const handleRemoveItem = (index) => {
    const newItems = order.items.filter((_, i) => i !== index);
    setOrder({ ...order, items: newItems });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you would usually send the data to the server
    console.log("Order submitted:", order);

    // Example POST request
    fetch("http://localhost:3001/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Order created successfully:", data);
        navigate("/orderhistory");
      })
      .catch((error) => {
        console.error("Error creating order:", error);
      });
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
              label="Order ID"
              variant="outlined"
              fullWidth
              margin="normal"
              name="orderID"
              value={order.orderID}
              onChange={handleChange}
              required
            />
            <TextField
              label="Order Date"
              variant="outlined"
              fullWidth
              margin="normal"
              name="orderDate"
              value={order.orderDate}
              onChange={handleChange}
              type="date"
              InputLabelProps={{ shrink: true }}
              required
            />
            <TextField
              label="Total Price"
              variant="outlined"
              fullWidth
              margin="normal"
              name="totalPrice"
              value={order.totalPrice}
              InputProps={{ startAdornment: "Rs." }}
              onChange={handleChange}
              required
            />
            <TextField
              label="Customer ID"
              variant="outlined"
              fullWidth
              margin="normal"
              name="customerID"
              value={order.customerID}
              onChange={handleChange}
              required
            />

            <div>
              <h3>Order Items</h3>
              {order.items.map((item, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <TextField
                    label="Product Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="productName"
                    value={item.productName}
                    onChange={(e) => handleItemChange(index, e)}
                    required
                  />
                  <TextField
                    label="Quantity"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="quantity"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, e)}
                    type="number"
                    required
                  />
                  <TextField
                    label="Price"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="price"
                    value={item.price}
                    onChange={(e) => handleItemChange(index, e)}
                    InputProps={{ startAdornment: "Rs." }}
                    required
                  />
                  <Button
                    onClick={() => handleRemoveItem(index)}
                    variant="outlined"
                    color="error"
                    sx={{ mt: 1 }}
                  >
                    Remove Item
                  </Button>
                </Box>
              ))}
              <Button
                onClick={handleAddItem}
                variant="contained"
                sx={{ mt: 2 }}
              >
                Add Item
              </Button>
            </div>

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
