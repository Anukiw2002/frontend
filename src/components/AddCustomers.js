import TextField from "@mui/material/TextField";
import CtaButton from "../components/CtaButton";
import Box from "@mui/material/Box";
import "../css/InputField.css";
import "../css/CtaButton.css";

// test comment

function AddCustomer() {
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
            mb: 5,
            mr: 3,
            ml: `${drawerWidth}px`,
            width: `calc(100% - ${drawerWidth}px)`,
            backgroundColor: "white",
            borderRadius: "24px",
          }}
        >
          <h2>Add New Customer </h2>
          <Box sx={{ mb: 4 }}>
            <TextField
              id="cutsomerName"
              label="Name"
              variant="filled"
              fullWidth
            />
          </Box>
          <Box sx={{ mb: 4 }}>
            <TextField
              id="customerNumber"
              label="Contact Number"
              variant="filled"
              fullWidth
            />
          </Box>
          <Box sx={{ mb: 4 }}>
            <TextField
              id="email"
              label="Email Address"
              variant="filled"
              fullWidth
              onChange={(e) => {
                const email = e.target.value;
                const emailRegex = /^[^\s@]+@[^\s@]+\.[\s@]+$/;
                const isValidEmail = emailRegex.test(email);
                console.log(isValidEmail);
              }}
            />
          </Box>
          <Box sx={{ mb: 4 }}>
            <TextField
              id="customerAddress"
              label="Adress"
              variant="filled"
              fullWidth
            />
          </Box>
          <Box className="cta-container">
            <CtaButton ctaName="Add" />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default AddCustomer;
