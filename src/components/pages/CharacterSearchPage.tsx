import React, { lazy, Suspense } from "react";
import Box from "@mui/material/Box";
import { pickups } from "../../constant/updates";
import { characters } from "../../constant/parseData";
import useFilterStore from "../../store/useFilterStore";
import { useTranslation } from "react-i18next";
import FilterBox from "../molecules/FilterBox";
import CircularProgress from "@mui/material/CircularProgress";
import {
  arrAllIncludes,
  arrOverlap,
  filterVanilla,
} from "../../util/arrayUtil";
import {
  commonFiltered,
  getCharacterStatus,
  getPaddedNumber,
  getShortName,
} from "../../util/func";
import useCheckStore from "../../store/useCheckStore";
import Chip from "@mui/material/Chip";
import { filterChipOptions } from "../../constant/fixedData";
import { isMobile } from "react-device-detect";
import Divider from "@mui/material/Divider";

const CharacterCheck = lazy(() => import("../atoms/CharacterCheck"));

function CharacterSearchPage() {
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
    .filter((c) => c.id < 1000)
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

  const currentStyleFilters = filterChipOptions.style
    .filter((tag) => styleTags.includes(tag))
    .map((a) => t(a));
  const currentManifestFilters = filterChipOptions.manifest
    .filter((tag) => manifestTags.includes(tag))
    .map((a) => t(a));
  const currentInvenFilters = filterChipOptions.inven
    .filter((tag) => invenTags.includes(tag))
    .map((a) => t(a));
  const currentTypeFilters = filterChipOptions.type
    .filter((tag) => typeTags.includes(tag))
    .map((a) => t(a));
  const currentGetFilters = filterChipOptions.get
    .filter((tag) => getTags.includes(tag))
    .map((a) => t(a));
  const currentAlterFilters = filterChipOptions.alter
    .filter((tag) => alterTags.includes(tag))
    .map((a) => t(a));

  const ChipOptions = [
    {
      label: "frontend.filter.style",
      value: currentStyleFilters,
      isAll: currentStyleFilters.length === filterChipOptions.style.length,
    },
    {
      label: "manifest.step1",
      value: currentManifestFilters,
      isAll:
        currentManifestFilters.length === filterChipOptions.manifest.length,
    },
    {
      label: "frontend.filter.inven",
      value: currentInvenFilters,
      isAll: currentInvenFilters.length === filterChipOptions.inven.length,
    },
    {
      label: "frontend.filter.type",
      value: currentTypeFilters,
      isAll: currentTypeFilters.length === filterChipOptions.type.length,
    },
    {
      label: "frontend.filter.get",
      value: currentGetFilters,
      isAll: currentGetFilters.length === filterChipOptions.get.length,
    },
    {
      label: "frontend.filter.alter",
      value: currentAlterFilters,
      isAll: currentAlterFilters.length === filterChipOptions.alter.length,
    },
    {
      label: "frontend.filter.essentialpersonality",
      value: essenTialPersonalityTags,
      isAll: false,
    },
    {
      label: "frontend.filter.choosepersonality",
      value: choosePersonalityTags,
      isAll: false,
    },
    {
      label: "frontend.filter.bookdrop",
      value: dungeon ? [dungeon] : [],
      isAll: false,
    },
  ];

  const fourCharacters = characters.filter(
    (info) =>
      info.id >= 1000 &&
      arrAllIncludes(info.tags, essenTialPersonalityTags) &&
      (choosePersonalityTags.length <= 0 ||
        arrOverlap(info.tags, choosePersonalityTags))
  );

  const encounterArr = filteredArr.filter((c) =>
    c.tags.includes("get.notfree")
  );
  const freeArr = filteredArr.filter((c) => c.tags.includes("get.free"));

  return (
    <>
      <FilterBox
        type="SEARCH"
        label={t("frontend.search.bookchar")}
        filteredInfo={filteredArr}
      />
      <Box
        id="wrapper"
        sx={{
          mt: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {!isMobile ? (
          <Box sx={{ mt: 1, ml: 6, mr: 6 }}>
            {ChipOptions.map((opt) => {
              if (opt.value.length <= 0) return null;
              return (
                <Chip
                  size="small"
                  sx={{ m: 0.2 }}
                  label={`${t(opt.label)}: ${
                    opt.isAll ? "ALL" : opt.value.map((o) => t(o))
                  }`}
                />
              );
            })}
          </Box>
        ) : null}
        <Suspense fallback={<CircularProgress sx={{ margin: 10 }} />}>
          {[encounterArr, freeArr].map((arr) =>
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
                  <CharacterCheck key={c.id} info={c} isCheck={false} />
                ))}
              </Box>
            ) : null
          )}
        </Suspense>
        {choosePersonalityTags.length + essenTialPersonalityTags.length > 0 &&
        fourCharacters.length > 0 ? (
          <>
            <Divider sx={{ color: (theme) => theme.palette.secondary.main }}>
              {t("frontend.search.fourcharacter")}
            </Divider>
            <Suspense fallback={<CircularProgress sx={{ margin: 10 }} />}>
              <Box
                sx={{
                  width: "98%",
                  maxWidth: "1350px",
                  display: "grid",
                  justifyContent: "center",
                  margin: 2.5,
                  gridTemplateColumns: "repeat(auto-fill, 75px)",
                  columnGap: 2,
                  rowGap: 3,
                }}
              >
                {fourCharacters.map((c) => (
                  <CharacterCheck key={c.id} info={c} isCheck={false} />
                ))}
              </Box>
            </Suspense>
          </>
        ) : null}
      </Box>
    </>
  );
}

export default CharacterSearchPage;
