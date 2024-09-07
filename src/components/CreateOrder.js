import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

  const [customerExists, setCustomerExists] = useState(null); // State to track customer existence

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

  const handleCustomerIDBlur = async () => {
    if (!order.customerID.trim()) {
      setCustomerExists(null);
      return;
    }

    try {
      const customerResponse = await axios.get(
        `http://localhost:3001/api/customers/by-customID/${order.customerID}`
      );

      if (customerResponse.data && customerResponse.data._id) {
        setCustomerExists(true); // Customer exists
      } else {
        setCustomerExists(false); // Customer does not exist
      }
    } catch (error) {
      console.error("Error checking customer existence:", error.message);
      setCustomerExists(false); // In case of an error, assume customer doesn't exist
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!order.customerID.trim()) {
      alert("Please enter a valid Customer ID");
      return;
    }

    if (!customerExists) {
      alert("Customer does not exist. Please add the customer first.");
      return;
    }

    const calculatedTotalPrice = order.items.reduce((total, item) => {
      return total + parseFloat(item.price) * parseInt(item.quantity);
    }, 0);

    try {
      const customerResponse = await axios.get(
        `http://localhost:3001/api/customers/by-customID/${order.customerID}`
      );

      const customerObjectID = customerResponse.data._id;

      const formattedOrder = {
        orderID: order.orderID,
        orderDate: order.orderDate,
        totalPrice: calculatedTotalPrice,
        customer_ID: customerObjectID,
        orderDetails: order.items.map((item) => ({
          productName: item.productName,
          quantity: parseInt(item.quantity),
          price: parseFloat(item.price),
        })),
      };

      const response = await axios.post(
        "http://localhost:3001/api/orders",
        formattedOrder
      );
      console.log("Order created successfully:", response.data);
      navigate("/orderhistory");
    } catch (error) {
      console.error(
        "Error creating order:",
        error.response ? error.response.data : error.message
      );
      alert(error.response ? error.response.data.message : error.message);
    }
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
              label="Customer ID"
              variant="outlined"
              fullWidth
              margin="normal"
              name="customerID"
              value={order.customerID}
              onChange={handleChange}
              onBlur={handleCustomerIDBlur} // Check customer existence on blur
              error={customerExists === false} // Show error if customer doesn't exist
              helperText={
                customerExists === false
                  ? "Customer does not exist. Please add the customer first."
                  : ""
              }
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
