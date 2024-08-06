import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import CtaButton from "../components/CtaButton";
import NavBar from "../components/NavBar";
import Box from "@mui/material/Box";
import "../css/InputField.css";
import "../css/CtaButton.css";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function Customer() {
    const drawerWidth = 240;

    const navigate = useNavigate();

    const handleAddButtonClick = () => {
        navigate("/add-customers");
    };

    const [customers, setCustomers] = useState([
        { id: 1, name: 'John Doe', contactNumber: '1234567890', email: 'john@example.com', address: '123 Main St', city: 'New York', country: 'USA' },
        { id: 2, name: 'Jane Smith', contactNumber: '0987654321', email: 'jane@example.com', address: '456 Elm St', city: 'Los Angeles', country: 'USA' },
        // Add more customer data as needed
    ]);

    const handleEdit = (id) => {
        // Implement edit functionality
        console.log(`Edit customer with id: ${id}`);
    };

    const handleDelete = (id) => {
        // Implement delete functionality
        console.log(`Delete customer with id: ${id}`);
    };

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
                                <TableCell>Action</TableCell>
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
                                    <TableCell>
                                        <Button onClick={() => handleEdit(customer.id)}>
                                            <EditIcon />
                                        </Button>
                                        <Button onClick={() => handleDelete(customer.id)}>
                                            <DeleteIcon />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Button
                    onClick={handleAddButtonClick}
                    variant="contained"
                    sx={{
                        position: 'absolute',
                        bottom: '20px',
                        right: '20px',
                    }}
                >
                    Add Customer
                </Button>
            </Box>
        </Box>
    );
}

export default Customer;
