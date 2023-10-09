import React from 'react'
import SearchBox from '../atoms/SearchBox'
import FilterPopup from './FilterPopup';
import Box from '@mui/material/Box';

interface FilterBoxInfo {
    label?: string;
}

const FilterBox: React.FC<FilterBoxInfo> = ({ label = "이름" }) => {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
            }}
        >
            <FilterPopup />
            <SearchBox label={label} />
        </Box>
    )
}

export default FilterBox