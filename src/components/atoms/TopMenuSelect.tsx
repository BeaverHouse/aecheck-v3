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

const TopMenuSelect: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { changeCheckPath, changeAnalyzePath } = useConfigStore();
  const { removeFilter } = useFilterStore();

  const path = window.location.pathname;
  const category = path.split("/")[1];

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
    if (path.startsWith("/check")) changeCheckPath(value);
    else if (path.startsWith("/analyze")) changeAnalyzePath(value);
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
    </Select>
  );
};

export default TopMenuSelect;
