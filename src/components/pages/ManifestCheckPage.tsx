import React, { lazy, Suspense } from 'react'
import Filterbox from '../organisms/FilterBox';
import { characters } from '../../constant/parseData';
import { arrOverlap, filterVanilla } from '../../util/arrayUtil';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import useFilterStore from '../../store/useFilterStore';
import { useTranslation } from 'react-i18next';
import { new_manifests } from '../../constant/updates';
import { commonFiltered } from '../../util/func';

const CharacterManifest = lazy(() => import("../molecules/CharacterManifest"));

function ManifestCheckPage() {

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

    const baseCharacters = characters.filter((c) => arrOverlap(c.tags, ["manifest.step1", "manifest.step2"]))
        .sort((c) => new_manifests.includes(c.id) ? -1 : 1)

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
            t(`c${info.code}`).includes(searchWord)
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
            <Filterbox type="MANIFEST" />
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