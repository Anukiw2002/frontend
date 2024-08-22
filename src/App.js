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
import OrderHistory from "./components/OderHistory";
import OrderDetails from "./components/OrderDetails";
import CreateOrder from "./components/CreateOrder";
import Customer from "./components/Customer";
import UpdateCustomer from "./components/UpdateCustomer";
import UpdateOrder from "./components/UpdateOrder";
import UpdateProduct from "./components/UpdateProduct";

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
        <Route path="/orderhistory" element={<OrderHistory />} />
        <Route path="/create-order" element={<CreateOrder />} />
        <Route path="/orderdetails/:id" element={<OrderDetails />} />
        <Route path="/update-customer/:id" element={<UpdateCustomer />} />
        <Route path="/update-order/:id" element={<UpdateOrder />} />
        <Route path="/update-product/:id" element={<UpdateProduct />} />
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
