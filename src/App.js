import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddInventory from "./components/AddInventory";
import AddProduct from "./components/AddProducts";
import AddCustomer from "./components/AddCustomers";
import NavBar from "./components/NavBar";
import Customer from "./components/Customer";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="add-products" element={<AddProduct />} />
        <Route path="add-inventory" element={<AddInventory />} />
        <Route path="customers" element={<Customer />} />
      </Routes>
    </Router>
  );
}

export default App;
