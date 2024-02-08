import React from "react";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import useConfigStore from "../../store/useConfigStore";
import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";

function ThemeButton() {
  const { theme, toggleTheme } = useConfigStore();

  const handleTheme = (_: React.ChangeEvent, checked: boolean) => {
    toggleTheme(checked ? "dark" : "light");
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <LightModeIcon />
      <Switch
        inputProps={{ "aria-label": "Theme Switch" }}
        color="info"
        checked={theme === "dark"}
        onChange={handleTheme}
      />
      <DarkModeIcon />
    </Box>
  );
}

export default ThemeButton;
