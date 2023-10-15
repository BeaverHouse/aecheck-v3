import React, { Suspense } from 'react'
import useCheckStore from '../../store/useCheckStore';
import { characters } from '../../constant/parseData';
import { getCharacterStatus } from '../../util/func';
import dayjs from 'dayjs';
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CircularProgress from '@mui/material/CircularProgress';
import CharacterCheck from '../atoms/CharacterCheck';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import { arrOverlap } from '../../util/arrayUtil';

function WhitekeyAnalyzePage() {

    const [Opened, setOpened] = React.useState([0, 1, 2, 3, 4])
    const { inven } = useCheckStore();
    const { t } = useTranslation()

    const baseCharacters = characters.filter((info) =>
        arrOverlap(info.tags, [
            "alter.true",
            "style.another",
            "style.extra",
        ]) &&
        info.tags.includes("get.notfree")
    ).sort((a, b) => dayjs(a.year!).isBefore(b.year!) ? 1 : -1)

    const firstOptions = baseCharacters.filter((info) => getCharacterStatus(info, inven) === "inven.classchange")
    const today = dayjs()

    const toggleOpened = (idx: number) => {
        setOpened((opened) =>
            opened.includes(idx) ? opened.filter((o) => o !== idx) : [...opened, idx]
        )
    }

    const CollapseOptions = [
        {
            label: "frontend.analyze.oneyear",
            value: firstOptions.filter((info) => dayjs(info.year!).add(1, "year").isAfter(today)),
        },
        // {
        //     label: "frontend.analyze.havebuddy",
        //     value: firstOptions.filter((info) => buddyCharacterIds.includes(info.id)),
        // },
        {
            label: "frontend.analyze.alter",
            value: firstOptions.filter((info) => info.tags.includes("alter.true")),
        },
        {
            label: "frontend.analyze.extra",
            value: firstOptions.filter((info) => info.tags.includes("style.extra")),
        },
        {
            label: "frontend.analyze.another",
            value: firstOptions.filter((info) => info.tags.includes("style.another")),
        },
    ]

    return (
        <Box id="wrapper" sx={{
            m: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <Typography variant='h6' sx={{ mb: 1 }}>
                {t("frontend.description.whitekey")}
            </Typography>
            {CollapseOptions.map((opt, idx) => (
                opt.value.length > 0 ?
                    <Accordion expanded={Opened.includes(idx)} onChange={() => toggleOpened(idx)} sx={{
                        width: "98%",
                        maxWidth: "1100px",
                    }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>{t(opt.label)}</Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ p: 1 }}>
                            <Suspense fallback={<CircularProgress sx={{ margin: 10 }} />}>
                                <Box sx={{
                                    display: "grid",
                                    margin: 2.5,
                                    gridTemplateColumns: "repeat(auto-fill, 75px)",
                                    gap: 1.3,
                                    mr: 2,
                                    ml: 2,
                                }}>
                                    {opt.value
                                        .map((c) => <CharacterCheck key={c.id} info={c} isCheck={false} />)}
                                </Box>
                            </Suspense>
                        </AccordionDetails>
                    </Accordion> : null
            ))}
        </Box>
    )
}

export default WhitekeyAnalyzePage