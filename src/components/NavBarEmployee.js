import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate for redirection after logout
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InventoryIcon from "@mui/icons-material/Inventory";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import CreateIcon from "@mui/icons-material/Create";
import techSLlogo from "../pictures/Logo.png";
import { AuthContext } from "./AuthContext"; // Import AuthContext to use logout

const drawerWidth = 240;

const NavBarEmployee = () => {
  const { logout } = useContext(AuthContext); // Access logout function from AuthContext
  const navigate = useNavigate(); // Use navigate for redirection after logout

  const handleLogout = () => {
    logout(); // Call the logout function from AuthContext
    navigate("/"); // Redirect to homepage after logout
  };

  const drawerItems = [
    {
      text: "Inventory",
      icon: <InventoryIcon />,
      path: "/show-employee-inventory",
    },
    { text: "Add inventory", icon: <LaptopMacIcon />, path: "/add-inventory" },
    { text: "Customers", icon: <PersonIcon />, path: "/customers" },
    { text: "Add Customers", icon: <PersonAddIcon />, path: "/add-customers" },
    {
      text: "Orders",
      icon: <ShoppingCartOutlinedIcon />,
      path: "/orderhistory",
    },
    { text: "Create Order", icon: <CreateIcon />, path: "/create-order" },
  ];

  const settingsItems = [
    { text: "Log out", icon: <LogoutIcon />, action: handleLogout }, // Assign logout action
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        sx={{
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
        open
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: 2,
          }}
        >
          <img src={techSLlogo} alt="TechSL Logo" style={{ height: "135px" }} />
        </Box>
        <List sx={{ flexGrow: 1 }}>
          {drawerItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                component={Link}
                to={item.path}
                sx={{
                  my: 1,
                  mx: 2,
                  border: "1px solid #000",
                  borderRadius: "10px",
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <List>
          {settingsItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                onClick={item.action} // Attach the logout action to Log out button
                sx={{ my: 1, mx: 2 }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};

export default NavBarEmployee;
