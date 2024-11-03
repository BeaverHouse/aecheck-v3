import IconButton from "@mui/material/IconButton";
import React from "react";
import useModalStore from "../../store/useModalStore";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Box from "@mui/material/Box";
import { ModalType, CheckMenuOptions } from "../../constants/enum";
import SearchField from "../atoms/SearchField";
import { useTranslation } from "react-i18next";

interface GlobalFilterProps {
    type: CheckMenuOptions;
}

const GlobalFilter: React.FC<GlobalFilterProps> = ({ type }) => {
  const { setModal } = useModalStore();
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "600px",
        display: "flex",
        alignItems: "center",
        margin: "0 auto",
        mb: 1,
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      {type !== CheckMenuOptions.buddies ? (
        <IconButton
          aria-label="Filter Button"
          onClick={() => setModal(ModalType.filter)}
          sx={{
            color: "white",
            m: 0.5,
            width: 40,
            height: 40,
            bgcolor: "text.secondary",
          }}
        >
          <FilterAltIcon />
        </IconButton>
      ) : null}
      <SearchField label={t(`frontend.search.label.${type}`)} />
    </Box>
  );
}

export default GlobalFilter;
