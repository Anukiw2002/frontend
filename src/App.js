import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddInventory from "./components/AddInventory";
import AddProduct from "./components/AddProducts";
import AddCustomer from "./components/AddCustomers";
import ShowInventory from "./components/ShowInventory";
import NavBar from "./components/NavBar";
import OrderHistory from "./components/OderHistory";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="show-products" element={<ShowInventory />} />
        <Route path="add-inventory" element={<AddInventory />} />
        <Route path="customers" element={<AddCustomer />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="OrderHistory" element={<OrderHistory />} />
      </Routes>
    </Router>
  );
}

export default App;
