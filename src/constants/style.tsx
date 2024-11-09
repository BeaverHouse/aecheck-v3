import { SxProps, Theme } from "@mui/material/styles";
import React from "react";

export const FlexCenter: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export const MainWrapperSx: SxProps<Theme> = {
  width: "99%",
  maxWidth: 1600,
  margin: "10px auto",
  textAlign: "center",
};

export const DashboardWrapperSx: SxProps<Theme> = {
  ...FlexCenter,
  flexDirection: "column",
  height: "100%",
  padding: "2px",
  textAlign: "center",
};
