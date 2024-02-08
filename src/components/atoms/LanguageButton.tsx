import React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import useConfigStore from "../../store/useConfigStore";
import i18n from "../../i18n";
import Typography from "@mui/material/Typography";

function LanguageButton() {
  const { lang, changeLang } = useConfigStore();

  const toggleLanguage = (l: string) => {
    changeLang(l);
    i18n.changeLanguage(l);
  };

  return (
    <>
      <Typography variant="body2">Language</Typography>
      <ToggleButtonGroup
        color="secondary"
        value={lang}
        exclusive
        sx={{ margin: 1 }}
      >
        {["ko", "en", "jp"].map((l) => (
          <ToggleButton key={l} value={l} onClick={() => toggleLanguage(l)}>
            {l.toUpperCase()}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </>
  );
}

export default LanguageButton;
