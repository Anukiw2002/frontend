import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Homepage from "./components/Homepage";
import SignUpEmployee from "./components/SignUp-Employee";
import SignUpManager from "./components/SignUp-Manager";
import LogInEmployee from "./components/LogInEmployee";
import LogInManager from "./components/LogInManager";
import AddInventory from "./components/AddInventory";
import AddProduct from "./components/AddProducts";
import AddCustomer from "./components/AddCustomers";
import ShowInventory from "./components/ShowInventory";
import NavBar from "./components/NavBar";
<<<<<<< HEAD
import OrderHistory from "./components/OderHistory";
=======
import Customer from "./components/Customer";
>>>>>>> origin/main

function App() {
  const location = useLocation();

  const hideNavBarPaths = [
    "/",
    "/signup-employee",
    "/signup-manager",
    "/loginemployee",
    "/loginmanager",
  ];

  return (
    <>
      {!hideNavBarPaths.includes(location.pathname) && <NavBar />}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup-employee" element={<SignUpEmployee />} />
        <Route path="/signup-manager" element={<SignUpManager />} />
        <Route path="/loginemployee" element={<LogInEmployee />} />
        <Route path="/loginmanager" element={<LogInManager />} />
        <Route path="/show-products" element={<ShowInventory />} />
        <Route path="/add-inventory" element={<AddInventory />} />
        <Route path="/customers" element={<Customer />} />
        <Route path="/add-customers" element={<AddCustomer />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="OrderHistory" element={<OrderHistory />} />
      </Routes>
    </>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
