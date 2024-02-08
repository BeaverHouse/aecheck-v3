import React, { lazy, Suspense } from "react";
import Box from "@mui/material/Box";
import { pickups } from "../../constant/updates";
import { characters } from "../../constant/parseData";
import useFilterStore from "../../store/useFilterStore";
import { useTranslation } from "react-i18next";
import FilterBox from "../molecules/FilterBox";
import CircularProgress from "@mui/material/CircularProgress";
import { filterVanilla } from "../../util/arrayUtil";
import {
  commonFiltered,
  getCharacterStatus,
  getShortName,
} from "../../util/func";
import useCheckStore from "../../store/useCheckStore";

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
    essenTialPersonalityTags,
    staralignTags,
  } = useFilterStore();
  const { inven } = useCheckStore();
  const { t, i18n } = useTranslation();

  const baseCharacters = characters
    .filter((c) => c.id < 1000)
    .sort((a, b) =>
      getShortName(t(`c${a.code}`), i18n.language).localeCompare(
        getShortName(t(`c${b.code}`), i18n.language)
      )
    );

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
      t(`c${info.code}`).toLowerCase().includes(searchWord.toLowerCase()) &&
      invenTags.includes(getCharacterStatus(info, inven)),
    baseCharacters
  );

  const pickedArr = filteredArr.filter((c) => pickups.includes(c.id));
  const encounterArr = filteredArr.filter((c) =>
    c.tags.includes("get.notfree")
  );
  const freeArr = filteredArr.filter((c) => c.tags.includes("get.free"));

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
        type="CHARACTER"
        filteredInfo={filteredArr}
        label={t("frontend.search.char")}
      />
      <Suspense fallback={<CircularProgress sx={{ margin: 10 }} />}>
        {[pickedArr, encounterArr, freeArr].map((arr) =>
          arr.length > 0 ? (
            <Box
              sx={{
                width: "99%",
                maxWidth: "1350px",
                display: "grid",
                justifyContent: "center",
                margin: 3,
                gridTemplateColumns: "repeat(auto-fill, 75px)",
                columnGap: 2,
                rowGap: 3,
              }}
            >
              {arr.map((c) => (
                <CharacterCheck key={c.id} info={c} />
              ))}
            </Box>
          ) : null
        )}
      </Suspense>
    </Box>
  );
}

export default CharacterCheckPage;
