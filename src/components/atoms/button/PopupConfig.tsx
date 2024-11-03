import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { PopupOnCheckOptions } from "../../../constants/enum";
import { useTranslation } from "react-i18next";
import useConfigStore from "../../../store/useConfigStore";

function PopupConfigButton() {
  const { t } = useTranslation();
  const { popupOnCheck, setPopupOnCheck } = useConfigStore();

  return (
    <ToggleButtonGroup
      color="primary"
      size="small"
      exclusive
      value={popupOnCheck}
      onChange={(_, v) => setPopupOnCheck(v as PopupOnCheckOptions)}
      sx={{ m: 0.8 }}
    >
      {Object.values(PopupOnCheckOptions).map((option) => (
        <ToggleButton key={option} value={option}>
          {t(`frontend.config.${option}`)}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}

export default PopupConfigButton;
