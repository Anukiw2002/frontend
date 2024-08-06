import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import CtaButton from "../components/CtaButton";
import NavBar from "../components/NavBar";
import Box from "@mui/material/Box";
import "../css/InputField.css";
import "../css/CtaButton.css";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';


function Customer() {
    const drawerWidth = 240;

    const [customers, setCustomers] = useState([
        { id: 1, name: 'John Doe', contactNumber: '1234567890', email: 'john@example.com', address: '123 Main St', city: 'New York', country: 'USA' },
        { id: 2, name: 'Jane Smith', contactNumber: '0987654321', email: 'jane@example.com', address: '456 Elm St', city: 'Los Angeles', country: 'USA' },
        // Add more customer data as needed
      ]);

    return (
        <Box sx={{ display: 'flex' }}>
      <NavBar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          ml: `${drawerWidth}px`,
          width: `calc(100% - ${drawerWidth}px)`,
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
                <TableCell>City</TableCell>
                <TableCell>Country</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>{customer.id}</TableCell>
                  <TableCell>{customer.contactNumber}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.address}</TableCell>
                  <TableCell>{customer.city}</TableCell>
                  <TableCell>{customer.country}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
    );
}

export default Customer;