import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { ManifestStatus } from "../../../constants/enum";
import { useTranslation } from "react-i18next";
import useFilterStore from "../../../store/useFilterStore";

function ManifestFilterButton() {
  const { t } = useTranslation();
  const { manifestStatusFilter, setManifestStatusFilter } = useFilterStore();

  return (
    <ToggleButtonGroup
      color="primary"
      size="small"
      value={manifestStatusFilter}
      onChange={(_, v) => setManifestStatusFilter(v as ManifestStatus[])}
      sx={{ m: 0.8 }}
    >
      {Object.values(ManifestStatus).map((option) => (
        <ToggleButton key={option} value={option}>
          {t(`frontend.status.${option}`)}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}

export default ManifestFilterButton;
