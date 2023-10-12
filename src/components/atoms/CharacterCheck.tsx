import React from 'react'
import useCheckStore from '../../store/useCheckStore'
import { useTranslation } from 'react-i18next';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Paper from '@mui/material/Paper';
import { getGrastaStep, getManifestStep, getShortName, grastaIcon, styleIcon } from '../../util/func';
import { pickups } from '../../constant/updates';
import useTheme from '@mui/material/styles/useTheme';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import useModalStore from '../../store/useModalStore';

interface CharacterCheckProps {
    info: CharacterInfo;
    isCheck?: boolean;
}

// 캐릭터 체크 UI
const CharacterCheck: React.FC<CharacterCheckProps> = ({ info, isCheck = true }) => {

    const { addInven, removeInven, inven, grasta, manifest } = useCheckStore();
    const {
        setModal
    } = useModalStore()
    const { t, i18n } = useTranslation()
    const theme = useTheme()

    const name = t(`c${info.code}`);
    const checked = inven.includes(info.id);

    const currentGrastaStep = getGrastaStep(info, grasta)
    const currentManifestStep = getManifestStep(info, manifest)

    const manifestIcon = () => {
        const manifestConpleted = currentManifestStep > 0 && info.tags.includes(`manifest.step${currentManifestStep}`)
        if (manifestConpleted) {
            const style: React.CSSProperties = {
                position: "absolute",
                bottom: -9,
                left: -9,
                zIndex: 10,
            };
            return <img src={`/image/icon/crown.png`} width={25} alt={`complete`} style={style} />
        }
    }

    const statusIcon = () => {
        if (!checked) return null;
        else if (currentGrastaStep > 0) {
            return grastaIcon(currentGrastaStep)
        } else {
            return <CheckCircleIcon color="info"
                sx={{
                    width: 28,
                    height: 28,
                    position: "absolute",
                    right: -5,
                    top: -5,
                    zIndex: 10,
                    backgroundColor: theme.palette.background.paper,
                    borderRadius: "100px",
                }}
            />
        }
    }

    const toggleInven = () => {
        const id = info.id;
        const from = info.from!;    // 체크하는 캐릭터는 반드시 존재
        if (checked)
            removeInven(id)
        else {
            addInven(id)
            for (const i of from) {
                addInven(i)
            }
        }
    }
    return (
        <Paper
            sx={{
                minWidth: 75,
                maxWidth: 75,
                cursor: "pointer",
                position: "relative",
            }}
            onClick={isCheck ? toggleInven : () => setModal(info)}
        >
            {styleIcon(info)}
            {statusIcon()}
            {manifestIcon()}
            <ImageListItem sx={{ maxHeight: 76, borderRadius: "4px", overflow: "hidden" }}>
                <picture>
                    <source srcSet={`/image/data/${info.id}.webp`} type="image/webp" />
                    <img
                        src={`/image/data/${info.id}.png`}
                        alt={name}
                        style={{
                            border: pickups.includes(info.id) ? `3px solid ${theme.palette.secondary.main}` : "",
                            borderRadius: "5px",
                            width: 75,
                            height: "auto",
                            boxSizing: "border-box",
                            pointerEvents: "none",
                        }}
                    />
                </picture>
                <ImageListItemBar subtitle={getShortName(name, i18n.language)} sx={{
                    "& .MuiImageListItemBar-subtitle": {
                        textAlign: "center",
                        fontSize: "12px",
                    },
                    ".MuiImageListItemBar-titleWrap": {
                        padding: 0.5
                    }
                }} />
            </ImageListItem>
        </Paper>
    )
}

export default CharacterCheck