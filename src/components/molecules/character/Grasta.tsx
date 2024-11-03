import Card from "@mui/material/Card";
import React from "react";
import useCheckStore from "../../../store/useCheckStore";
import { useTranslation } from "react-i18next";
import Typography from "@mui/material/Typography";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import styled from "@mui/material/styles/styled";
import Box from "@mui/material/Box";
import { getNumber, getStep, isUpdatedInWeeks } from "../../../util/func";
import CharacterAvatar from "../../atoms/character/Avatar";
import useModalStore from "../../../store/useModalStore";
import { ModalType } from "../../../constants/enum";

const ButtonItem = styled(ToggleButton)({
  flexGrow: 1,
  flexBasis: 0,
  maxHeight: 50,
});

const CharacterGrasta: React.FC<CharacterSummary> = (info) => {
  const { grasta, setGrasta } = useCheckStore();
  const { setModal } = useModalStore();
  const { t } = useTranslation();

  const id = getNumber(info);
  const isRecent = isUpdatedInWeeks(info.lastUpdated);
  const currentStep = getStep(id, grasta);

  const changeGrasta = (step: number) => {
    const changedGrasta = step * 10000 + id;
    const newState = [
      ...grasta.filter((x) => x % 10000 !== id),
      changedGrasta,
    ].filter((x) => x >= 10000 && x < 30000);

    setGrasta(newState);
  };

  return (
    <Card
      className={isRecent ? "shadow" : ""}
      sx={{
        display: "flex",
        width: 275,
        overflow: "unset",
        p: 0.5,
      }}
    >
      <CharacterAvatar
        info={info}
        disableShadow={true}
        onClick={() => setModal(ModalType.character, info.id)}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography sx={{ mb: 0.5 }}>{t(`book.${info.id}`)}</Typography>
        <ToggleButtonGroup
          color="secondary"
          value={currentStep}
          exclusive
          sx={{ height: 40, pl: 0.25 }}
        >
          {[0, 1, 2].map((step) => (
            <ButtonItem
              key={step}
              value={step}
              onClick={() => changeGrasta(step)}
            >
              <img
                src={`${import.meta.env.VITE_CDN_URL}/icon/grasta${step}.png`}
                alt={`${step}`}
                width={33}
                height={33}
              />
            </ButtonItem>
          ))}
        </ToggleButtonGroup>
      </Box>
    </Card>
  );
};

export default CharacterGrasta;
