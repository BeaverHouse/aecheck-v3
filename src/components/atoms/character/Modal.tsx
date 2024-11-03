import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useTranslation } from "react-i18next";
import Chip from "@mui/material/Chip";
import useModalStore from "../../../store/useModalStore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import CancelIcon from "@mui/icons-material/Cancel";
import { getInvenStatus, getStep } from "../../../util/func";
import useCheckStore from "../../../store/useCheckStore";
import useTheme from "@mui/material/styles/useTheme";
import Avatar from "@mui/material/Avatar";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import {
  AECharacterStyles,
  InvenStatus,
  LanguageOptions,
} from "../../../constants/enum";
import Link from "@mui/material/Link";
import { getNumber } from "../../../util/func";
import { SxProps, Theme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Alert from "@mui/material/Alert";
import { FlexCenter } from "../../../constants/style";

const style: SxProps<Theme> = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "95%",
  maxWidth: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  fontWeight: 800,
  display: "flex",
  flexDirection: "column",
  maxHeight: "75vh",
  overflowY: "auto",
  p: 1.5,
};
const baseStyle = {
  width: 28,
  height: 28,
  mr: 1,
  borderRadius: "100px",
};

const CharacterModal: React.FC = () => {
  const { inven, grasta, manifest, staralign } = useCheckStore();
  const { characterID, hideModal } = useModalStore();
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const characterDetailQuery = useQuery({
    queryKey: ["getCharacterDetail", characterID],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_URL}/character/${characterID}`).then(
        (res) => res.json()
      ),
  });

  const relatedCharacterQuery = useQuery({
    queryKey: ["getRelatedCharacter", characterID],
    queryFn: () =>
      fetch(
        `${import.meta.env.VITE_API_URL}/character/related/${characterID}`
      ).then((res) => res.json()),
  });

  if (characterDetailQuery.isPending || relatedCharacterQuery.isPending) {
    return (
      <Modal open={true} disableScrollLock={true} onClose={hideModal}>
        <Box sx={style}>Loading...</Box>
      </Modal>
    );
  } else if (characterDetailQuery.isError) {
    return (
      <Modal open={true} disableScrollLock={true} onClose={hideModal}>
        <Box sx={style}>
          An error has occurred: {characterDetailQuery.error.message}
        </Box>
      </Modal>
    );
  } else if (relatedCharacterQuery.isError) {
    return (
      <Modal open={true} disableScrollLock={true} onClose={hideModal}>
        <Box sx={style}>
          An error has occurred: {relatedCharacterQuery.error.message}
        </Box>
      </Modal>
    );
  }

  const characterData = (
    characterDetailQuery.data as APIResponse<CharacterDetail>
  ).data;
  const relatedCharacters = (
    relatedCharacterQuery.data as APIResponse<CharacterSummary[]>
  ).data;

  const id = getNumber(characterData);

  const manifestTag = `frontend.manifest.step${characterData.maxManifest}`;
  const bookName = t(`book.${characterData.id}`, "N/A");

  const currentInven = getInvenStatus(relatedCharacters, characterData, inven);
  const currentGrastaStep = getStep(id, grasta);
  const currentManifestStep = getStep(id, manifest);
  const currentAlignStep = getStep(id, staralign);

  const invenIcon = () => {
    switch (currentInven) {
      case InvenStatus.owned:
        return <CheckCircleIcon color="success" sx={baseStyle} />;
      case InvenStatus.ccRequired:
        return <ErrorIcon color="warning" sx={baseStyle} />;
      case InvenStatus.notOwned:
        return <CancelIcon color="error" sx={baseStyle} />;
    }
  };

  return (
    <Modal open={true} disableScrollLock={true} onClose={hideModal}>
      <Box sx={style}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Typography
            variant="h6"
            component="h2"
            sx={{ textAlign: "center", mr: 1, ml: 1 }}
          >
            {t(characterData.code)} ({characterData.style})
          </Typography>
          <img
            src={`${import.meta.env.VITE_CDN_URL}/icon/type-${
              characterData.lightShadow
            }.png`}
            alt={characterData.lightShadow}
            style={{
              width: 30,
              height: 30,
              pointerEvents: "none",
            }}
          />
        </Box>
        <Box
          sx={{ display: "flex", width: "100%", alignItems: "center", mb: 3 }}
        >
          <picture>
            <source
              srcSet={`${import.meta.env.VITE_CDN_URL}/character/${
                characterData.id
              }.webp`}
              type="image/webp"
            />
            <img
              src={`${import.meta.env.VITE_CDN_URL}/character/${
                characterData.id
              }.png`}
              alt={characterData.id}
              style={{
                width: 75,
                height: 75,
                pointerEvents: "none",
              }}
            />
          </picture>
          <Box sx={{ flexGrow: 1, pl: 2 }}>
            <Typography variant="subtitle2" component="h2">
              Release: {dayjs(characterData.updateDate).format("YYYY-MM-DD")}
            </Typography>
          </Box>
          {characterData.seesaaURL ? (
            <Link
              href={
                i18n.language === LanguageOptions.en
                  ? characterData.aewikiURL
                  : characterData.seesaaURL
              }
              target="_blank"
              rel="noreferrer"
            >
              <OpenInNewIcon />
            </Link>
          ) : null}
        </Box>
        {id < 1000 ? (
          <Box
            sx={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              mb: 1,
            }}
          >
            {invenIcon()}
            <Typography variant="subtitle2" component="h2">
              {t(`frontend.status.${currentInven}`)}
            </Typography>
          </Box>
        ) : null}
        {currentManifestStep === characterData.maxManifest &&
        characterData.maxManifest > 0 ? (
          <Box
            sx={{
              display: "flex",
              width: "100%",
              alignItems: "center",
            }}
          >
            <img
              src={`${import.meta.env.VITE_CDN_URL}/icon/crown.png`}
              alt="complete"
              style={{
                width: 28,
                height: 28,
                marginRight: 8,
              }}
            />
            <Typography variant="subtitle2" component="h2">
              {t(manifestTag!)} Complete
            </Typography>
          </Box>
        ) : null}
        {currentAlignStep === 3 && inven.includes(id) ? (
          <Box
            sx={{
              display: "flex",
              width: "100%",
              alignItems: "center",
            }}
          >
            <img
              src={`${import.meta.env.VITE_CDN_URL}/staralign/${
                characterData.id
              }.png`}
              alt="complete"
              style={{
                width: 28,
                height: 28,
                marginRight: 8,
              }}
            />
            <Typography variant="subtitle2" component="h2">
              {t("frontend.word.staralign")} Complete
            </Typography>
          </Box>
        ) : null}
        <Box
          sx={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: isMobile ? "column" : "row",
            mb: 1,
            mt: 2,
          }}
        >
          <Typography variant="subtitle2" component="h2" sx={{ m: 0.5 }}>
            {t(`frontend.word.element`)}
          </Typography>
          <Box sx={{ flexGrow: 1, m: 0.5, textAlign: "center" }}>
            {characterData.personalities
              .filter((p) => p.id.startsWith("personality00"))
              .map((p) => (
                <img
                  key={p.id}
                  src={`${import.meta.env.VITE_CDN_URL}/icon/${p.id}.png`}
                  alt={p.id}
                  style={{
                    width: 30,
                    height: 30,
                    pointerEvents: "none",
                  }}
                />
              ))}
          </Box>
          <Typography variant="subtitle2" component="h2" sx={{ m: 0.5 }}>
            {t(`frontend.word.weapon`)}
          </Typography>
          <Box sx={{ flexGrow: 1, m: 0.5, textAlign: "center" }}>
            {characterData.personalities
              .filter((p) => p.id.startsWith("personality01"))
              .map((p) => (
                <img
                  key={p.id}
                  src={`${import.meta.env.VITE_CDN_URL}/icon/${p.id}.png`}
                  alt={p.id}
                  style={{
                    width: 30,
                    height: 30,
                    pointerEvents: "none",
                  }}
                />
              ))}
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            wordBreak: "keep-all",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: isMobile ? "column" : "row",
            mb: 1,
          }}
        >
          <Typography variant="subtitle2" component="h2" sx={{ m: 0.5 }}>
            {t(`frontend.word.personality`)}
          </Typography>
          <Box sx={{ flexGrow: 1, textAlign: "center" }}>
            {characterData.personalities
              .map((t) => t.id)
              .filter((t) => !t.endsWith("000"))
              .map((tag) => (
                <Chip
                  key={tag}
                  label={t(tag)}
                  size="small"
                  color="default"
                  sx={{ m: 0.2 }}
                />
              ))}
          </Box>
        </Box>
        {characterData.buddy ? (
          <Box
            sx={{
              display: "flex",
              wordBreak: "keep-all",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: isMobile ? "column" : "row",
              mb: 2,
              mt: 2,
            }}
          >
            <Typography variant="subtitle2" component="h2" sx={{ m: 0.5 }}>
              {t(`frontend.word.buddy`)}
            </Typography>
            <Box sx={{ flexGrow: 1, textAlign: "center" }}>
              <picture>
                <source
                  srcSet={`${import.meta.env.VITE_CDN_URL}/buddy/${
                    characterData.buddy.id
                  }.webp`}
                  type="image/webp"
                />
                <img
                  src={`${import.meta.env.VITE_CDN_URL}/buddy/${
                    characterData.buddy.id
                  }.png`}
                  alt={characterData.buddy.id}
                  style={{
                    width: 50,
                    height: 50,
                    border: "1px solid lightgray",
                    borderRadius: "5px",
                    pointerEvents: "none",
                  }}
                />
              </picture>
              <Typography variant="subtitle2" component="h2">
                {t(characterData.buddy.id)}
              </Typography>
            </Box>
          </Box>
        ) : null}

        <Box
          sx={{
            ...FlexCenter,
            m: 2,
          }}
        >
          {bookName !== "N/A" ? (
            <>
              <Box>
                <img
                  src={`${import.meta.env.VITE_CDN_URL}/icon/book.png`}
                  alt={"book"}
                  style={{
                    width: 40,
                    height: 40,
                    pointerEvents: "none",
                  }}
                />
                <img
                  src={`${
                    import.meta.env.VITE_CDN_URL
                  }/icon/grasta${currentGrastaStep}.png`}
                  alt={"book"}
                  style={{
                    width: 40,
                    height: 40,
                    pointerEvents: "none",
                  }}
                />
              </Box>
              <Typography variant="subtitle1" component="h2" sx={{ ml: 1 }}>
                {bookName}
              </Typography>
            </>
          ) : null}
        </Box>
        <Box sx={{ mt: 1, display: "flex", flexDirection: "column" }}>
          {characterData.dungeons.length > 0 && (
            <Typography
              variant="subtitle2"
              component="h2"
              sx={{ textAlign: "center", fontWeight: "bold" }}
            >
              {t(`frontend.filter.bookdrop`)}
              {characterData.style === AECharacterStyles.four ? " (NS)" : ""}
            </Typography>
          )}
          {characterData.dungeons.map((dun) => (
            <Box
              key={dun.id}
              sx={{
                display: "flex",
                textAlign: "center",
                alignItems: "center",
                m: 0.5,
              }}
            >
              <Alert
                severity={dun.id.startsWith("dungeon0") ? "success" : "warning"}
                sx={{ flexGrow: 1, textAlign: "center", mr: 1, ml: 1 }}
              >
                {t(dun.id)}
              </Alert>
              {dun.links.altemaURL !== null ? (
                <>
                  <Link
                    aria-label="altema"
                    href={dun.links.altemaURL}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Avatar
                      src={`${import.meta.env.VITE_CDN_URL}/icon/altema.jpg`}
                      sx={{ width: 30, height: 30, mr: 1 }}
                    />
                  </Link>
                  <Link
                    aria-label="wiki"
                    href={dun.links.aewikiURL}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Avatar
                      src={`${import.meta.env.VITE_CDN_URL}/icon/wiki.jpg`}
                      sx={{ width: 30, height: 30 }}
                    />
                  </Link>
                </>
              ) : null}
            </Box>
          ))}
        </Box>
      </Box>
    </Modal>
  );
};

export default CharacterModal;
