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
import {
  DashboardWrapperSx,
  FlexCenter,
} from "../../../constants/style";
import CharacterStaralign from "../../molecules/character/Staralign";
import StaralignFilterButton from "../../atoms/button/StaralignFilter";
import InvenFilterButton from "../../atoms/button/InvenFilter";
import Box from "@mui/material/Box";
import dayjs from "dayjs";
import Grid from "@mui/material/Grid2";
import Pagination from "@mui/material/Pagination";
import { useState, useEffect } from "react";

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
      const aIsRecent = dayjs()
        .subtract(3, "week")
        .isBefore(dayjs(a.lastUpdated));
      const bIsRecent = dayjs()
        .subtract(3, "week")
        .isBefore(dayjs(b.lastUpdated));

      if (aIsRecent && !bIsRecent) return -1;
      if (!aIsRecent && bIsRecent) return 1;

      return getShortName(t(a.code), i18n.language).localeCompare(
        getShortName(t(b.code), i18n.language)
      );
    });

  // pagination 관련 state 추가
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [filteredCharacters, invenStatusFilter, staralignStatusFilter]);

  const getItemsPerPage = () => {
    const width = window.innerWidth;
    if (width >= 1200) return 24; // lg
    if (width >= 900) return 18; // md
    if (width >= 600) return 12; // sm
    return 6; // xs
  };

  const itemsPerPage = getItemsPerPage();
  const totalPages = Math.ceil(targetCharacters.length / itemsPerPage);

  const currentCharacters = targetCharacters.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <Container sx={DashboardWrapperSx}>
      <Box sx={{ ...FlexCenter, flexWrap: "wrap" }}>
        <StaralignFilterButton />
        <InvenFilterButton />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2, mb: 2 }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(_, newPage) => setPage(newPage)}
          color="primary"
          size="small"
        />
      </Box>
      <Grid container spacing={1} columns={24} sx={{ width: "100%" }}>
        {currentCharacters.map((char) => (
          <Grid
            size={{ xs: 24, sm: 12, md: 8, lg: 6 }}
            key={`align-${char.id}`}
            display="flex"
            justifyContent="center"
          >
            <CharacterStaralign key={`align-${char.id}`} {...char} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default StaralignDashboard;
