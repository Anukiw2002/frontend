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
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

function Customer() {
  const drawerWidth = 280;
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);

  const handleAddButtonClick = () => {
    navigate("/add-customers");
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/customers")
      .then((customer) => {
        console.log(customer);
        setCustomers(customer.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleEdit = (id) => {
    navigate(`/update-customer/${id}`);
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/api/customers/${id}`)
      .then((res) => {
        console.log(res);
        setCustomers(customers.filter((customer) => customer._id !== id)); // Remove the deleted customer from state
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
            mt: 5,
            mb: 5,
            mr: 3,
            ml: `${drawerWidth}px`,
            width: `calc(100% - ${drawerWidth}px)`,
            backgroundColor: "white",
            borderRadius: "24px",
          }}
        >
          <h2>Customer List</h2>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Customer Name</TableCell>
                  <TableCell>Customer ID</TableCell>
                  <TableCell>Contact Number</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {customers.map((customer) => (
                  <TableRow key={customer._id}>
                    <TableCell>
                      {customer.fName + " " + customer.lName}
                    </TableCell>
                    <TableCell>{customer.customer_ID}</TableCell>
                    <TableCell>{customer.contact_number}</TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>{customer.address}</TableCell>
                    <TableCell>
                      <Button onClick={() => handleEdit(customer._id)}>
                        <EditIcon />
                      </Button>
                      <Button onClick={() => handleDelete(customer._id)}>
                        <DeleteIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Button
          onClick={handleAddButtonClick}
          variant="contained"
          sx={{
            position: "absolute",
            bottom: "20px",
            right: "20px",
          }}
        >
          Add Customer
        </Button>
      </Box>
    </Box>
  );
}

export default Customer;
