import React from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import useConfigStore from '../../store/useConfigStore';
import { isMobile } from 'react-device-detect';
import useFilterStore from '../../store/useFilterStore';

interface TabsInfo {
    basePath: string;
    tabs: Array<TabInfo>
}

const TopTabs: React.FC<TabsInfo> = ({ basePath, tabs }) => {

    const { t } = useTranslation();
    const navigate = useNavigate();
    const { changeCheckPath, changeAnalyzePath } = useConfigStore();
    const { removeFilter } = useFilterStore();

    const handleChange = (e: any, value: string) => {
        if (basePath === "/check")
            changeCheckPath(value)
        else if (basePath === "/analyze")
            changeAnalyzePath(value)
        if (basePath !== "/check" && window.location.pathname !== value) removeFilter()
        navigate(value)
    }

    return (
        isMobile ? null :
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Tabs
                    value={window.location.pathname}
                    onChange={handleChange}
                    sx={{
                        mt: 1,
                        "& .Mui-selected": {
                            fontWeight: 800
                        }
                    }}
                    textColor='secondary'
                    indicatorColor='secondary'
                >
                    {tabs.map((tab) => <Tab key={tab.subpath} label={t(tab.labelTag)} value={`${basePath}/${tab.subpath}`} />)}
                </Tabs>
            </Box>
    )
}

export default TopTabs