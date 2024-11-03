import Container from "@mui/material/Container";
import { useTranslation } from "react-i18next";
import useFilterStore from "../../../store/useFilterStore";
import useCheckStore from "../../../store/useCheckStore";
import {
  getInvenStatus,
  getNumber,
  getShortName,
  getStep,
} from "../../../util/func";
import { DashboardWrapperSx, FlexCenter, GridList, VirtuosoGridStyle } from "../../../constants/style";
import CharacterStaralign from "../../molecules/character/Staralign";
import StaralignFilterButton from "../../atoms/button/StaralignFilter";
import { VirtuosoGrid } from "react-virtuoso";
import InvenFilterButton from "../../atoms/button/InvenFilter";
import Box from "@mui/material/Box";
import dayjs from "dayjs";

function StaralignDashboard({
  allCharacters,
  filteredCharacters,
}: DashboardProps) {
  const { t, i18n } = useTranslation();
  const { inven, staralign } = useCheckStore();
  const { invenStatusFilter, staralignStatusFilter } = useFilterStore();

  const targetCharacters = filteredCharacters
    .filter((char) => char.isAwaken)
    .filter(
      (char) =>
        staralignStatusFilter.includes(getStep(getNumber(char), staralign)) &&
        invenStatusFilter.includes(getInvenStatus(allCharacters, char, inven))
    )
    .sort((a, b) => {
      const aIsRecent = dayjs().subtract(3, "week").isBefore(dayjs(a.updateDate));
      const bIsRecent = dayjs().subtract(3, "week").isBefore(dayjs(b.updateDate));
      
      if (aIsRecent && !bIsRecent) return -1;
      if (!aIsRecent && bIsRecent) return 1;
      
      return getShortName(t(a.code), i18n.language).localeCompare(
        getShortName(t(b.code), i18n.language)
      );
    });

  return (
    <Container sx={DashboardWrapperSx}>
      <Box sx={{ ...FlexCenter, flexWrap: "wrap" }}>
        <StaralignFilterButton />
        <InvenFilterButton />
      </Box>
      <VirtuosoGrid
        style={VirtuosoGridStyle}
        components={{
          List: GridList,
        }}
        data={targetCharacters}
        itemContent={(_, char) => (
          <CharacterStaralign key={`align-${char.id}`} {...char} />
        )}
      />
    </Container>
  );
}

export default StaralignDashboard;
