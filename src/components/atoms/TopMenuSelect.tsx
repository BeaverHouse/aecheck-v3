import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import useConfigStore from "../../store/useConfigStore";
import useFilterStore from "../../store/useFilterStore";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {
  analyzeMenuData,
  checkMenuData,
  searchMenuData,
} from "../../constant/fixedData";
import { Divider } from "@mui/material";

const TopMenuSelect: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { changeCheckPath, changeAnalyzePath, analyzePath, checkPath } =
    useConfigStore();
  const { removeFilter } = useFilterStore();

  const path = window.location.pathname;
  const category = path.split("/")[1];

  const analyzeRedirect = [
    "/analyze/stardream",
    "/analyze/whitekey",
    "/analyze/legacy",
    "/analyze/table",
  ].includes(analyzePath)
    ? analyzePath
    : "/analyze/stardream";
  const checkRedirect = [
    "/check/character",
    "/check/manifest",
    "/check/grasta",
    "/check/staralign",
  ].includes(checkPath)
    ? checkPath
    : "/check/character";
  const searchRedirect = `/search/character`;

  const getOptions = () => {
    switch (category) {
      case "check":
        return checkMenuData;
      case "search":
        return searchMenuData;
      case "analyze":
        return analyzeMenuData;
      default:
        return null;
    }
  };

  const handleChange = (e: SelectChangeEvent) => {
    const value = e.target.value;
    if (value.startsWith("/check")) changeCheckPath(value);
    else if (value.startsWith("/analyze")) changeAnalyzePath(value);
    if (!path.startsWith("/check") && window.location.pathname !== value)
      removeFilter();
    navigate(value);
  };

  if (getOptions() === null) return null;
  return (
    <Select
      size="small"
      labelId="demo-select-small-label"
      id="demo-select-small"
      color="secondary"
      value={window.location.pathname}
      sx={{ minWidth: 250, maxWidth: 250, textAlign: "center", m: "0 auto" }}
      onChange={handleChange}
    >
      {getOptions()!.map((menu) => (
        <MenuItem key={menu.subpath} value={`/${category}/${menu.subpath}`}>
          {menu.labelTag == "frontend.tab.grasta"
            ? `VC ${t(menu.labelTag)}`
            : t(menu.labelTag)}
        </MenuItem>
      ))}
      <Divider />
      {category !== "analyze" ? (
        <MenuItem key={analyzeRedirect} value={analyzeRedirect}>
          <b>{t("frontend.menu.analyze")}</b>
        </MenuItem>
      ) : null}
      {category !== "check" ? (
        <MenuItem key={checkRedirect} value={checkRedirect}>
          <b>{t("frontend.menu.check")}</b>
        </MenuItem>
      ) : null}
      {category !== "search" ? (
        <MenuItem key={searchRedirect} value={searchRedirect}>
          <b>{t("frontend.menu.search")}</b>
        </MenuItem>
      ) : null}
    </Select>
  );
};

export default TopMenuSelect;
