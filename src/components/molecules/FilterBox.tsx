import React from 'react'
import SearchBox from '../atoms/SearchBox'
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import useModalStore from '../../store/useModalStore';
import Button from '@mui/material/Button';
import useCheckStore from '../../store/useCheckStore';
import { useTranslation } from 'react-i18next';
import { getManifestStatus } from '../../util/func';

interface FilterBoxInfo {
    label?: string;
    type: string;
    filteredInfo: CharacterInfo[]
}

const FilterBox: React.FC<FilterBoxInfo> = ({ label = "이름", type, filteredInfo }) => {

    const {
        setModal
    } = useModalStore()
    const {
        inven,
        manifest,
        grasta,
        setInven,
        setManifest,
        setGrasta
    } = useCheckStore()
    const { t } = useTranslation()


    const checkAllInven = () => {
        const yn = window.confirm(t("frontend.message.character.checkall"))
        if (yn) {
            let newInven = inven
            filteredInfo.forEach((i) => newInven = newInven.concat([...(i.from || []), i.id]))
            setInven(newInven)
        }
    }
    const clearAllInven = () => {
        const yn = window.confirm(t("frontend.message.character.clearall"))
        if (yn) {
            const newInven = inven.filter((i) => !filteredInfo.map((info) => info.id).includes(i))
            setInven(newInven)
        }
    }
    const checkAllManifest = () => {
        const yn = window.confirm(t("frontend.message.manifest.checkall"))
        if (yn) {
            let newManifest = manifest.filter((m) => !filteredInfo.map((info) => info.id).includes(m % 10000))
            filteredInfo.forEach((info) => {
                const manifestStatus = getManifestStatus(info, inven)
                if (manifestStatus === "manifest.available") {
                    const maxStep = info.tags.includes("manifest.step2") ? 2 : 1
                    newManifest.push(maxStep * 10000 + info.id)
                }
            })
            setManifest(newManifest)
        }
    }
    const clearAllManifest = () => {
        const yn = window.confirm(t("frontend.message.manifest.clearall"))
        if (yn) {
            const newManifest = manifest.filter((m) => !filteredInfo.map((info) => info.id).includes(m % 10000))
            setManifest(newManifest)
        }
    }
    const changeAllGrasta = (step: number) => {
        const yn = window.confirm(t("frontend.message.grasta.changeall"))
        if (yn) {
            let newGrasta = grasta.filter((m) => !filteredInfo.map((info) => info.id).includes(m % 10000))
            if (step > 0) {
                filteredInfo.forEach((info) => {
                    newGrasta.push(step * 10000 + info.id)
                })
            }
            setGrasta(newGrasta)
        }
    }

    const Buttons = () => {
        switch (type) {
            case "CHARACTER":
                return <>
                    <Button variant="contained" color='secondary' sx={{ m: 0.5 }} onClick={clearAllInven}>Clear All</Button>
                    <Button variant="contained" color='info' sx={{ m: 0.5 }} onClick={checkAllInven}>Check All</Button>
                </>
            case "MANIFEST":
                return <>
                    <Button variant="contained" color='secondary' sx={{ m: 0.5 }} onClick={clearAllManifest}>Clear All</Button>
                    <Button variant="contained" color='info' sx={{ m: 0.5 }} onClick={checkAllManifest}>Check All</Button>
                </>
            case "GRASTA":
                return <>
                    {[0, 1, 2].map((i) => (
                        <Button variant="contained" color={i === 0 ? 'secondary' : "info"} sx={{ m: 0.3, pr: 1, pt: 0.5, pb: 0.5 }} onClick={() => changeAllGrasta(i)} key={i}>
                            <b>ALL</b>
                            <img src={`/image/icon/grasta${i}.png`} alt={`${i}`} width={30} height={30} />
                        </Button>
                    ))}
                </>
            default:
                return null
        }
    }

    return (
        <Box
            sx={{
                width: "100%",
                maxWidth: "600px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexWrap: "wrap"
            }}
        >
            {type !== "BUDDY" ? <IconButton
                aria-label="Filter Button"
                onClick={() => setModal(type)}
                sx={{
                    color: "white",
                    m: 0.3,
                    bgcolor: 'text.secondary',
                }}
            >
                <FilterAltIcon />
            </IconButton> : null}
            <SearchBox label={label} />
            <Box>
                {Buttons()}
            </Box>
        </Box >
    )
}

export default FilterBox