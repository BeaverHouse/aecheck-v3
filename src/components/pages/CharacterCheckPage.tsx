import React, { lazy, Suspense } from 'react'
import Box from '@mui/material/Box';
import { pickups } from '../../constant/updates';
import { characters } from '../../constant/parseData';
import useFilterStore from '../../store/useFilterStore';
import { useTranslation } from 'react-i18next';
import FilterBox from '../organisms/FilterBox';
import CircularProgress from '@mui/material/CircularProgress';
import { arrAllIncludes, arrOverlap, filterVanilla } from '../../util/arrayUtil';

const CharacterCheck = lazy(() => import("../atoms/CharacterCheck"));

function CharacterCheckPage() {

    const {
        searchWord,
        styleTags,
        alterTags,
        manifestTags,
        typeTags,
        getTags,
        choosePersonalityTags,
        essenTialPersonalityTags
    } = useFilterStore()
    const { t } = useTranslation()

    const baseCharacters = characters.filter((c) => c.id < 1000);

    const filteredArr = [
        styleTags, alterTags, manifestTags, typeTags, getTags
    ].reduce(
        (prev, tags) => filterVanilla((c) => arrOverlap(c.tags, tags), prev),
        baseCharacters
    ).filter((c) => choosePersonalityTags.length <= 0 || arrOverlap(c.tags, choosePersonalityTags))
        .filter((c) => arrAllIncludes(c.tags, essenTialPersonalityTags))
        .filter((c) => t(`c${c.code}`).includes(searchWord))
        .sort((c) => pickups.includes(c.id) ? -1 : 1)



    return (
        <Box sx={{
            mt: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <FilterBox type="CHARACTER" />
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