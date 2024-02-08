import React, { lazy, Suspense } from "react";
import FilterBox from "../molecules/FilterBox";
import { characters } from "../../constant/parseData";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import useFilterStore from "../../store/useFilterStore";
import { useTranslation } from "react-i18next";
import { filterVanilla } from "../../util/arrayUtil";
import {
  commonFiltered,
  getCharacterStatus,
  getPaddedNumber,
  getShortName,
} from "../../util/func";
import { pickups } from "../../constant/updates";
import useCheckStore from "../../store/useCheckStore";

const CharacterGrasta = lazy(() => import("../molecules/CharacterGrasta"));

function GrastaCheckPage() {
  const {
    searchWord,
    styleTags,
    alterTags,
    manifestTags,
    typeTags,
    getTags,
    invenTags,
    choosePersonalityTags,
    essenTialPersonalityTags,
    staralignTags,
    dungeon,
  } = useFilterStore();
  const { inven } = useCheckStore();
  const { t, i18n } = useTranslation();

  const baseCharacters = characters
    .filter((c) => t(`book.char${c.id}`, "").length > 0)
    .sort((a, b) => {
      const a_pick = pickups.includes(a.id) ? -1 : 1;
      const b_pick = pickups.includes(b.id) ? -1 : 1;
      return a_pick === b_pick
        ? getShortName(t(`c${a.code}`), i18n.language).localeCompare(
            getShortName(t(`c${b.code}`), i18n.language)
          )
        : a_pick - b_pick;
    });

  const filteredArr = filterVanilla(
    (info) =>
      commonFiltered(
        info,
        styleTags,
        alterTags,
        manifestTags,
        typeTags,
        getTags,
        choosePersonalityTags,
        essenTialPersonalityTags,
        staralignTags
      ) &&
      (t(`c${info.code}`).toLowerCase().includes(searchWord.toLowerCase()) ||
        t(`book.char${info.id}`)
          .toLowerCase()
          .includes(searchWord.toLowerCase())) &&
      invenTags.includes(getCharacterStatus(info, inven)) &&
      (!dungeon ||
        info
          .dungeon_drop!.map((d) => `drop.dungeon${getPaddedNumber(d, 3)}`)
          .includes(dungeon)),
    baseCharacters
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <FilterBox
        label={t("frontend.search.bookchar")}
        type="GRASTA"
        filteredInfo={filteredArr}
      />
      <Suspense fallback={<CircularProgress sx={{ margin: 10 }} />}>
        <Box
          sx={{
            width: "99%",
            maxWidth: "1150px",
            display: "grid",
            justifyContent: "center",
            margin: 3,
            gridTemplateColumns: "repeat(auto-fill, 270px)",
            gap: 2,
          }}
        >
          {filteredArr.map((c) => (
            <CharacterGrasta key={c.id} {...c} />
          ))}
        </Box>
      </Suspense>
    </Box>
  );
}

export default GrastaCheckPage;
