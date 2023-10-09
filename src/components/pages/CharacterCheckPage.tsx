import React, { lazy, Suspense } from 'react'
import Box from '@mui/material/Box';
import { pickups } from '../../constant/updates';
import { characters } from '../../constant/parseData';
import useFilterStore from '../../store/useFilterStore';
import { useTranslation } from 'react-i18next';
import FilterBox from '../molecules/FilterBox';
import CircularProgress from '@mui/material/CircularProgress';

const CharacterCheck = lazy(() => import("../atoms/CharacterCheck"));

function CharacterCheckPage() {

    const { searchWord } = useFilterStore()
    const { t } = useTranslation()

    const filteredArr = characters.filter((c) => c.id < 1000)
        .sort((c) => pickups.includes(c.id) ? -1 : 1)
        .filter((c) => t(`c${c.code}`).includes(searchWord))

    return (
        <Box sx={{
            mt: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <FilterBox />
            <Suspense fallback={<CircularProgress sx={{ margin: 6 }} />}>
                <Box sx={{
                    width: "98%",
                    maxWidth: "1350px",
                    display: "grid",
                    justifyContent: "center",
                    margin: 3,
                    gridTemplateColumns: "repeat(auto-fill, 75px)",
                    gap: 1.3,
                }}>
                    {filteredArr
                        .map((c) => <CharacterCheck key={c.id} info={c} />)}
                </Box>
            </Suspense>
        </Box>
    )
}

export default CharacterCheckPage