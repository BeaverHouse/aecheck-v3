import Card from "@mui/material/Card";
import React from "react";
import CircularProgress, {
  CircularProgressProps,
} from "@mui/material/CircularProgress";
import useCheckStore from "../../store/useCheckStore";
import { useTranslation } from "react-i18next";
import { getManifestStatus, getManifestStep } from "../../util/func";
import Typography from "@mui/material/Typography";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CharacterCheck from "../atoms/CharacterCheck";
import { new_manifests } from "../../constant/updates";
import useTheme from "@mui/material/styles/useTheme";

function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number }
) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex", mr: 2 }}>
      <CircularProgress
        variant="determinate"
        color="secondary"
        size={60}
        {...props}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="text.secondary"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

const CharacterManifest: React.FC<CharacterInfo> = (info) => {
  const { inven, manifest, addManifest, removeManifest } = useCheckStore();
  const { t } = useTranslation();
  const theme = useTheme();

  const status = t(getManifestStatus(info, inven));
  const stepArr = info.tags.includes("manifest.step2") ? [0, 1, 2] : [0, 1];
  const maxStep = stepArr[stepArr.length - 1];

  const currentStep = getManifestStep(info, manifest);

  const changeManifest = (step: number) => {
    const changedStep = Math.min(currentStep, maxStep) + step;
    if (changedStep <= 0) {
      removeManifest(info.id);
      return;
    }
    const finalStep = Math.min(changedStep, maxStep);
    addManifest(finalStep * 10000 + info.id);
    return;
  };

  return (
    <Card
      sx={{
        display: "flex",
        overflow: "unset",
        textAlign: "center",
        pb: 0.5,
        pt: 0.5,
        border: new_manifests.includes(info.id)
          ? `3px solid ${theme.palette.secondary.main}`
          : "3px solid transparent",
        boxSizing: "border-box",
      }}
    >
      <CharacterCheck info={info} isCheck={false} disableBorder={true} />
      {status === "manifest.available" ? (
        <Box sx={{ display: "flex", alignItems: "center", pl: 1, pr: 1 }}>
          <CircularProgressWithLabel
            value={(100 * Math.min(currentStep, maxStep)) / maxStep}
          />
          <Box>
            <ToggleButtonGroup
              exclusive
              onChange={(_, value) => changeManifest(value)}
              aria-label="text alignment"
              sx={{ height: 25, mb: 1 }}
            >
              <ToggleButton value={-1}>
                <RemoveIcon />
              </ToggleButton>
              <ToggleButton value={1}>
                <AddIcon />
              </ToggleButton>
            </ToggleButtonGroup>
            <Typography fontWeight={600}>
              {t(`manifest.step${Math.min(currentStep, maxStep)}`)}
            </Typography>
          </Box>
        </Box>
      ) : (
        <Typography
          sx={{ ml: 1, display: "flex", alignItems: "center" }}
          variant="subtitle2"
        >
          {status}
        </Typography>
      )}
    </Card>
  );
};

export default CharacterManifest;
