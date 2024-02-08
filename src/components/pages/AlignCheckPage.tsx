import React, { lazy, Suspense } from "react";
import Filterbox from "../molecules/FilterBox";
import { characters } from "../../constant/parseData";
import { filterVanilla } from "../../util/arrayUtil";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import useFilterStore from "../../store/useFilterStore";
import { useTranslation } from "react-i18next";
import { new_manifests } from "../../constant/updates";
import {
  commonFiltered,
  getCharacterStatus,
  getShortName,
} from "../../util/func";
import useCheckStore from "../../store/useCheckStore";

const CharacterStaralign = lazy(
  () => import("../molecules/CharacterStaralign")
);

function AlignCheckPage() {
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
  } = useFilterStore();
  const { inven } = useCheckStore();
  const { t, i18n } = useTranslation();

  const baseCharacters = characters
    .filter((c) => c.tags.includes("staralign.true"))
    .sort((a, b) => {
      const a_pick = new_manifests.includes(a.id) ? -1 : 1;
      const b_pick = new_manifests.includes(b.id) ? -1 : 1;
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
      invenTags.includes(getCharacterStatus(info, inven)) &&
      t(`c${info.code}`).toLowerCase().includes(searchWord.toLowerCase()),
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
      <Filterbox
        type="STARALIGN"
        filteredInfo={filteredArr}
        label={t("frontend.search.char")}
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
            <CharacterStaralign key={c.id} {...c} />
          ))}
        </Box>
      </Suspense>
    </Box>
  );
}

export default AlignCheckPage;
