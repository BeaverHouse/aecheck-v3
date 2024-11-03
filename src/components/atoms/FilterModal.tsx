import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useTranslation } from "react-i18next";
import useFilterStore from "../../store/useFilterStore";
import PersonalitySelect from "../atoms/PersonalitySelect";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import useModalStore from "../../store/useModalStore";
import Button from "@mui/material/Button";
import {
  AEAlterStatus,
  AEAwakenStatus,
  AECategories,
  AECharacterStyles,
  AELightShadow,
  AEManifestLevels,
} from "../../constants/enum";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useQuery } from "@tanstack/react-query";
import Loading from "./Loading";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "95%",
  maxWidth: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  fontWeight: 800,
  display: "grid",
  maxHeight: "75vh",
  alignItems: "center",
  textAlign: "center",
  overflow: "auto",
  gridTemplateColumns: "1fr 2fr",
  p: 1,
};

const FilterModal: React.FC = () => {
  const {
    styleFilter,
    manifestFilter,
    categoryFilter,
    alterFilter,
    lightShadowFilter,
    staralignFilter,
    dungeon,
    setStyleFilter,
    setManifestFilter,
    setCategoryFilter,
    setAlterFilter,
    setLightShadowFilter,
    setStaralignFilter,
    setDungeon,
    removeFilter,
  } = useFilterStore();
  const { hideModal } = useModalStore();
  const { t } = useTranslation();
  const { isPending, error, data } = useQuery({
    queryKey: ["getDungeons"],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_URL}/dungeon`).then((res) =>
        res.json()
      ),
  });

  if (isPending)
    return (
      <Modal open={true} onClose={hideModal}>
        <Loading />
      </Modal>
    );
  if (error) return "An error has occurred: " + error.message;

  const dungeons = (data as APIResponse<DungeonInfo[]>).data.map(
    (info) => info.id
  );

  return (
    <Modal open={true} onClose={hideModal}>
      <Box sx={style}>
        <Typography
          variant="h6"
          component="h2"
          sx={{ textAlign: "center", gridColumn: "span 2" }}
        >
          Filter
        </Typography>
        <Typography variant="subtitle2">
          {t("frontend.filter.style")}
        </Typography>
        <ToggleButtonGroup
          color="primary"
          size="small"
          value={styleFilter}
          onChange={(_, v) => setStyleFilter(v as AECharacterStyles[])}
          sx={{ m: 1 }}
        >
          {Object.values(AECharacterStyles).map((option) => (
            <ToggleButton key={option} value={option}>
              {option}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>

        <Typography variant="subtitle2">
          {t("frontend.manifest.step1")}
        </Typography>
        <ToggleButtonGroup
          color="primary"
          size="small"
          value={manifestFilter}
          onChange={(_, v) => setManifestFilter(v as AEManifestLevels[])}
          sx={{ m: 1 }}
        >
          {Object.values(AEManifestLevels).map((option) => (
            <ToggleButton key={option} value={option}>
              {t(`frontend.manifest.step${option}`)}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
        <Typography variant="subtitle2">
          {t("frontend.word.staralign")}
        </Typography>
        <ToggleButtonGroup
          color="primary"
          size="small"
          value={staralignFilter}
          onChange={(_, v) => setStaralignFilter(v as AEAwakenStatus[])}
          sx={{ m: 1 }}
        >
          {Object.values(AEAwakenStatus).map((option) => (
            <ToggleButton key={String(option)} value={option}>
              {t(`frontend.staralign.${option}`)}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
        <Typography variant="subtitle2">
          {t("frontend.filter.light-shadow")}
        </Typography>
        <ToggleButtonGroup
          color="primary"
          size="small"
          value={lightShadowFilter}
          onChange={(_, v) => setLightShadowFilter(v as AELightShadow[])}
          sx={{ m: 1 }}
        >
          {Object.values(AELightShadow).map((option) => (
            <ToggleButton key={String(option)} value={option}>
              {t(`frontend.light-shadow.${option}`)}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
        <Typography variant="subtitle2">
          {t("frontend.filter.category")}
        </Typography>
        <ToggleButtonGroup
          color="primary"
          size="small"
          value={categoryFilter}
          onChange={(_, v) => setCategoryFilter(v as AECategories[])}
          sx={{ m: 1 }}
        >
          {Object.values(AECategories).map((option) => (
            <ToggleButton key={String(option)} value={option}>
              {t(`frontend.category.${option.toLowerCase()}`)}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
        <Typography variant="subtitle2">
          {t("frontend.filter.alter")}
        </Typography>
        <ToggleButtonGroup
          color="primary"
          size="small"
          value={alterFilter}
          onChange={(_, v) => setAlterFilter(v as AEAlterStatus[])}
          sx={{ m: 1 }}
        >
          {Object.values(AEAlterStatus).map((option) => (
            <ToggleButton key={String(option)} value={option}>
              {t(`alter.${option}`)}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
        <br />
        <PersonalitySelect />
        <Typography
          variant="subtitle2"
          sx={{ textAlign: "center", gridColumn: "span 2" }}
        >
          {t("frontend.filter.bookdrop")}
        </Typography>
        <Autocomplete
          sx={{ mt: 0.8, mb: 2, gridColumn: "span 2" }}
          options={dungeons}
          getOptionLabel={(opt) => t(opt)}
          value={dungeon}
          ChipProps={{
            color: "secondary",
            sx: {
              fontWeight: 800,
            },
          }}
          onChange={(_, value) => setDungeon(value)}
          renderInput={(params) => (
            <TextField
              {...params}
              size="small"
              color="secondary"
              variant="outlined"
              label="Select"
            />
          )}
        />
        <Button
          variant="contained"
          color="warning"
          sx={{ gridColumn: "span 2" }}
          onClick={removeFilter}
        >
          FILTER CLEAR
        </Button>
      </Box>
    </Modal>
  );
};

export default FilterModal;
