import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import SearchIcon from "@mui/icons-material/Search";
import AssessmentIcon from "@mui/icons-material/Assessment";
import LinkIcon from "@mui/icons-material/Link";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import useConfigStore from "../../store/useConfigStore";
import useFilterStore from "../../store/useFilterStore";
import styled from "@mui/material/styles/styled";
import useModalStore from "../../store/useModalStore";
import Typography from "@mui/material/Typography";
import { totalCodes } from "../../constant/parseData";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  ...theme.typography.h6,
  padding: theme.spacing(1),
  flexGrow: 1,
  height: 100,
  textAlign: "center",
  color: theme.palette.text.secondary,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
}));

export default function HomeGrid() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { checkPath, analyzePath } = useConfigStore();
  const { removeFilter } = useFilterStore();
  const { setModal } = useModalStore();

  const checkRedirect = [
    "/check/character",
    "/check/manifest",
    "/check/grasta",
  ].includes(checkPath)
    ? checkPath
    : "/check/character";
  const analyzeRedirect = [
    "/analyze/stardream",
    "/analyze/whitekey",
    "/analyze/legacy",
  ].includes(analyzePath)
    ? analyzePath
    : "/analyze/stardream";

  const handleclick = (path: string) => {
    removeFilter();
    navigate(path);
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: 2,
        textAlign: "center",
      }}
    >
      <Typography variant="h6" sx={{ mb: 0.5 }}>
        Total Characters : {totalCodes.length + 23}
      </Typography>
      <Typography variant="subtitle2" sx={{ mb: 2 }}>
        ( {totalCodes.length} + 23 3☆{t("frontend.tab.character")} )
      </Typography>

      <Grid container spacing={1}>
        <Grid xs={6}>
          <Item onClick={() => handleclick(checkRedirect)}>
            <CheckCircleOutlineIcon fontSize="large" />
            {t("frontend.menu.check")}
          </Item>
        </Grid>
        <Grid xs={6}>
          <Item onClick={() => handleclick(`/search/character`)}>
            <SearchIcon fontSize="large" />
            {t("frontend.menu.search")}
          </Item>
        </Grid>
        <Grid xs={6}>
          <Item onClick={() => handleclick(analyzeRedirect)}>
            <AssessmentIcon fontSize="large" />
            {t("frontend.menu.analyze")}
          </Item>
        </Grid>
        <Grid xs={6}>
          <Item onClick={() => handleclick(`/link`)}>
            <LinkIcon fontSize="large" />
            {t("frontend.menu.link")}
          </Item>
        </Grid>
        <Grid xs={12}>
          <Item
            onClick={() => setModal("DATALOADER")}
            sx={{
              height: 50,
            }}
          >
            {t("frontend.menu.loader")}
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
