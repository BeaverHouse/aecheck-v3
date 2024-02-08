import React, { Suspense } from "react";
import useCheckStore from "../../store/useCheckStore";
import { characters } from "../../constant/parseData";
import { getCharacterStatus, getShortName } from "../../util/func";
import dayjs from "dayjs";
import Box from "@mui/material/Box";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CircularProgress from "@mui/material/CircularProgress";
import CharacterCheck from "../atoms/CharacterCheck";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Downloader from "../atoms/Downloader";

function WhitekeyAnalyzePage() {
  const [Opened, setOpened] = React.useState([0, 1, 2, 3, 4]);
  const [ShowNotOwned, setShowNotOwned] = React.useState(false);
  const { inven } = useCheckStore();
  const { t, i18n } = useTranslation();

  const baseCharacters = characters
    .filter(
      (info) =>
        info.tags.includes("get.notfree") &&
        info.dungeon_drop!.filter((d) => d >= 1000).length > 0
    )
    .sort((a, b) =>
      getShortName(t(`c${a.code}`), i18n.language).localeCompare(
        getShortName(t(`c${b.code}`), i18n.language)
      )
    );

  const firstOptions = baseCharacters.filter(
    (info) => getCharacterStatus(info, inven) === "inven.classchange"
  );
  const secondOptions = baseCharacters.filter(
    (info) => getCharacterStatus(info, inven) !== "inven.have"
  );
  const targetOptions = ShowNotOwned ? secondOptions : firstOptions;

  const today = dayjs();

  const toggleOpened = (idx: number) => {
    setOpened((opened) =>
      opened.includes(idx) ? opened.filter((o) => o !== idx) : [...opened, idx]
    );
  };

  const CollapseOptions = [
    {
      label: "frontend.analyze.oneyear",
      value: targetOptions.filter((info) =>
        dayjs(info.year!).add(1, "year").isAfter(today)
      ),
    },
    // {
    //     label: "frontend.analyze.havebuddy",
    //     value: targetOptions.filter((info) => buddyCharacterIds.includes(info.id)),
    // },
    {
      label: "alter.true",
      value: targetOptions.filter((info) => info.tags.includes("alter.true")),
    },
    {
      label: "frontend.analyze.extra",
      value: targetOptions.filter((info) => info.tags.includes("style.extra")),
    },
    {
      label: "frontend.analyze.another",
      value: targetOptions.filter((info) =>
        info.tags.includes("style.another")
      ),
    },
  ];

  return (
    <Box
      id="wrapper"
      sx={{
        m: 0.5,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <Typography variant="subtitle1" sx={{ m: 1 }}>
        {t("frontend.analyze.whitekey.description")}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Downloader tag="wrapper" />
        <FormGroup sx={{ ml: 1 }}>
          <FormControlLabel
            control={
              <Checkbox
                color="secondary"
                checked={ShowNotOwned}
                onChange={(_, checked) => setShowNotOwned(checked)}
              />
            }
            label={
              <Typography variant="subtitle2">
                {t("frontend.analyze.whitekey.option")}
              </Typography>
            }
          />
        </FormGroup>
      </Box>
      {targetOptions.length > 0 ? (
        CollapseOptions.map((opt, idx) =>
          opt.value.length > 0 ? (
            <Accordion
              expanded={Opened.includes(idx)}
              onChange={() => toggleOpened(idx)}
              sx={{
                width: "98%",
                maxWidth: "1100px",
              }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{t(opt.label)}</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ p: 1 }}>
                <Suspense fallback={<CircularProgress sx={{ margin: 10 }} />}>
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fill, 75px)",
                      justifyContent: "center",
                      gap: 2,
                    }}
                  >
                    {opt.value.map((c) => (
                      <CharacterCheck key={c.id} info={c} isCheck={false} />
                    ))}
                  </Box>
                </Suspense>
              </AccordionDetails>
            </Accordion>
          ) : null
        )
      ) : (
        <>
          <img src="/image/happy.png" alt="empty" />
          <Typography variant="h6" sx={{ m: 1 }}>
            {t("frontend.analyze.whitekey.empty")}
          </Typography>
        </>
      )}
    </Box>
  );
}

export default WhitekeyAnalyzePage;
