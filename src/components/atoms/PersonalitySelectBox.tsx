import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { personalities } from "../../constant/parseData";
import useFilterStore from "../../store/useFilterStore";
import { useTranslation } from "react-i18next";
import Typography from "@mui/material/Typography";

// https://github.com/i18next/react-i18next/issues/1543

const PersonalitySelectBox: React.FC = () => {
  const { essenTialPersonalityTags, choosePersonalityTags, setPersonalities } =
    useFilterStore();
  const { t } = useTranslation();

  return (
    <>
      <Typography variant="subtitle2" sx={{ gridColumn: "span 2" }}>
        {t("frontend.filter.essentialpersonality")}
      </Typography>
      <Autocomplete
        multiple
        sx={{ mt: 0.8, mb: 2, gridColumn: "span 2" }}
        options={personalities}
        getOptionLabel={(opt) => t(opt)}
        value={essenTialPersonalityTags}
        filterSelectedOptions
        ChipProps={{
          color: "secondary",
          sx: {
            fontWeight: 800,
          },
        }}
        onChange={(_, value) => setPersonalities(value, true)}
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
      <Typography variant="subtitle2" sx={{ gridColumn: "span 2" }}>
        {t("frontend.filter.choosepersonality")}
      </Typography>
      <Autocomplete
        multiple
        sx={{ mt: 0.8, mb: 2, gridColumn: "span 2" }}
        options={personalities}
        getOptionLabel={(opt) => t(opt)}
        value={choosePersonalityTags}
        filterSelectedOptions
        ChipProps={{
          color: "secondary",
          sx: {
            fontWeight: 800,
          },
        }}
        onChange={(_, value) => setPersonalities(value, false)}
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
  );
};

export default PersonalitySelectBox;
