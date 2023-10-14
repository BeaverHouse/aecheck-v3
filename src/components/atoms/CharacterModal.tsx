import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useTranslation } from 'react-i18next';
import Chip from '@mui/material/Chip';
import dunJson from "../../data/dungeon.json";
import useFilterStore from '../../store/useFilterStore';
import { elements, filterChipOptions, weapons } from '../../constant/fixedData';
import PersonalitySelectBox from './PersonalitySelectBox';
import Autocomplete from '@mui/material/Autocomplete';
import { dungeons } from '../../constant/parseData';
import TextField from '@mui/material/TextField';
import useModalStore from '../../store/useModalStore';
import { isTypeNode } from 'typescript';
import { getPaddedNumber } from '../../util/func';
import IconButton from '@mui/material/IconButton';
import { isMobile } from 'react-device-detect';

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
    display: "flex",
    flexDirection: "column",
    maxHeight: "80vh",
    overflowY: "auto",
    p: 1.5,
};

const CharacterModal: React.FC<CharacterInfo> = (info) => {


    const {
        modalInfo,
        hideModal
    } = useModalStore()
    const { t } = useTranslation();

    if (info.id >= 1000) return null;

    const styleTag = info.tags.find((t) => t.startsWith("style."));
    const bookName = t(`book.char${info.id}`, "N/A")

    return (
        <Modal open={(modalInfo as CharacterInfo).id === info.id} onClose={hideModal}>
            <Box sx={style}>
                <Typography variant="h6" component="h2" sx={{ textAlign: "center", mb: 1 }}>
                    {t(`c${info.code}`)}({t(`${styleTag}`)})
                </Typography>
                <Box sx={{ display: "flex", width: "100%", alignItems: "center", mb: 3 }}>
                    <picture>
                        <source srcSet={`/image/data/${info.id}.webp`} type="image/webp" />
                        <img
                            src={`/image/data/${info.id}.png`}
                            alt={`${info.code}_${info.id}`}
                            width={80}
                            height={80}
                            style={{
                                width: 75,
                                height: 75,
                                pointerEvents: "none",
                            }}
                        />
                    </picture>
                    <Box sx={{ flexGrow: 1, pl: 2 }}>
                        <Typography variant="subtitle2" component="h2">
                            Char. Code : {info.code}
                            <br />
                            Release : {info.year}
                        </Typography>
                    </Box>
                    <IconButton aria-label="fingerprint" color="success">
                        Link
                    </IconButton>
                </Box>
                <Box sx={{
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: (isMobile ? "column" : "row"),
                    mb: 2
                }}>
                    <Typography variant="subtitle2" component="h2" sx={{ m: 1 }}>
                        {t(`frontend.tag.element`)}
                    </Typography>
                    <Box sx={{ flexGrow: 1 }}>
                        {elements.filter((e) => info.tags.includes(e)).map((ele) => (
                            <img
                                src={`/image/icon/${ele}.png`}
                                alt={ele}
                                width={30}
                                height={30}
                                style={{
                                    width: 30,
                                    height: 30,
                                    pointerEvents: "none",
                                }}
                            />
                        ))}
                    </Box>
                    <Typography variant="subtitle2" component="h2" sx={{ m: 1 }}>
                        {t(`frontend.tag.weapon`)}
                    </Typography>
                    <Box sx={{ flexGrow: 1 }}>
                        {weapons.filter((w) => info.tags.includes(w)).map((wea) => (
                            <img
                                src={`/image/icon/${wea}.png`}
                                alt={wea}
                                width={30}
                                height={30}
                                style={{
                                    width: 30,
                                    height: 30,
                                    pointerEvents: "none",
                                }}
                            />
                        ))}
                    </Box>
                </Box>
                <Box sx={{
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: (isMobile ? "column" : "row"),
                    mb: 2
                }}>
                    <Typography variant="subtitle2" component="h2" sx={{ m: 1 }}>
                        {t(`frontend.tag.personality`)}
                    </Typography>
                    <Box sx={{ flexGrow: 1, textAlign: "center" }}>
                        {info.tags.filter((t) => t.startsWith("personality.")).map((tag) => (
                            <Chip label={t(tag)} size='small' color="default" sx={{ m: 0.2 }} />
                        ))}
                    </Box>
                </Box>
                {bookName !== "N/A" ?
                    <Box sx={{ display: "flex", width: "100%", flexDirection: (isMobile ? "column" : "row"), alignItems: "center", mt: 2 }}>
                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mr: 1, ml: 1 }}>
                            <img
                                src={`/image/icon/book.png`}
                                alt={"book"}
                                width={50}
                                height={50}
                                style={{
                                    width: 50,
                                    height: 50,
                                    pointerEvents: "none",
                                }}
                            />
                            <Typography variant="subtitle1" component="h2">
                                {bookName}
                            </Typography>
                        </Box>
                        <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
                            {dunJson.filter((d) => info.dungeon_drop!.includes(d.id)).map((dun) => (
                                <Box sx={{ display: "flex", textAlign: "center" }}>
                                    <Typography variant={dun.id > 1000 ? "h5" : "subtitle2"} sx={{ m: 1, flexGrow: 1 }}>
                                        {t(`drop.dungeon${getPaddedNumber(dun.id, 3)}`)}
                                    </Typography>
                                    {dun.id < 1000 ? <>
                                        <IconButton aria-label="fingerprint" color="success">
                                            A
                                        </IconButton>
                                        <IconButton aria-label="fingerprint" color="success">
                                            W
                                        </IconButton>
                                    </> : null}
                                </Box>
                            ))}
                        </Box>
                    </Box>
                    : null}
            </Box>
        </Modal>
    )
}

export default CharacterModal