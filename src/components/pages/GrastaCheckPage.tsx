import React, { lazy, Suspense } from 'react'
import FilterBox from '../organisms/FilterBox';
import { characters } from '../../constant/parseData';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import useFilterStore from '../../store/useFilterStore';
import { useTranslation } from 'react-i18next';
import { arrAllIncludes, arrOverlap } from '../../util/arrayUtil';
import { getPaddedNumber } from '../../util/func';

const CharacterGrasta = lazy(() => import("../molecules/CharacterGrasta"));

function GrastaCheckPage() {

    const {
        searchWord,
        styleTags,
        alterTags,
        manifestTags,
        typeTags,
        getTags,
        choosePersonalityTags,
        essenTialPersonalityTags,
        dungeon
    } = useFilterStore()
    const { t } = useTranslation()

    const baseCharacters = characters.filter((c) => t(`book.char${c.id}`, "").length > 0);

    const filteredArr = [
        styleTags, alterTags, manifestTags, typeTags, getTags, choosePersonalityTags
    ].reduce(
        (prev, tags) => prev.filter((c) => arrOverlap(tags, c.tags)),
        baseCharacters
    ).filter((c) => arrAllIncludes(c.tags, essenTialPersonalityTags))
        .filter((c) => !dungeon || c.dungeon_drop!.map((d) => `drop.dungeon${getPaddedNumber(d, 3)}`).includes(dungeon))
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
            <FilterBox label="이름 or 직업서" type="GRASTA" />
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