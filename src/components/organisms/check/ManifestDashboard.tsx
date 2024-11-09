import Container from "@mui/material/Container";
import { useTranslation } from "react-i18next";
import useFilterStore from "../../../store/useFilterStore";
import useCheckStore from "../../../store/useCheckStore";
import { getManifestStatus, getNumber, getShortName } from "../../../util/func";
import CharacterManifest from "../../molecules/character/Manifest";
import Box from "@mui/material/Box";
import {
  DashboardWrapperSx,
  FlexCenter,
} from "../../../constants/style";
import ManifestFilterButton from "../../atoms/button/ManifestFilter";
import Button from "@mui/material/Button";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import Grid from "@mui/material/Grid2";
import Pagination from "@mui/material/Pagination";
import { useState, useEffect } from "react";

function ManifestDashboard({
  allCharacters,
  filteredCharacters,
}: DashboardProps) {
  const { t, i18n } = useTranslation();
  const { manifestStatusFilter } = useFilterStore();
  const { inven, manifest, setManifest } = useCheckStore();

  const targetCharacters = filteredCharacters
    .filter((char) => char.maxManifest > 0)
    .filter((char) =>
      manifestStatusFilter.includes(
        getManifestStatus(allCharacters, char, inven, manifest)
      )
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

  const checkAll = () => {
    Swal.fire({
      text: t("frontend.message.manifest.checkall"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        const ids = targetCharacters.map((char) => getNumber(char));

        const newManifest = [
          ...manifest.filter((i) => !ids.includes(i % 10000)),
          ...targetCharacters
            .filter(
              (char) => char.maxManifest > 0 && inven.includes(getNumber(char))
            )
            .map((char) => char.maxManifest * 10000 + getNumber(char)),
        ];

        setManifest(newManifest);
      }
    });
  };

  const uncheckAll = () => {
    Swal.fire({
      text: t("frontend.message.manifest.uncheckall"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        const ids = targetCharacters.map((char) => getNumber(char));

        const newManifest = [
          ...manifest.filter((i) => !ids.includes(i % 10000)),
        ];

        setManifest(newManifest);
      }
    });
  };

  // pagination 관련 state 추가
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [filteredCharacters, manifestStatusFilter]);

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
        <ManifestFilterButton />
        <Button
          variant="contained"
          color="secondary"
          sx={{ m: 0.3 }}
          onClick={() => uncheckAll()}
        >
          CLEAR ALL
        </Button>
        <Button
          variant="contained"
          color="success"
          sx={{ m: 0.3 }}
          onClick={() => checkAll()}
        >
          CHECK ALL
        </Button>
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

      <Grid container spacing={1} columns={24}>
        {currentCharacters.map((char) => (
          <Grid
            size={{ xs: 24, sm: 12, md: 8, lg: 6 }}
            key={`manifest-${char.id}`}
            display="flex"
            justifyContent="center"
          >
            <CharacterManifest
              key={`manifest-${char.id}`}
              info={char}
              status={getManifestStatus(allCharacters, char, inven, manifest)}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default ManifestDashboard;
