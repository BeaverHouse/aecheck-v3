import useConfigStore from "../../store/useConfigStore";
import { CheckMenuOptions } from "../../constants/enum";
import CharacterSearch from "../organisms/search/CharacterSearch";
import BuddySearch from "../organisms/search/BuddySearch";
import { MainWrapperSx } from "../../constants/style";
import Box from "@mui/material/Box";

function SearchPage() {
  const { lastSearchMenu } = useConfigStore();

  return (
    <Box sx={MainWrapperSx}>
      {lastSearchMenu === CheckMenuOptions.characters ? (
        <CharacterSearch />
      ) : (
        <BuddySearch />
      )}
    </Box>
  );
}

export default SearchPage;
