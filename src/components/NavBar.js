import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import InventoryIcon from "@mui/icons-material/Inventory";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import techSLlogo from "../pictures/Logo.png";

const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const drawer = (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
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
        {["Inventory", "Add Inventory", "Customers", "Orders"].map(
          (text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton
                sx={{
                  my: 1,
                  mx: 2,
                  border: "1px solid #000",
                  borderRadius: "10px",
                }}
              >
                <ListItemIcon>
                  {index === 0 ? (
                    <InventoryIcon />
                  ) : index === 1 ? (
                    <LaptopMacIcon />
                  ) : index === 2 ? (
                    <PersonIcon />
                  ) : (
                    <ShoppingCartOutlinedIcon />
                  )}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          )
        )}
      </List>
      <List sx={{ marginBottom: 2 }}>
        <ListItem disablePadding>
          <ListItemButton sx={{ my: 1, mx: 2 }}>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton sx={{ my: 1, mx: 2 }}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Log out" />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Box
        component="nav"
        sx={{ width: drawerWidth, flexShrink: 0 }}
        aria-label="mailbox folders"
      >
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
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: `calc(100% - ${drawerWidth}px)`,
        }}
      >
        <Toolbar />
      </Box>
    </Box>
  );
}

export default ResponsiveDrawer;
