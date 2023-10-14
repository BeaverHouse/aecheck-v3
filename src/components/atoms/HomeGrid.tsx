import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import SearchIcon from '@mui/icons-material/Search';
import AssessmentIcon from '@mui/icons-material/Assessment';
import LinkIcon from '@mui/icons-material/Link';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import useConfigStore from '../../store/useConfigStore';
import useFilterStore from '../../store/useFilterStore';
import styled from '@mui/material/styles/styled';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    ...theme.typography.h6,
    padding: theme.spacing(1),
    flexGrow: 1,
    height: 100,
    textAlign: 'center',
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
    const { checkPath } = useConfigStore();
    const { removeFilter } = useFilterStore();

    const checkRedirect = [
        "/check/character",
        "/check/manifest",
        "/check/grasta",
    ].includes(checkPath) ? checkPath : "/check/character"

    const handleclick = (path: string) => {
        removeFilter();
        navigate(path);
    }

    return (
        <Box sx={{
            maxWidth: 400,
            margin: 2,
        }}>
            <Grid container spacing={1}>
                <Grid xs={6}>
                    <Item onClick={() => handleclick(checkRedirect)}>
                        <CheckCircleOutlineIcon fontSize="large" />
                        {t("frontend.menu.check")}
                    </Item>
                </Grid>
                <Grid xs={6}>
                    <Item onClick={() => handleclick(`/search/character`)}>
                        <SearchIcon fontSize='large' />
                        {t("frontend.menu.search")}
                    </Item>
                </Grid>
                <Grid xs={6}>
                    <Item>
                        <AssessmentIcon fontSize='large' />
                        {t("frontend.menu.analyze")}
                    </Item>
                </Grid>
                <Grid xs={6}>
                    <Item>
                        <LinkIcon fontSize='large' />
                        {t("frontend.menu.link")}
                    </Item>
                </Grid>
                <Grid xs={12}>
                    <Item sx={{
                        height: 50,
                    }}>
                        {t("frontend.menu.loader")}
                    </Item>
                </Grid>
            </Grid>
        </Box>
    );
}