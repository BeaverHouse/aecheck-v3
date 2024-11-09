import { useQuery } from "@tanstack/react-query";
import Box from "@mui/material/Box";
import CharacterAvatar from "../../atoms/character/Avatar";
import useModalStore from "../../../store/useModalStore";
import {
  AEAlterStatus,
  AEAwakenStatus,
  AECategories,
  AECharacterStyles,
  AELightShadow,
  AEManifestLevels,
  ModalType,
  CheckMenuOptions,
} from "../../../constants/enum";
import { getShortName } from "../../../util/func";
import { useTranslation } from "react-i18next";
import GlobalFilter from "../../molecules/GlobalFilter";
import useFilterStore from "../../../store/useFilterStore";
import Loading from "../../atoms/Loading";
import { arrAllIncludes, arrOverlap } from "../../../util/arrayUtil";
import Grid from "@mui/material/Grid2";
import Pagination from "@mui/material/Pagination";
import { useState, useEffect } from "react";
import { fetchAPI } from "../../../util/api";
import dayjs from "dayjs";

function CharacterSearch() {
  const { t, i18n } = useTranslation();
  const { setModal } = useModalStore();
  const {
    styleFilter,
    manifestFilter,
    categoryFilter,
    alterFilter,
    lightShadowFilter,
    staralignFilter,
    essenTialPersonalityTags,
    choosePersonalityTags,
    dungeon,
    searchWord,
  } = useFilterStore();
  const { isPending, data } = useQuery({
    queryKey: ["getCharacters"],
    queryFn: () => fetchAPI("character"),
    throwOnError: true,
  });

  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [
    styleFilter,
    manifestFilter,
    categoryFilter,
    alterFilter,
    lightShadowFilter,
    staralignFilter,
    essenTialPersonalityTags,
    choosePersonalityTags,
    dungeon,
    searchWord,
  ]);

  if (isPending) return <Loading />;

  const allCharacters = (data as APIResponse<CharacterSummary[]>).data.sort(
    (a, b) => {
      const aIsRecent = dayjs()
        .subtract(3, "week")
        .isBefore(dayjs(a.updateDate));
      const bIsRecent = dayjs()
        .subtract(3, "week")
        .isBefore(dayjs(b.updateDate));

      if (aIsRecent && !bIsRecent) return -1;
      if (!aIsRecent && bIsRecent) return 1;

      return getShortName(t(a.code), i18n.language).localeCompare(
        getShortName(t(b.code), i18n.language)
      );
    }
  );
  const filteredCharacters = allCharacters.filter(
    (char) =>
      styleFilter.includes(char.style as AECharacterStyles) &&
      manifestFilter.includes(char.maxManifest as AEManifestLevels) &&
      categoryFilter.includes(char.category as AECategories) &&
      alterFilter.includes(char.isAlter as AEAlterStatus) &&
      lightShadowFilter.includes(char.lightShadow as AELightShadow) &&
      staralignFilter.includes(char.isAwaken as AEAwakenStatus) &&
      arrAllIncludes(
        char.personalities.map((p) => p.id),
        essenTialPersonalityTags
      ) &&
      (choosePersonalityTags.length <= 0 ||
        arrOverlap(
          char.personalities.map((p) => p.id),
          choosePersonalityTags
        )) &&
      (!dungeon || char.dungeons.map((d) => d.id).includes(dungeon)) &&
      (t(char.code).toLowerCase().includes(searchWord.toLowerCase()) ||
        t(`book.${char.id}`).toLowerCase().includes(searchWord.toLowerCase()))
  );

  const getItemsPerPage = () => {
    const width = window.innerWidth;
    if (width >= 1200) return 72; // lg
    if (width >= 900) return 48; // md
    if (width >= 600) return 36; // sm
    return 20; // xs
  };

  const itemsPerPage = getItemsPerPage();
  const totalPages = Math.ceil(filteredCharacters.length / itemsPerPage);

  const currentCharacters = filteredCharacters.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <Box sx={{ flexGrow: 1, pt: 1.5 }}>
      <GlobalFilter type={CheckMenuOptions.characters} />
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2, mb: 2 }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(_, newPage) => setPage(newPage)}
          color="primary"
          size="small"
        />
      </Box>

      <Grid container spacing={1} columns={60}>
        {currentCharacters.map((char) => (
          <Grid
            size={{ xs: 15, sm: 10, md: 6 }}
            key={`search-${char.id}`}
            display="flex"
            justifyContent="center"
          >
            <CharacterAvatar
              info={char}
              disableShadow={false}
              onClick={() => setModal(ModalType.character, char.id)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default CharacterSearch;
