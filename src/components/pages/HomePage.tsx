import React from "react";
import HomeGrid from "../atoms/HomeGrid";
import Box from "@mui/material/Box";
import LanguageButton from "../atoms/LanguageButton";

function HomePage() {
  return (
    <Box
      sx={{
        minHeight: 500,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <HomeGrid />
      <br />
      <LanguageButton />
    </Box>
  );
}

export default HomePage;
