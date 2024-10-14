import React, { useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import useConfigStore from "./store/useConfigStore";
import { darkPalette, lightPalette } from "./constant/theme";
import i18n from "./i18n";
import GlobalModal from "./components/organisms/GlobalModal";
import useModalStore from "./store/useModalStore";
import "./index.css";
import {
  announceContentEN,
  announceContentKo,
  announceDate,
  announceTitleEN,
  announceTitleKo,
} from "./constant/updates";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

const AnnounceSwal = withReactContent(Swal);

function App() {
  const { theme, lang } = useConfigStore();

  const { modalInfo } = useModalStore();
  const selectedTheme = createTheme({
    palette: theme === "dark" ? darkPalette : lightPalette,
    typography: {
      button: {
        textTransform: "none",
      },
    },
  });

  useEffect(() => {
    i18n.changeLanguage(lang);
    // const checkDay = window.localStorage.getItem("AE_INFO");
    // if (checkDay !== announceDate + "_" + lang) {
      AnnounceSwal.fire({
        title: lang === "ko" ? announceTitleKo : announceTitleEN,
        html: lang === "ko" ? announceContentKo : announceContentEN,
        icon: "info",
      }).then(() => {
        window.localStorage.setItem("AE_INFO", announceDate + "_" + lang);
      });
    // }
  }, [lang]);

  return (
    <ThemeProvider theme={selectedTheme}>
      <GlobalModal modalInfo={modalInfo} />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
