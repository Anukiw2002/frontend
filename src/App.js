import React, { useContext } from "react";
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
import ShowEmployeeInventory from "./components/ShowEmployeeInventory";
import NavBarEmployee from "./components/NavBarEmployee";
import NavBarManager from "./components/NavBarManager";
import OrderHistory from "./components/OderHistory";
import OrderDetails from "./components/OrderDetails";
import CreateOrder from "./components/CreateOrder";
import Customer from "./components/Customer";
import UpdateCustomer from "./components/UpdateCustomer";
import UpdateOrder from "./components/UpdateOrder";
import UpdateProduct from "./components/UpdateProduct";
import UpdateInventory from "./components/UpdateInventory";
import { AuthContext, AuthProvider } from "./components/AuthContext"; // Import context

function App() {
  const location = useLocation();
  const { userRole } = useContext(AuthContext); // Get the user role from context

  // Define paths where navbars should be hidden (like sign-in/sign-up pages)
  const hideNavBarPaths = [
    "/",
    "/signup-employee",
    "/signup-manager",
    "/loginemployee",
    "/loginmanager",
  ];

  // Function to render the navbar based on userRole
  const renderNavBar = () => {
    console.log("Current user role:", userRole); // Log to check current role

    if (hideNavBarPaths.includes(location.pathname)) return null;

    if (userRole === "employee") {
      return <NavBarEmployee />;
    } else if (userRole === "manager") {
      return <NavBarManager />;
    }

    return null;
  };

  return (
    <>
      {renderNavBar()}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup-employee" element={<SignUpEmployee />} />
        <Route path="/signup-manager" element={<SignUpManager />} />
        <Route path="/loginemployee" element={<LogInEmployee />} />
        <Route path="/loginmanager" element={<LogInManager />} />
        <Route path="/show-products" element={<ShowInventory />} />
        <Route
          path="/show-employee-inventory"
          element={<ShowEmployeeInventory />}
        />
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
        <Route path="/update-inventory/:id" element={<UpdateInventory />} />
      </Routes>
    </>
  );
}

function AppWrapper() {
  return (
    <AuthProvider>
      <Router>
        <App />
      </Router>
    </AuthProvider>
  );
}

export default AppWrapper;
