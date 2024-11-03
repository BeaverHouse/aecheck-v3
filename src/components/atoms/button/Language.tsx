import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import i18n from "../../../i18n";
import Typography from "@mui/material/Typography";
import { LanguageOptions } from "../../../constants/enum";

function LanguageButton() {
  return (
    <>
      <Typography variant="body2">Language</Typography>
      <ToggleButtonGroup
        color="primary"
        value={i18n.language}
        exclusive
        onChange={(_, v) => i18n.changeLanguage(v)}
        sx={{ m: 1 }}
      >
        {Object.values(LanguageOptions).map((language) => (
          <ToggleButton key={language} value={language}>
            {language.toUpperCase()}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </>
  );
}

export default LanguageButton;
