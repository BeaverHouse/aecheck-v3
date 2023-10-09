import React, { useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {
  RouterProvider
} from "react-router-dom";
import router from './router';
import useConfigStore from './store/useConfigStore';
import { darkPalette, lightPalette } from './constant/theme';
import i18n from './i18n';

function App() {

  const { theme, lang } = useConfigStore();
  const selectedTheme = createTheme({
    palette: theme === "dark" ? darkPalette : lightPalette,
  });

  useEffect(() => {
    i18n.changeLanguage(lang)
  }, [lang])


  return (
    <ThemeProvider theme={selectedTheme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
