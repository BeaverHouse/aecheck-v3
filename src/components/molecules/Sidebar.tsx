import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelIcon from "@mui/icons-material/Cancel";
import SearchIcon from "@mui/icons-material/Search";
import AssessmentIcon from "@mui/icons-material/Assessment";
import LinkIcon from "@mui/icons-material/Link";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import SaveIcon from "@mui/icons-material/Save";
import MenuIcon from "@mui/icons-material/Menu";
import { useTranslation } from "react-i18next";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useFilterStore from "../../store/useFilterStore";
import useConfigStore from "../../store/useConfigStore";
import LanguageButton from "../atoms/LanguageButton";
import HomeIcon from "@mui/icons-material/Home";
import {
  analyzeMenuData,
  checkMenuData,
  searchMenuData,
} from "../../constant/fixedData";
import useModalStore from "../../store/useModalStore";

function Sidebar() {
  const [open, setOpen] = React.useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { changeCheckPath, changeAnalyzePath } = useConfigStore();
  const { removeFilter } = useFilterStore();
  const { setModal } = useModalStore();

  const handleCheckClick = (path: string) => {
    changeCheckPath(`/check/${path}`);
    if (!window.location.pathname.startsWith("/check")) removeFilter();
    navigate(`/check/${path}`);
  };

  const handleSearchClick = (path: string) => {
    if (window.location.pathname !== `/search/${path}`) removeFilter();
    navigate(`/search/${path}`);
  };

  const handleAnalyzeClick = (path: string) => {
    changeAnalyzePath(`/analyze/${path}`);
    navigate(`/analyze/${path}`);
  };

  return (
    <>
      <IconButton
        size="medium"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ minWidth: 40, ml: 0 }}
        onClick={() => setOpen(true)}
      >
        <MenuIcon />
      </IconButton>
      <Drawer anchor={"left"} open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{ width: 220, padding: 1.5 }}
            role="menubar"
            textAlign={"center"}
            onClick={() => setOpen(false)}
            onKeyDown={() => setOpen(false)}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h6">AE Check</Typography>
              <IconButton onClick={() => setOpen(false)}>
                <CancelIcon />
              </IconButton>
            </Box>
            <Divider sx={{ mt: 1, mb: 0.5 }} />
            <List>
              <ListItemButton
                sx={{ height: 30, pl: 0 }}
                onClick={() => navigate("/")}
              >
                <HomeIcon sx={{ mr: 1 }} />
                <ListItemText primary={"HOME"} />
              </ListItemButton>
              <Divider sx={{ mt: 1.5 }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <CheckCircleOutlineIcon sx={{ mr: 0.5 }} />
                  <ListItemText primary={t("frontend.menu.check")} />
                </Box>
              </Divider>
              {checkMenuData.map((i) => (
                <ListItemButton
                  sx={{ height: 30 }}
                  onClick={() => handleCheckClick(i.subpath)}
                >
                  <ListItemText primary={t(i.labelTag)} />
                </ListItemButton>
              ))}
              <Divider sx={{ mt: 1.5 }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <SearchIcon sx={{ mr: 0.5 }} />
                  <ListItemText primary={t("frontend.menu.search")} />
                </Box>
              </Divider>
              {searchMenuData.map((i) => (
                <ListItemButton
                  sx={{ height: 30 }}
                  onClick={() => handleSearchClick(i.subpath)}
                >
                  <ListItemText
                    primary={`${t(i.labelTag)} ${t("frontend.word.info")}`}
                  />
                </ListItemButton>
              ))}
              <Divider sx={{ mt: 1.5 }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <AssessmentIcon sx={{ mr: 0.5 }} />
                  <ListItemText primary={t("frontend.menu.analyze")} />
                </Box>
              </Divider>
              {analyzeMenuData.map((i) => (
                <ListItemButton
                  sx={{ height: 30 }}
                  onClick={() => handleAnalyzeClick(i.subpath)}
                >
                  <ListItemText primary={t(i.labelTag)} />
                </ListItemButton>
              ))}
              <Divider sx={{ mt: 1.5, mb: 1.5 }} />
              <ListItemButton
                sx={{ height: 30, pl: 0 }}
                onClick={() => navigate("/link")}
              >
                <LinkIcon sx={{ mr: 1 }} />
                <ListItemText primary={t("frontend.menu.link")} />
              </ListItemButton>
              <ListItemButton
                sx={{ height: 30, pl: 0 }}
                onClick={() => setModal("DATALOADER")}
              >
                <SaveIcon sx={{ mr: 1 }} />
                <ListItemText primary={t("frontend.menu.loader")} />
              </ListItemButton>
            </List>
          </Box>
          <Box flexGrow={1} />
          <LanguageButton />
        </Box>
      </Drawer>
    </>
  );
}

export default Sidebar;
