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
import { useNavigate } from "react-router-dom";
import LanguageButton from "../atoms/button/Language";
import HomeIcon from "@mui/icons-material/Home";
import useModalStore from "../../store/useModalStore";
import { FlexCenter } from "../../constants/style";
import { MenuOptions, ModalType } from "../../constants/enum";
import { AppInfo } from "../../constants";
import Typography from "@mui/material/Typography";

function AECheckSidebar() {
  const [open, setOpen] = React.useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setModal } = useModalStore();

  const menuData = [
    {
      label: MenuOptions.check,
      icon: <CheckCircleOutlineIcon />,
    },
    {
      label: MenuOptions.search,
      icon: <SearchIcon />,
    },
    {
      label: MenuOptions.analysis,
      icon: <AssessmentIcon />,
    },
    {
      label: MenuOptions.link,
      icon: <LinkIcon />,
    },
  ];

  return (
    <>
      <IconButton
        size="medium"
        edge="start"
        color="inherit"
        sx={{ minWidth: 40, ml: 0 }}
        onClick={() => setOpen(true)}
      >
        <MenuIcon />
      </IconButton>
      <Drawer anchor={"left"} open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            ...FlexCenter,
            height: "100%",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{ width: 240, padding: 1 }}
            textAlign="center"
            onClick={() => setOpen(false)}
            onKeyDown={() => setOpen(false)}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                p: 1,
              }}
            >
              <Typography variant="h6">{AppInfo.name}</Typography>
              <IconButton onClick={() => setOpen(false)}>
                <CancelIcon />
              </IconButton>
            </Box>
            <Divider sx={{ mt: 1, mb: 1 }} />
            <List>
              <ListItemButton
                sx={{ height: 30, p: 0.5 }}
                onClick={() => navigate("/")}
              >
                <HomeIcon />
                <ListItemText primary="HOME" sx={{ ml: 1 }} />
              </ListItemButton>
              <Divider sx={{ mt: 1, mb: 1 }} />
              {menuData.map(({ label, icon }) => (
                <ListItemButton
                  key={label}
                  sx={{ height: 30, p: 0.5, mt: 1 }}
                  onClick={() => navigate(`/${label}`)}
                >
                  {icon}
                  <ListItemText
                    primary={t(`frontend.menu.${label}`)}
                    sx={{ ml: 1 }}
                  />
                </ListItemButton>
              ))}
              <Divider sx={{ mt: 1, mb: 1 }} />
              <ListItemButton
                sx={{ height: 30, p: 0.5 }}
                onClick={() => setModal(ModalType.dataLoader)}
              >
                <SaveIcon />
                <ListItemText
                  primary={t("frontend.menu.loader")}
                  sx={{ ml: 1 }}
                />
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

export default AECheckSidebar;
