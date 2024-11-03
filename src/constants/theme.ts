import { PaletteOptions } from "@mui/material/styles";

export const darkPalette: PaletteOptions = {
  mode: "dark",
  primary: {
    main: "#0072b2",
  },
  secondary: {
    main: "#ffc107",
  },
  success: {
    main: "#56b4e9",
  },
  background: {
    paper: "#273336",
    default: "#273336",
  },
  info: {
    main: "#FFFFFF",
    dark: "#000000",
  },
};

export const lightPalette: PaletteOptions = {
  mode: "light",
  primary: {
    main: "#56b4e9",
  },
  secondary: {
    main: "#ffc107",
  },
  success: {
    main: "#009e73",
  },
  background: {
    default: "#fafafa",
    paper: "#fafafa",
  },
  info: {
    main: "#000000",
    dark: "#FFFFFF",
  },
};
