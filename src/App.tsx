import React, { useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {
  RouterProvider
} from "react-router-dom";
import router from './router';
import useConfigStore from './store/useConfigStore';
import { darkPalette, lightPalette } from './constant/theme';
import i18n from './i18n';
import GlobalModal from './components/organisms/GlobalModal';
import useModalStore from './store/useModalStore';
import "./index.css"

function App() {

  const { theme, lang } = useConfigStore();

  const {
    modalInfo,
  } = useModalStore()
  const selectedTheme = createTheme({
    palette: theme === "dark" ? darkPalette : lightPalette,
    typography: {
      button: {
        textTransform: 'none'
      }
    }
  });

  useEffect(() => {
    i18n.changeLanguage(lang)
  }, [lang])


  return (
    <ThemeProvider theme={selectedTheme}>
      <GlobalModal modalInfo={modalInfo} />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
