import React from 'react'
import SearchBox from '../atoms/SearchBox'
import FilterPopup from './FilterPopup';
import Box from '@mui/material/Box';

interface FilterBoxInfo {
    label?: string;
    type: string;
}

const FilterBox: React.FC<FilterBoxInfo> = ({ label = "이름", type }) => {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
            }}
        >
            <FilterPopup type={type} />
            <SearchBox label={label} />
        </Box>
    )
}

export default FilterBox