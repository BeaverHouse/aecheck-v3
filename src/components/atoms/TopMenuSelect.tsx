import React from 'react'
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import useConfigStore from '../../store/useConfigStore';
import useFilterStore from '../../store/useFilterStore';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

interface MenuSelectInfo {
    basePath: string;
    menus: Array<TabInfo>
}

const TopMenuSelect: React.FC<MenuSelectInfo> = ({ basePath, menus }) => {

    const { t } = useTranslation();
    const navigate = useNavigate();
    const { changeCheckPath, changeAnalyzePath } = useConfigStore();
    const { removeFilter } = useFilterStore();

    const handleChange = (e: SelectChangeEvent) => {
        const value = e.target.value;
        if (basePath === "/check")
            changeCheckPath(value)
        else if (basePath === "/analyze")
            changeAnalyzePath(value)
        if (basePath !== "/check" && window.location.pathname !== value) removeFilter()
        navigate(value)
    }

    return (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Select
                size='small'
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={window.location.pathname}
                sx={{ mt: 2, width: "100%", maxWidth: 300, }}
                onChange={handleChange}
            >
                {menus.map((menu) => <MenuItem key={menu.subpath} value={`${basePath}/${menu.subpath}`}>{t(menu.labelTag)}</MenuItem>)}

            </Select>
        </Box>
    )
}

export default TopMenuSelect