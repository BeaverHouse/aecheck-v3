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
import { VirtuosoGrid } from "react-virtuoso";
import { GridList } from "../../../constants/style";
import dayjs from "dayjs";
import { fetchAPI } from "../../../util/api";

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
      t(char.code).toLowerCase().includes(searchWord.toLowerCase())
  );

  return (
    <Box sx={{ flexGrow: 1, pt: 1.5 }}>
      <GlobalFilter type={CheckMenuOptions.characters} />
      <VirtuosoGrid
        style={{
          flexGrow: 1,
          width: "100%",
          height: 600,
        }}
        components={{
          List: GridList,
        }}
        data={filteredCharacters}
        itemContent={(_, char) => (
          <CharacterAvatar
            info={char}
            disableShadow={false}
            onClick={() => setModal(ModalType.character, char.id)}
          />
        )}
      />
    </Box>
  );
}

export default CharacterSearch;
