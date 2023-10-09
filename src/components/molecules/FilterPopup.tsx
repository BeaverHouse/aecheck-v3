import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { useTranslation } from 'react-i18next';
import Chip from '@mui/material/Chip';
import useFilterStore from '../../store/useFilterStore';
import { filterChipOptions } from '../../constant/fixedData';
import PersonalitySelectBox from '../atoms/PersonalitySelectBox';
import { personalities } from '../../constant/parseData';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "95%",
    maxWidth: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    fontWeight: 800,
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    p: 1,
};

function FilterPopup() {
    const [open, setOpen] = React.useState(false);
    const {
        toggleTag,
        styleTags,
        alterTags,
        getTags,
        manifestTags,
        typeTags,
    } = useFilterStore()
    const { t } = useTranslation();

    return (
        <Box sx={{ mr: 1 }}>
            <IconButton
                onClick={() => setOpen(true)}
                sx={{
                    color: "white",
                    bgcolor: 'text.secondary',
                }}
            >
                <FilterAltIcon />
            </IconButton>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography variant="h6" component="h2" sx={{ mb: 2, gridColumn: "span 2" }}>
                        Filter
                    </Typography>

                    <Box sx={{ mb: 3, gridColumn: "span 2" }}>
                        {filterChipOptions.style.map((options, idx) => (
                            <Chip clickable key={idx} label={t(options)}
                                sx={{ mr: 0.7, pl: 0.4, pr: 0.4 }}
                                variant={styleTags.includes(options) ? "filled" : "outlined"}
                                onClick={() => toggleTag(options)}
                                color='secondary'
                            />
                        ))}
                    </Box>
                    <Box sx={{ mb: 3, gridColumn: "span 2" }}>
                        {filterChipOptions.alter.map((options, idx) => (
                            <Chip clickable key={idx} label={t(options)}
                                sx={{ mr: 0.7, pl: 0.4, pr: 0.4 }}
                                variant={alterTags.includes(options) ? "filled" : "outlined"}
                                onClick={() => toggleTag(options)}
                                color='secondary'
                            />
                        ))}
                    </Box>
                    <Box sx={{ mb: 3, gridColumn: "span 2" }}>
                        {filterChipOptions.manifest.map((options, idx) => (
                            <Chip clickable key={idx} label={t(options)}
                                sx={{ mr: 0.7, pl: 0.4, pr: 0.4 }}
                                variant={manifestTags.includes(options) ? "filled" : "outlined"}
                                onClick={() => toggleTag(options)}
                                color='secondary'
                            />
                        ))}
                    </Box>
                    <Box>
                        {filterChipOptions.type.map((options, idx) => (
                            <Chip clickable key={idx} label={t(options)}
                                sx={{ mr: 0.7, pl: 0.4, pr: 0.4 }}
                                variant={typeTags.includes(options) ? "filled" : "outlined"}
                                onClick={() => toggleTag(options)}
                                color='secondary'
                            />
                        ))}
                    </Box>
                    <Box>
                        {filterChipOptions.get.map((options, idx) => (
                            <Chip clickable key={idx} label={t(options)}
                                sx={{ mr: 0.7, pl: 0.4, pr: 0.4 }}
                                variant={getTags.includes(options) ? "filled" : "outlined"}
                                onClick={() => toggleTag(options)}
                                color='secondary'
                            />
                        ))}
                    </Box>
                    <PersonalitySelectBox />

                </Box>
            </Modal>
        </Box>
    )
}

export default FilterPopup