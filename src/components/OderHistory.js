import React, { useState } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import InventoryIcon from "@mui/icons-material/Inventory";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import techSLlogo from "../pictures/Logo.png";

const drawerWidth = 240;

const NavBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const drawerItems = [
    { text: "Inventory", icon: <InventoryIcon />, path: "/show-products" },
    { text: "Add Inventory", icon: <LaptopMacIcon />, path: "/add-inventory" },
    { text: "Customers", icon: <PersonIcon />, path: "/customers" },
    { text: "Orders", icon: <ShoppingCartOutlinedIcon />, path: "/O" }
  ];

  const settingsItems = [
    { text: "Settings", icon: <SettingsIcon />, path: "/settings" },
    { text: "Log out", icon: <LogoutIcon />, path: "/logout" },
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
          <ListItem disablePadding>
            <ListItemButton
              sx={{
                my: 1,
                mx: 2,
                border: "1px solid #000",
                borderRadius: "10px",
              }}
              onClick={handleClick}
            >
              <ListItemIcon>
                <ShoppingCartOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Orders" />
            </ListItemButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              <MenuItem component={Link} to="/order-history" onClick={handleClose}>
                Order History
              </MenuItem>
              <MenuItem component={Link} to="/order-quantity" onClick={handleClose}>
                Order Quantity
              </MenuItem>
            </Menu>
          </ListItem>
        </List>
        <List>
          {settingsItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                component={Link}
                to={item.path}
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

export default NavBar;
