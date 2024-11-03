import { useQuery } from "@tanstack/react-query";
import Grid from "@mui/material/Grid2";
import CharacterDashboard from "../organisms/check/CharacterDashboard";
import ManifestDashboard from "../organisms/check/ManifestDashboard";
import GrastaDashboard from "../organisms/check/GrastaDashboard";
import StaralignDashboard from "../organisms/check/StaralignDashboard";
import useConfigStore from "../../store/useConfigStore";
import BuddyDashboard from "../organisms/check/BuddyDashboard";
import {
  AEAlterStatus,
  AEAwakenStatus,
  AECategories,
  AECharacterStyles,
  AELightShadow,
  AEManifestLevels,
  CheckMenuOptions,
  CheckTabOptions,
} from "../../constants/enum";
import { MainWrapperSx } from "../../constants/style";
import GlobalFilter from "../molecules/GlobalFilter";
import useFilterStore from "../../store/useFilterStore";
import { useTranslation } from "react-i18next";
import Loading from "../atoms/Loading";
import { arrAllIncludes, arrOverlap } from "../../util/arrayUtil";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { fetchAPI } from "../../util/api";

function CheckPage() {
  const { lastCheckMenu, lastCheckTab, updateLastCheckTab } = useConfigStore();
  const { t } = useTranslation();
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

  const allCharacters = (data as APIResponse<CharacterSummary[]>).data;
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

  const component = () => {
    switch (lastCheckTab) {
      case CheckTabOptions.inven:
        return (
          <CharacterDashboard {...{ allCharacters, filteredCharacters }} />
        );
      case CheckTabOptions.manifest:
        return <ManifestDashboard {...{ allCharacters, filteredCharacters }} />;
      case CheckTabOptions.grasta:
        return <GrastaDashboard {...{ allCharacters, filteredCharacters }} />;
      case CheckTabOptions.staralign:
        return (
          <StaralignDashboard {...{ allCharacters, filteredCharacters }} />
        );
    }
  };

  return lastCheckMenu === CheckMenuOptions.characters ? (
    <Box sx={{ flexGrow: 1, pt: 3 }}>
      <GlobalFilter type={CheckMenuOptions.characters} />
      <Box display="flex" justifyContent="center" width="100%">
        <Tabs
          variant="scrollable"
          value={lastCheckTab}
          scrollButtons="auto"
          allowScrollButtonsMobile
          onChange={(_, v) => updateLastCheckTab(v as CheckTabOptions)}
        >
          {Object.values(CheckTabOptions).map((option) => (
            <Tab
              key={option}
              value={option}
              label={t(`frontend.word.${option}`)}
            />
          ))}
        </Tabs>
      </Box>
      {component()}
    </Box>
  ) : (
    <Box sx={{ flexGrow: 1, pt: 3 }}>
      <GlobalFilter type={CheckMenuOptions.buddies} />
      <Grid container spacing={1} sx={MainWrapperSx}>
        <BuddyDashboard />
      </Grid>
    </Box>
  );
}

export default CheckPage;
