import React from 'react'
import SearchBox from '../atoms/SearchBox'
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import useModalStore from '../../store/useModalStore';

interface FilterBoxInfo {
    label?: string;
    type: string;
}

const FilterBox: React.FC<FilterBoxInfo> = ({ label = "이름", type }) => {

    const {
        setModal
    } = useModalStore()

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
            }}
        >
            <IconButton
                onClick={() => setModal(type)}
                sx={{
                    color: "white",
                    mr: 2,
                    bgcolor: 'text.secondary',
                }}
            >
                <FilterAltIcon />
            </IconButton>
            <SearchBox label={label} />
        </Box>
    )
}

export default FilterBox