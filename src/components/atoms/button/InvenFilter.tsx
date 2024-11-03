import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { InvenStatus } from "../../../constants/enum";
import { useTranslation } from "react-i18next";
import useFilterStore from "../../../store/useFilterStore";

function InvenFilterButton() {
  const { t } = useTranslation();
  const { invenStatusFilter, setInvenStatusFilter } = useFilterStore();

  return (
    <ToggleButtonGroup
      color="primary"
      size="small"
      value={invenStatusFilter}
      onChange={(_, v) => setInvenStatusFilter(v as InvenStatus[])}
      sx={{ m: 0.8 }}
    >
      {Object.values(InvenStatus).map((option) => (
        <ToggleButton key={option} value={option}>
          {t(`frontend.status.${option}`)}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}

export default InvenFilterButton;
