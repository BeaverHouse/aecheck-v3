import React, { lazy, Suspense } from 'react'
import Box from '@mui/material/Box';
import { pickups } from '../../constant/updates';
import { characters } from '../../constant/parseData';
import useFilterStore from '../../store/useFilterStore';
import { useTranslation } from 'react-i18next';
import FilterBox from '../molecules/FilterBox';
import CircularProgress from '@mui/material/CircularProgress';
import { filterVanilla } from '../../util/arrayUtil';
import { commonFiltered, getCharacterStatus } from '../../util/func';
import useCheckStore from '../../store/useCheckStore';

const CharacterCheck = lazy(() => import("../atoms/CharacterCheck"));

function CharacterCheckPage() {

    const {
        searchWord,
        styleTags,
        alterTags,
        manifestTags,
        typeTags,
        getTags,
        invenTags,
        choosePersonalityTags,
        essenTialPersonalityTags
    } = useFilterStore()
    const { inven } = useCheckStore();
    const { t } = useTranslation()

    const baseCharacters = characters.filter((c) => c.id < 1000)
        .sort((a, b) => {
            const a_pick = pickups.includes(a.id) ? -1 : 1
            const b_pick = pickups.includes(b.id) ? -1 : 1
            return a_pick === b_pick ? a.code - b.code : a_pick - b_pick
        });

    const filteredArr = filterVanilla(
        (info) => (
            commonFiltered(
                info,
                styleTags,
                alterTags,
                manifestTags,
                typeTags,
                getTags,
                choosePersonalityTags,
                essenTialPersonalityTags
            ) &&
            t(`c${info.code}`).toLowerCase().includes(searchWord.toLowerCase()) &&
            invenTags.includes(getCharacterStatus(info, inven))
        ),
        baseCharacters
    )

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <FilterBox type="CHARACTER" filteredInfo={filteredArr} />
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