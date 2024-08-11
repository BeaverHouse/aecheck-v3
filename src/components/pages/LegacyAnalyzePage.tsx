import React, { Suspense } from "react";
import useCheckStore from "../../store/useCheckStore";
import { characters } from "../../constant/parseData";
import { getCharacterStatus, getShortName } from "../../util/func";
import Box from "@mui/material/Box";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CircularProgress from "@mui/material/CircularProgress";
import CharacterCheck from "../atoms/CharacterCheck";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import { elements, weapons } from "../../constant/fixedData";
import Switch from "@mui/material/Switch";
import Downloader from "../atoms/Downloader";
import { arrOverlap } from "../../util/arrayUtil";

function LegacyAnalyzePage() {
  const [Opened, setOpened] = React.useState([0, 1, 2, 3]);
  const [WeaponSort, setWeaponSort] = React.useState(false);
  const { inven } = useCheckStore();
  const { t, i18n } = useTranslation();

  const baseCharacters = characters
    .filter((info) => info.id < 1000)
    .sort((a, b) =>
      getShortName(t(`c${a.code}`), i18n.language).localeCompare(
        getShortName(t(`c${b.code}`), i18n.language)
      )
    );

  /**
   * 1. 없어야 함
   * 2. inven과 클체가능 목록이 겹치는 게 없어야 함
   * 3. 본인 id 앞에 같은 code가 없을 경우만 표시
   */
  const notOwned = baseCharacters.filter(
    (info, idx) =>
      getCharacterStatus(info, inven) === "inven.nothave" &&
      !arrOverlap(inven, info.change || []) &&
      !baseCharacters
        .slice(0, idx)
        .map((c) => c.code)
        .includes(info.code)
  );

  const onlyFour = baseCharacters.filter(
    (info) =>
      getCharacterStatus(info, inven) === "inven.have" &&
      info.tags.includes("style.four") &&
      info.change!.every((id) => !inven.includes(id))
  );

  const ccAvailable = baseCharacters.filter(
    (info) => getCharacterStatus(info, inven) === "inven.classchange"
  );

  const owned = baseCharacters.filter(
    (info) =>
      getCharacterStatus(info, inven) === "inven.have" &&
      !info.tags.includes("style.four")
  );

  const handleSort = () => setWeaponSort((w) => !w);

  const toggleOpened = (idx: number) => {
    setOpened((opened) =>
      opened.includes(idx) ? opened.filter((o) => o !== idx) : [...opened, idx]
    );
  };

  const CollapseOptions = [
    {
      label: "frontend.analyze.legacy.notowned",
      value: notOwned,
      part: ["get.notfree", "get.free"],
    },
    {
      label: "frontend.analyze.legacy.onlyfour",
      value: onlyFour,
      part: ["get.notfree", "get.free"],
    },
    {
      label: "frontend.analyze.legacy.classchange",
      value: ccAvailable,
      part: ["style.normal", "style.another", "style.extra"],
    },
    {
      label: "frontend.analyze.legacy.owned",
      value: owned,
      part: WeaponSort ? weapons : elements,
    },
  ];

  return (
    <Box
      id="wrapper"
      sx={{
        m: 0.5,
        mt: 1.5,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
      }}
    >
      <Typography variant="subtitle1">
        {t("frontend.analyze.legacy.description")}
      </Typography>
      <Downloader tag="wrapper" />
      {CollapseOptions.map((opt, idx) =>
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
            <AccordionDetails sx={{ p: 1, textAlign: "center" }}>
              {opt.label === "frontend.analyze.legacy.owned" ? (
                <Box
                  sx={{
                    m: 2,
                    mt: 0,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {t("frontend.analyze.legacy.sortelement")}
                  <Switch
                    inputProps={{ "aria-label": "Sort Switch" }}
                    color="secondary"
                    checked={WeaponSort}
                    onChange={handleSort}
                  />
                  {t("frontend.analyze.legacy.sortweapon")}
                </Box>
              ) : null}
              {opt.part.map((p) => {
                const filtered = opt.value.filter((val) =>
                  val.tags.includes(p)
                );
                return filtered.length > 0 ? (
                  <>
                    <Typography
                      variant="h6"
                      sx={{
                        mt: 2,
                        mb: 0.5,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {p.startsWith("personality") ? (
                        <img
                          src={`/image/icon/${p}.png`}
                          alt={p}
                          width={30}
                          height={30}
                          style={{
                            width: 30,
                            height: 30,
                            marginRight: 10,
                            pointerEvents: "none",
                          }}
                        />
                      ) : null}
                      {t(p)} ({filtered.length})
                    </Typography>
                    <Suspense
                      fallback={<CircularProgress sx={{ margin: 10 }} />}
                    >
                      <Box
                        sx={{
                          display: "grid",
                          gridTemplateColumns: "repeat(auto-fill, 75px)",
                          justifyContent: "center",
                          gap: 2,
                        }}
                      >
                        {filtered.map((c) => (
                          <CharacterCheck key={c.id} info={c} isCheck={false} />
                        ))}
                      </Box>
                    </Suspense>
                  </>
                ) : null;
              })}
            </AccordionDetails>
          </Accordion>
        ) : null
      )}
    </Box>
  );
}

export default LegacyAnalyzePage;
