import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ThemeButton from "../atoms/ThemeButton";
import { useNavigate } from "react-router-dom";
import Sidebar from "../molecules/Sidebar";
import TopMenuSelect from "../atoms/TopMenuSelect";
import Box from "@mui/material/Box";

function TopBar() {
  const navigate = useNavigate();

  return (
    <AppBar sx={{ flexGrow: 1 }} enableColorOnDark>
      <Toolbar
        variant="dense"
        sx={{
          p: 0.8,
          display: "flex",
          width: "100%",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: 0.8,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexGrow: 1,
            alignItems: "center",
            gap: 1,
          }}
        >
          <Sidebar />
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            AE Check
          </Typography>
          <ThemeButton />
        </Box>
        <TopMenuSelect />
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
