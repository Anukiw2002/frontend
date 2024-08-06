import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddInventory from "./components/AddInventory";
import AddProduct from "./components/AddProducts";
import AddCustomer from "./components/AddCustomers";
import ShowInventory from "./components/ShowInventory";
import NavBar from "./components/NavBar";
import Customer from "./components/Customer";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="show-products" element={<ShowInventory />} />
        <Route path="add-inventory" element={<AddInventory />} />
<<<<<<< HEAD
        <Route path="customers" element={<Customer />} />
=======
        <Route path="customers" element={<AddCustomer />} />
        <Route path="/add-product" element={<AddProduct />} />
>>>>>>> 996f71358a1e3266a71b0b74e0fb31c54a65e549
      </Routes>
    </Router>
  );
}

export default App;
