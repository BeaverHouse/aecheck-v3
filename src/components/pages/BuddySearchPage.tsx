import React, { lazy, Suspense } from 'react'
import Box from '@mui/material/Box';
import { new_buddies } from '../../constant/updates';
import useFilterStore from '../../store/useFilterStore';
import { useTranslation } from 'react-i18next';
import FilterBox from '../molecules/FilterBox';
import buddies from "../../data/buddy.json";
import CircularProgress from '@mui/material/CircularProgress';
import { filterVanilla } from '../../util/arrayUtil';
import useCheckStore from '../../store/useCheckStore';

const BuddyInfo = lazy(() => import("../atoms/BuddyInfo"));

function BuddySearchPage() {

    const {
        searchWord,
    } = useFilterStore()
    const { inven } = useCheckStore();
    const { t } = useTranslation()

    const baseBuddies = buddies
        .sort((a, b) => {
            const a_pick = new_buddies.includes(a.id) ? -1 : 1
            const b_pick = new_buddies.includes(b.id) ? -1 : 1
            return a_pick === b_pick ? a.code - b.code : a_pick - b_pick
        });

    const filteredArr = filterVanilla(
        (info) => (
            t(`bud${info.code}`).toLowerCase().includes(searchWord.toLowerCase())
        ),
        baseBuddies
    )

    return (
        <Box sx={{
            mt: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <FilterBox type="BUDDY" filteredInfo={[]} />
            <Suspense fallback={<CircularProgress sx={{ margin: 6 }} />}>
                <Box sx={{
                    width: "98%",
                    maxWidth: "1350px",
                    display: "grid",
                    justifyContent: "center",
                    margin: 3,
                    gridTemplateColumns: "repeat(auto-fill, 270px)",
                    gap: 1.3,
                }}>
                    {filteredArr
                        .map((c) => <BuddyInfo key={c.id} {...c} />)}
                </Box>
            </Suspense>
        </Box>
    )
}

export default BuddySearchPage