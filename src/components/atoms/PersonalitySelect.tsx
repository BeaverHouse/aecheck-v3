import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import useFilterStore from "../../store/useFilterStore";
import { useTranslation } from "react-i18next";
import Typography from "@mui/material/Typography";
import { useQuery } from "@tanstack/react-query";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

// https://github.com/i18next/react-i18next/issues/1543

const PersonalitySelect: React.FC = () => {
  const { essenTialPersonalityTags, choosePersonalityTags, setPersonalities } =
    useFilterStore();
  const { t } = useTranslation();

  const { isPending, error, data } = useQuery({
    queryKey: ["getPersonalities"],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_URL}/personality`).then((res) =>
        res.json()
      ),
  });

  if (isPending)
    return (
      <Box sx={{ gridColumn: "span 2" }}>
        <CircularProgress />
      </Box>
    );
  if (error) return "An error has occurred: " + error.message;

  const personalities = (data as APIResponse<MappingInfo[]>).data.map(
    (info) => info.id
  );

  return (
    <Box sx={{ gridColumn: "span 2" }}>
      <Typography variant="subtitle2">
        {t("frontend.filter.essentialpersonality")}
      </Typography>
      <Autocomplete
        multiple
        sx={{ mt: 0.8, mb: 2 }}
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
      <Typography variant="subtitle2">
        {t("frontend.filter.choosepersonality")}
      </Typography>
      <Autocomplete
        multiple
        sx={{ mt: 0.8, mb: 2 }}
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
    </Box>
  );
};

export default PersonalitySelect;
