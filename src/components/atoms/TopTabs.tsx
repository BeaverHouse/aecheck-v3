import React from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import useConfigStore from '../../store/useConfigStore';
import { isMobile } from 'react-device-detect';

interface TabsInfo {
    basePath: string;
    tabs: Array<TabInfo>
}

const TopTabs: React.FC<TabsInfo> = ({ basePath, tabs }) => {

    const { t } = useTranslation();
    const navigate = useNavigate();
    const { checkPath, changeCheckPath } = useConfigStore();

    const handleChange = (e: any, value: string) => {
        changeCheckPath(value)
        navigate(`${basePath}/${value}`)
    }

    return (
        isMobile ? null :
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Tabs
                    value={checkPath}
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
                    {tabs.map((tab) => <Tab key={tab.subpath} label={t(tab.labelTag)} value={tab.subpath} />)}
                </Tabs>
            </Box>
    )
}

export default TopTabs