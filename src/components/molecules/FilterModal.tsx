import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useTranslation } from "react-i18next";
import Chip from "@mui/material/Chip";
import useFilterStore from "../../store/useFilterStore";
import { filterChipOptions } from "../../constant/fixedData";
import PersonalitySelectBox from "../atoms/PersonalitySelectBox";
import Autocomplete from "@mui/material/Autocomplete";
import { dungeons } from "../../constant/parseData";
import TextField from "@mui/material/TextField";
import useModalStore from "../../store/useModalStore";
import Button from "@mui/material/Button";

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
  overflow: "auto",
  gridTemplateColumns: "1fr 1fr",
  p: 1,
};

interface FilterModalInfo {
  modalType: string;
}

const FilterModal: React.FC<FilterModalInfo> = ({ modalType }) => {
  const {
    toggleTag,
    styleTags,
    alterTags,
    getTags,
    manifestTags,
    typeTags,
    invenTags,
    staralignTags,
    dungeon,
    setDungeon,
    removeFilter,
  } = useFilterStore();
  const { modalInfo, hideModal } = useModalStore();
  const { t } = useTranslation();

  return (
    <Modal open={modalInfo === modalType} onClose={hideModal}>
      <Box sx={style}>
        <Typography
          variant="h6"
          component="h2"
          sx={{ textAlign: "center", gridColumn: "span 2" }}
        >
          Filter
        </Typography>
        <Typography variant="subtitle2" sx={{ mt: 2 }}>
          {t("frontend.filter.style")}
        </Typography>
        <Box sx={{ mb: 1, gridColumn: "span 2" }}>
          {filterChipOptions.style.map((option, idx) => {
            if (
              ["MANIFEST", "GRASTA"].includes(modalType) &&
              option === "style.four"
            )
              return null;
            return (
              <Chip
                clickable
                key={idx}
                label={t(option)}
                sx={{ mr: 0.7, mb: 0.2, pl: 0.4, pr: 0.4 }}
                variant={styleTags.includes(option) ? "filled" : "outlined"}
                onClick={() => toggleTag(option)}
                color="secondary"
              />
            );
          })}
        </Box>

        <Typography variant="subtitle2">{t("manifest.step1")}</Typography>
        <Box sx={{ mb: 1, gridColumn: "span 2" }}>
          {filterChipOptions.manifest.map((option, idx) => {
            if (modalType === "MANIFEST" && option === "manifest.step0")
              return null;
            return (
              <Chip
                clickable
                key={idx}
                label={t(option)}
                sx={{ mr: 0.7, mb: 0.2, pl: 0.4, pr: 0.4 }}
                variant={manifestTags.includes(option) ? "filled" : "outlined"}
                onClick={() => toggleTag(option)}
                color="secondary"
              />
            );
          })}
        </Box>
        <Typography variant="subtitle2">
          {t("frontend.filter.inven")}
        </Typography>
        <Box sx={{ mb: 1, gridColumn: "span 2" }}>
          {filterChipOptions.inven.map((options, idx) => (
            <Chip
              clickable
              key={idx}
              label={t(options)}
              sx={{ mr: 0.7, mb: 0.2, pl: 0.4, pr: 0.4 }}
              variant={invenTags.includes(options) ? "filled" : "outlined"}
              onClick={() => toggleTag(options)}
              color="secondary"
            />
          ))}
        </Box>
        <Typography variant="subtitle2">
          {t("frontend.filter.staralign")}
        </Typography>
        <Box sx={{ mb: 1, gridColumn: "span 2" }}>
          {filterChipOptions.staralign.map((options, idx) => (
            <Chip
              clickable
              key={idx}
              label={t(options)}
              sx={{ mr: 0.7, mb: 0.2, pl: 0.4, pr: 0.4 }}
              variant={staralignTags.includes(options) ? "filled" : "outlined"}
              onClick={() => toggleTag(options)}
              color="secondary"
            />
          ))}
        </Box>
        <Typography variant="subtitle2">{t("frontend.filter.type")}</Typography>
        <Typography variant="subtitle2">{t("frontend.filter.get")}</Typography>
        <Box sx={{ mb: 1 }}>
          {filterChipOptions.type.map((options, idx) => (
            <Chip
              clickable
              key={idx}
              label={t(options)}
              sx={{ mr: 0.7, mb: 0.2, pl: 0.4, pr: 0.4 }}
              variant={typeTags.includes(options) ? "filled" : "outlined"}
              onClick={() => toggleTag(options)}
              color="secondary"
            />
          ))}
        </Box>
        <Box sx={{ mb: 1 }}>
          {filterChipOptions.get.map((options, idx) => (
            <Chip
              clickable
              key={idx}
              label={t(options)}
              sx={{ mr: 0.7, mb: 0.2, pl: 0.4, pr: 0.4 }}
              variant={getTags.includes(options) ? "filled" : "outlined"}
              onClick={() => toggleTag(options)}
              color="secondary"
            />
          ))}
        </Box>
        <Typography variant="subtitle2">
          {t("frontend.filter.alter")}
        </Typography>
        <Box sx={{ mb: 3, gridColumn: "span 2" }}>
          {filterChipOptions.alter.map((options, idx) => (
            <Chip
              clickable
              key={idx}
              label={t(options)}
              sx={{ mr: 0.7, mb: 0.2, pl: 0.4, pr: 0.4 }}
              variant={alterTags.includes(options) ? "filled" : "outlined"}
              onClick={() => toggleTag(options)}
              color="secondary"
            />
          ))}
        </Box>
        <PersonalitySelectBox />
        {["GRASTA", "SEARCH"].includes(modalType) ? (
          <>
            <Typography variant="subtitle2">
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
          </>
        ) : null}
        <br />
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
