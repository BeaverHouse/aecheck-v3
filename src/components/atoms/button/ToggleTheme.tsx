import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import useConfigStore from "../../../store/useConfigStore";
import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
import { ThemeOptions } from "../../../constants/enum";
import { FlexCenter } from "../../../constants/style";

function ToggleThemeButton() {
  const { theme, toggleTheme } = useConfigStore();

  return (
    <Box sx={FlexCenter}>
      <LightModeIcon />
      <Switch
        color="info"
        checked={theme === ThemeOptions.dark}
        onChange={(_, checked) =>
          toggleTheme(checked ? ThemeOptions.dark : ThemeOptions.light)
        }
      />
      <DarkModeIcon />
    </Box>
  );
}

export default ToggleThemeButton;
