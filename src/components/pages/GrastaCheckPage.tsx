import React, { lazy, Suspense } from 'react'
import FilterBox from '../molecules/FilterBox';
import { characters } from '../../constant/parseData';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Pagination from '@mui/material/Pagination';
import useFilterStore from '../../store/useFilterStore';
import { useTranslation } from 'react-i18next';

const CharacterGrasta = lazy(() => import("../molecules/CharacterGrasta"));

function GrastaCheckPage() {

    const { searchWord } = useFilterStore()
    const { t } = useTranslation()

    const filteredArr = characters
        .filter((c) => t(`book.char${c.id}`, "").length > 0)
        .filter((c) => t(`c${c.code}`).includes(searchWord) || t(`book.char${c.id}`).includes(searchWord))

    return (
        <Box sx={{
            mt: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <FilterBox label="이름 or 직업서" />
            <Pagination sx={{ mt: 3 }} />
            <Suspense fallback={<CircularProgress sx={{ margin: 6 }} />}>
                <Box sx={{
                    width: "98%",
                    maxWidth: "850px",
                    display: "grid",
                    justifyContent: "center",
                    margin: 3,
                    gridTemplateColumns: "repeat(auto-fill, 270px)",
                    gap: 1.3,
                }}>
                    {filteredArr.map((c) => <CharacterGrasta key={c.id} {...c} />)}
                </Box>
            </Suspense>
        </Box>
    )
}

export default GrastaCheckPage