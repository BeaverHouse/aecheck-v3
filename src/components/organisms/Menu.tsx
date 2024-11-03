import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import ToggleThemeButton from "../atoms/button/ToggleTheme";
import TopNavigateBox from "../atoms/TopNavigateBox";
import { AppInfo } from "../../constants";
import AECheckSidebar from "../molecules/Sidebar";

function AECheckMenu() {
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
          <AECheckSidebar />
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            {AppInfo.name}
          </Typography>
          <ToggleThemeButton />
        </Box>
        <TopNavigateBox />
      </Toolbar>
    </AppBar>
  );
}

export default AECheckMenu;
