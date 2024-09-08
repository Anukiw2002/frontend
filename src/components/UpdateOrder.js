import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function UpdateOrder() {
  const drawerWidth = 280;
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState({
    orderID: "",
    orderDate: "",
    totalPrice: 0,
    customer_ID: "",
    customerCustomID: "",
    orderDetails: [],
  });

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/orders/${id}`)
      .then((res) => {
        const orderData = res.data;
        // Fetch customer data
        return axios
          .get(`http://localhost:3001/api/customers/${orderData.customer_ID}`)
          .then((customerRes) => {
            const customerData = customerRes.data;
            setOrder({
              ...orderData,
              orderDate: new Date(orderData.orderDate)
                .toISOString()
                .split("T")[0],
              customerCustomID: customerData.customer_ID, // Set the custom customer ID
            });
          });
      })
      .catch((err) => {
        console.error("Error fetching order data:", err);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder({ ...order, [name]: value });
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const newOrderDetails = [...order.orderDetails];
    newOrderDetails[index] = { ...newOrderDetails[index], [name]: value };
    setOrder({ ...order, orderDetails: newOrderDetails });
  };

  const handleAddItem = () => {
    setOrder({
      ...order,
      orderDetails: [
        ...order.orderDetails,
        { productName: "", price: 0, quantity: 0 },
      ],
    });
  };

  const handleRemoveItem = (index) => {
    const newOrderDetails = order.orderDetails.filter((_, i) => i !== index);
    setOrder({ ...order, orderDetails: newOrderDetails });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const calculatedTotalPrice = order.orderDetails.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);

    const updatedOrder = {
      ...order,
      totalPrice: calculatedTotalPrice,
      // Don't include customerCustomID in the update
      customerCustomID: undefined,
    };

    axios
      .put(`http://localhost:3001/api/orders/${id}`, updatedOrder)
      .then((result) => {
        console.log("Order updated successfully:", result.data);
        navigate(`/orderdetails/${id}`);
      })
      .catch((err) =>
        console.error(
          "Error updating order:",
          err.response ? err.response.data : err.message
        )
      );
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
          <h2>Update Order</h2>
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
              disabled
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
              onChange={handleChange}
              InputProps={{ startAdornment: "Rs." }}
              required
            />
            <TextField
              label="Customer ID"
              variant="outlined"
              fullWidth
              margin="normal"
              name="customerCustomID"
              value={order.customerCustomID}
              onChange={handleChange}
              required
              disabled // Make this field read-only
            />

            <div>
              <h3>Order Details</h3>
              {order.orderDetails.map((item, index) => (
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
                Update Order
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
}

export default UpdateOrder;
