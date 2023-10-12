import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useTranslation } from 'react-i18next';
import Chip from '@mui/material/Chip';
import useFilterStore from '../../store/useFilterStore';
import { filterChipOptions } from '../../constant/fixedData';
import PersonalitySelectBox from './PersonalitySelectBox';
import Autocomplete from '@mui/material/Autocomplete';
import { dungeons } from '../../constant/parseData';
import TextField from '@mui/material/TextField';
import useModalStore from '../../store/useModalStore';

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

const CharacterModal: React.FC<CharacterInfo> = (info) => {

    const {
        modalInfo,
        hideModal
    } = useModalStore()
    const { t } = useTranslation();

    return (
        <Modal open={(modalInfo as CharacterInfo).id === info.id} onClose={hideModal}>
            <Box sx={style}>
                <Typography variant="h6" component="h2" sx={{ mb: 2, textAlign: "center", gridColumn: "span 2" }}>
                    {info.code}
                </Typography>
            </Box>
        </Modal>
    )
}

export default CharacterModal