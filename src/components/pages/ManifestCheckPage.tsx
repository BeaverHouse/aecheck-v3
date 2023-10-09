import React, { lazy, Suspense } from 'react'
import Filterbox from '../molecules/FilterBox';
import { characters } from '../../constant/parseData';
import { arrOverlap } from '../../util/arrayUtil';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Pagination from '@mui/material/Pagination';
import useFilterStore from '../../store/useFilterStore';
import { useTranslation } from 'react-i18next';

const CharacterManifest = lazy(() => import("../molecules/CharacterManifest"));

function ManifestCheckPage() {

    const { searchWord } = useFilterStore()
    const { t } = useTranslation()

    const filteredArr = characters
        .filter((c) => arrOverlap(c.tags, ["manifest.step1", "manifest.step2"]))
        .filter((c) => t(`c${c.code}`).includes(searchWord))

    return (
        <Box sx={{
            mt: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <Filterbox />
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
                    {filteredArr.map((c) => <CharacterManifest key={c.id} {...c} />)}
                </Box>
            </Suspense>
        </Box>
    )
}

export default ManifestCheckPage