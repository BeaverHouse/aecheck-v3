import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { useTranslation } from 'react-i18next';
import Chip from '@mui/material/Chip';
import useFilterStore from '../../store/useFilterStore';
import { filterChipOptions } from '../../constant/fixedData';
import PersonalitySelectBox from '../atoms/PersonalitySelectBox';
import Autocomplete from '@mui/material/Autocomplete';
import { dungeons } from '../../constant/parseData';
import TextField from '@mui/material/TextField';

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

interface FilterPopupInfo {
    type: string;
}

const FilterPopup: React.FC<FilterPopupInfo> = ({ type }) => {
    const [open, setOpen] = React.useState(false);
    const {
        toggleTag,
        styleTags,
        alterTags,
        getTags,
        manifestTags,
        typeTags,
        dungeon,
        setDungeon
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
                    <Typography variant="h6" component="h2" sx={{ mb: 2, textAlign: "center", gridColumn: "span 2" }}>
                        Filter
                    </Typography>

                    <Typography variant="subtitle2">
                        {t("filter.style")}
                    </Typography>
                    <Box sx={{ mb: 1, gridColumn: "span 2" }}>
                        {filterChipOptions.style.map((option, idx) => {
                            if (["MANIFEST", "GRASTA"].includes(type) && option === "style.four") return null;
                            return <Chip clickable key={idx} label={t(option)}
                                sx={{ mr: 0.7, pl: 0.4, pr: 0.4 }}
                                variant={styleTags.includes(option) ? "filled" : "outlined"}
                                onClick={() => toggleTag(option)}
                                color='secondary'
                            />
                        })}
                    </Box>

                    <Typography variant="subtitle2">
                        {t("filter.manifest")}
                    </Typography>
                    <Box sx={{ mb: 2, gridColumn: "span 2" }}>
                        {filterChipOptions.manifest.map((option, idx) => {
                            if (type === "MANIFEST" && option === "manifest.step0") return null;
                            return <Chip clickable key={idx} label={t(option)}
                                sx={{ mr: 0.7, pl: 0.4, pr: 0.4 }}
                                variant={manifestTags.includes(option) ? "filled" : "outlined"}
                                onClick={() => toggleTag(option)}
                                color='secondary'
                            />
                        })}
                    </Box>
                    <Box sx={{ mb: 1 }}>
                        {filterChipOptions.type.map((options, idx) => (
                            <Chip clickable key={idx} label={t(options)}
                                sx={{ mr: 0.7, pl: 0.4, pr: 0.4 }}
                                variant={typeTags.includes(options) ? "filled" : "outlined"}
                                onClick={() => toggleTag(options)}
                                color='secondary'
                            />
                        ))}
                    </Box>
                    <Box sx={{ mb: 1 }}>
                        {filterChipOptions.get.map((options, idx) => (
                            <Chip clickable key={idx} label={t(options)}
                                sx={{ mr: 0.7, pl: 0.4, pr: 0.4 }}
                                variant={getTags.includes(options) ? "filled" : "outlined"}
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
                    <PersonalitySelectBox />
                    {["GRASTA", "SEARCH"].includes(type) ? <>
                        <Typography variant="subtitle2">
                            {t("filter.dungeon")}
                        </Typography>
                        <Autocomplete
                            sx={{ mt: 0.8, mb: 2, gridColumn: "span 2" }}
                            options={dungeons}
                            getOptionLabel={(opt) => t(opt)}
                            value={dungeon}
                            ChipProps={{
                                color: "secondary",
                                sx: {
                                    fontWeight: 800
                                }
                            }}
                            onChange={(_, value) => setDungeon(value)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    size='small'
                                    color='secondary'
                                    variant="outlined"
                                    label="Select"
                                />
                            )}
                        />
                    </> : null}
                </Box>
            </Modal>
        </Box>
    )
}

export default FilterPopup