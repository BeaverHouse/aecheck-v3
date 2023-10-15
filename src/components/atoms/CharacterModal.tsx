import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useTranslation } from 'react-i18next';
import Chip from '@mui/material/Chip';
import dunJson from "../../data/dungeon.json";
import { elements, weapons } from '../../constant/fixedData';
import useModalStore from '../../store/useModalStore';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import CancelIcon from '@mui/icons-material/Cancel';
import { getCharacterStatus, getGrastaStep, getManifestStep, getPaddedNumber } from '../../util/func';
import IconButton from '@mui/material/IconButton';
import { isMobile } from 'react-device-detect';
import useCheckStore from '../../store/useCheckStore';
import useTheme from '@mui/material/styles/useTheme';

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

    const { inven, grasta, manifest } = useCheckStore();
    const {
        modalInfo,
        hideModal
    } = useModalStore()
    const { t } = useTranslation();
    const theme = useTheme()

    if (info.id >= 1000) return null;

    const styleTag = info.tags.find((t) => t.startsWith("style."));
    const bookName = t(`book.char${info.id}`, "N/A")

    const currentInven = getCharacterStatus(info, inven)
    const currentGrastaStep = getGrastaStep(info, grasta)
    const currentManifestStep = getManifestStep(info, manifest)
    const manifestConpleted = currentManifestStep > 0 && info.tags.includes(`manifest.step${currentManifestStep}`)

    const invenIcon = () => {
        const baseStyle = {
            width: 28,
            height: 28,
            mr: 1,
            backgroundColor: theme.palette.background.paper,
            borderRadius: "100px",
        }
        switch (currentInven) {
            case "inven.have":
                return <CheckCircleIcon color="info" sx={baseStyle} />
            case "inven.classchange":
                return <ErrorIcon color='warning' sx={baseStyle} />
            case "inven.nothave":
                return <CancelIcon color='error' sx={baseStyle} />
            default:
                return null;
        }
    }

    return (
        <Modal open={(modalInfo as CharacterInfo).id === info.id} disableScrollLock={true} onClose={hideModal}>
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
                            C. Code: {info.code}
                            <br />
                            Release: {info.year}
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
                    mb: 1
                }}>
                    {invenIcon()}
                    <Typography variant="subtitle2" component="h2">
                        {t(currentInven)}
                    </Typography>
                </Box>
                {manifestConpleted ? <Box sx={{
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                }}>
                    <img src={`/image/icon/crown.png`} width={28} height={28} alt={`complete`}
                        style={{
                            width: 27,
                            height: 27,
                            marginRight: 8,
                        }}
                    />
                    <Typography variant="subtitle2" component="h2">
                        {t(`manifest.step${currentManifestStep}`)} Complete
                    </Typography>
                </Box> : null}
                <Box sx={{
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: (isMobile ? "column" : "row"),
                    mb: 1,
                    mt: 2
                }}>
                    <Typography variant="subtitle2" component="h2" sx={{ m: 0.5 }}>
                        {t(`frontend.tag.element`)}
                    </Typography>
                    <Box sx={{ flexGrow: 1, m: 0.5 }}>
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
                    <Typography variant="subtitle2" component="h2" sx={{ m: 0.5 }}>
                        {t(`frontend.tag.weapon`)}
                    </Typography>
                    <Box sx={{ flexGrow: 1, m: 0.5 }}>
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
                    mb: 1
                }}>
                    <Typography variant="subtitle2" component="h2" sx={{ m: 1 }}>
                        {t(`frontend.tag.personality`)}
                    </Typography>
                    <Box sx={{ flexGrow: 1, textAlign: "center" }}>
                        {info.tags.filter((t) => t.startsWith("personality.") && !t.endsWith("000")).map((tag) => (
                            <Chip label={t(tag)} size='small' color="default" sx={{ m: 0.2 }} />
                        ))}
                    </Box>
                </Box>
                {bookName !== "N/A" ?
                    <Box sx={{ display: "flex", width: "100%", flexDirection: (isMobile ? "column" : "row"), alignItems: "center", mt: 2 }}>
                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mr: 1, ml: 1 }}>
                            <Box>
                                <img
                                    src={`/image/icon/book.png`}
                                    alt={"book"}
                                    width={40}
                                    height={40}
                                    style={{
                                        width: 40,
                                        height: 40,
                                        pointerEvents: "none",
                                    }}
                                />
                                <img
                                    src={`/image/icon/grasta${currentGrastaStep}.png`}
                                    alt={"book"}
                                    width={40}
                                    height={40}
                                    style={{
                                        width: 40,
                                        height: 40,
                                        pointerEvents: "none",
                                    }}
                                />
                            </Box>
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