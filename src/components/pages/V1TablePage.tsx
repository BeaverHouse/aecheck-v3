import React from "react";
import V1Table from "../atoms/V1Table";
import Box from "@mui/material/Box/Box";
import Typography from "@mui/material/Typography/Typography";
import { useTranslation } from "react-i18next";
import Downloader from "../atoms/Downloader";

export default function V1TablePage() {
  const { t } = useTranslation();
  return (
    <Box
      id="wrapper"
      sx={{
        m: 0.5,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <Typography variant="subtitle1" sx={{ m: 1 }}>
        {t("frontend.analyze.table.description")}
      </Typography>
      <Downloader tag="chartable" />
      <V1Table />
    </Box>
  );
}
