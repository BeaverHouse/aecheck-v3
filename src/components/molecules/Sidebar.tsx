import React from 'react'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import SearchIcon from '@mui/icons-material/Search';
import AssessmentIcon from '@mui/icons-material/Assessment';
import LinkIcon from '@mui/icons-material/Link';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { isMobile } from 'react-device-detect';
import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useFilterStore from '../../store/useFilterStore';
import useConfigStore from '../../store/useConfigStore';
import LanguageButton from '../atoms/LanguageButton';
import HomeIcon from '@mui/icons-material/Home';

function Sidebar() {

    const [open, setOpen] = React.useState(false)
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { changeCheckPath } = useConfigStore();
    const { removeFilter } = useFilterStore();

    const anchor = isMobile ? "top" : "left"


    const handleCheckClick = (path: string) => {
        changeCheckPath(path)
        if (!window.location.pathname.startsWith("/check")) removeFilter()
        navigate(`/check/${path}`);
    }

    const handleSearchClick = () => {
        if (!window.location.pathname.startsWith("/search")) removeFilter()
        navigate(`/search`);
    }

    return (
        <>
            <IconButton
                size="medium"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 1 }}
                onClick={() => setOpen(true)}
            >
                <MenuIcon />
            </IconButton>
            <Drawer
                anchor={anchor}
                open={open}
                onClose={() => setOpen(false)}
            >
                <Box
                    sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Box
                        sx={{ width: anchor === 'top' ? '100%' : 250, padding: 1.5 }}
                        role="menubar"
                        textAlign={"center"}
                        onClick={() => setOpen(false)}
                        onKeyDown={() => setOpen(false)}
                    >
                        {isMobile ? null : <>
                            <Typography variant={"h5"}>AE Check</Typography>
                            <Divider sx={{ mt: 1.5, mb: 0.5 }} />
                        </>}
                        <List>
                            <ListItemButton sx={{ height: 30, pl: 0 }} onClick={() => navigate("/")}>
                                <HomeIcon sx={{ mr: 1 }} />
                                <ListItemText primary={"HOME"} />
                            </ListItemButton>
                            <Divider sx={{ mt: 1.5, mb: 1.5 }} />
                            <ListItem disablePadding>
                                <CheckCircleOutlineIcon sx={{ mr: 1 }} />
                                <ListItemText primary={t("menu.check")} />
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton sx={{ height: 30, pl: 3 }} onClick={() => handleCheckClick("character")}>
                                    <ListItemText primary={`- ${t("tab.character")}`} />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton sx={{ height: 30, pl: 3 }} onClick={() => handleCheckClick("manifest")}>
                                    <ListItemText primary={`- ${t("manifest.step1")}`} />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton sx={{ height: 30, pl: 3 }} onClick={() => handleCheckClick("grasta")}>
                                    <ListItemText primary={`- ${t("tab.grasta")}`} />
                                </ListItemButton>
                            </ListItem>
                            <Divider sx={{ mt: 1.5, mb: 1.5 }} />
                            <ListItemButton sx={{ height: 30, pl: 0 }} onClick={() => handleSearchClick()}>
                                <SearchIcon sx={{ mr: 1 }} />
                                <ListItemText primary={t("menu.search")} />
                            </ListItemButton>
                            <ListItemButton sx={{ height: 30, pl: 0 }} onClick={() => navigate("/analyze")}>
                                <AssessmentIcon sx={{ mr: 1 }} />
                                <ListItemText primary={t("menu.analyze")} />
                            </ListItemButton>
                            <ListItemButton sx={{ height: 30, pl: 0 }} onClick={() => navigate("/link")}>
                                <LinkIcon sx={{ mr: 1 }} />
                                <ListItemText primary={t("menu.link")} />
                            </ListItemButton>
                            <Divider sx={{ mt: 1.5, mb: 1.5 }} />
                            <ListItemButton sx={{ height: 30, pl: 0 }}>
                                <ListItemText primary={t("menu.loader")} />
                            </ListItemButton>
                        </List>
                    </Box>
                    <Box flexGrow={1} />
                    <LanguageButton />
                </Box>
            </Drawer>
        </>
    )
}

export default Sidebar