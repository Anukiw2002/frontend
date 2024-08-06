import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import { Box, TextField, InputAdornment } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

function ShowInventory() {
  const navigate = useNavigate();

  const handleAddButtonClick = () => {
    navigate("/add-product");
  };
  const drawerWidth = 280;

  return (
    <Box sx={{ backgroundColor: "lightgray" }}>
      <Box sx={{ display: "flex" }}>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 10,
            mt: 5,
            mb: 12,
            mr: 3,
            ml: `${drawerWidth}px`,
            width: `calc(100% - ${drawerWidth}px)`,
            backgroundColor: "white",
            borderRadius: "24px",
            height: "100vh",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "left",
            }}
          >
            <TextField
              id="outlined-basic"
              placeholder="Search"
              variant="outlined"
              sx={{ mr: 2 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment>
                    <SearchIcon />
                  </InputAdornment>
                ),
                sx: {
                  "& input": {
                    paddingLeft: "8px",
                  },
                },
              }}
            />
            <TextField
              id="outlined-basic"
              placeholder="Sort"
              variant="outlined"
              sx={{ width: 100, mr: 2 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment>
                    <SwapVertIcon />
                  </InputAdornment>
                ),
                sx: {
                  "& input": {
                    paddingLeft: "8px",
                  },
                },
              }}
            />
            <Button onClick={handleAddButtonClick} variant="contained">
              Add
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default ShowInventory;
