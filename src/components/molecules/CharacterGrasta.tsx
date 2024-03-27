import Card from "@mui/material/Card";
import React from "react";
import useCheckStore from "../../store/useCheckStore";
import { useTranslation } from "react-i18next";
import { getStep } from "../../util/func";
import Typography from "@mui/material/Typography";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import styled from "@mui/material/styles/styled";
import Box from "@mui/material/Box";
import CharacterCheck from "../atoms/CharacterCheck";
import { pickups } from "../../constant/updates";
import useTheme from "@mui/material/styles/useTheme";

const ButtonItem = styled(ToggleButton)({
  flexGrow: 1,
  flexBasis: 0,
  maxHeight: 50,
});

const CharacterGrasta: React.FC<CharacterInfo> = (info) => {
  const { grasta, addGrasta, removeGrasta } = useCheckStore();
  const { t } = useTranslation();
  const theme = useTheme();

  const stepArr = [0, 1, 2];

  const currentStep = getStep(info, grasta);

  const changeGrasta = (step: number) => {
    if (step === 0) removeGrasta(info.id);
    else addGrasta(step * 10000 + info.id);
  };

  return (
    <Card
      sx={{
        display: "flex",
        overflow: "unset",
        textAlign: "center",
        alignItems: "stretch",
        pb: 0.5,
        pt: 0.5,
        border: pickups.includes(info.id)
          ? `3px solid ${theme.palette.secondary.main}`
          : "3px solid transparent",
        boxSizing: "border-box",
      }}
    >
      <CharacterCheck info={info} isCheck={false} disableBorder={true} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography sx={{ mb: 0.5 }}>{t(`book.char${info.id}`)}</Typography>
        <ToggleButtonGroup
          color="secondary"
          value={currentStep}
          exclusive
          sx={{ height: 40, pl: 0.25 }}
        >
          {stepArr.map((step) => (
            <ButtonItem
              key={step}
              value={step}
              onClick={() => changeGrasta(step)}
            >
              <img
                src={`/image/icon/grasta${step}.png`}
                alt={`${step}`}
                width={37}
                height={37}
              />
            </ButtonItem>
          ))}
        </ToggleButtonGroup>
      </Box>
    </Card>
  );
};

export default CharacterGrasta;
