import React, { lazy, Suspense } from 'react'
import Filterbox from '../molecules/FilterBox';
import { characters } from '../../constant/parseData';
import { arrOverlap, filterVanilla } from '../../util/arrayUtil';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import useFilterStore from '../../store/useFilterStore';
import { useTranslation } from 'react-i18next';
import { new_manifests } from '../../constant/updates';
import { commonFiltered, getCharacterStatus } from '../../util/func';
import useCheckStore from '../../store/useCheckStore';

const CharacterManifest = lazy(() => import("../molecules/CharacterManifest"));

function ManifestCheckPage() {

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

    const baseCharacters = characters.filter((c) => arrOverlap(c.tags, ["manifest.step1", "manifest.step2"]))
        .sort((a, b) => {
            const a_pick = new_manifests.includes(a.id) ? -1 : 1
            const b_pick = new_manifests.includes(b.id) ? -1 : 1
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
            invenTags.includes(getCharacterStatus(info, inven)) &&
            t(`c${info.code}`).toLowerCase().includes(searchWord.toLowerCase())
        ),
        baseCharacters
    )

    return (
        <Box sx={{
            mt: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
        }}>
            <Filterbox type="MANIFEST" filteredInfo={filteredArr} />
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