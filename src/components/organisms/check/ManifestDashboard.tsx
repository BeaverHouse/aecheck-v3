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
  GridList,
  VirtuosoGridStyle,
} from "../../../constants/style";
import ManifestFilterButton from "../../atoms/button/ManifestFilter";
import Button from "@mui/material/Button";
import { VirtuosoGrid } from "react-virtuoso";
import Swal from "sweetalert2";
import dayjs from "dayjs";

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
      const aIsRecent = dayjs().subtract(3, "week").isBefore(dayjs(a.updateDate));
      const bIsRecent = dayjs().subtract(3, "week").isBefore(dayjs(b.updateDate));
      
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
      <VirtuosoGrid
        style={VirtuosoGridStyle}
        components={{
          List: GridList,
        }}
        data={targetCharacters}
        itemContent={(_, char) => (
          <CharacterManifest
            key={`manifest-${char.id}`}
            info={char}
            status={getManifestStatus(allCharacters, char, inven, manifest)}
          />
        )}
      />
    </Container>
  );
}

export default ManifestDashboard;
