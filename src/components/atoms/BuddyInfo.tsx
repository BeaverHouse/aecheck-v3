import React from "react";
import { arrAllIncludes } from "../../util/arrayUtil";
import useCheckStore from "../../store/useCheckStore";
import { useTranslation } from "react-i18next";
import Card from "@mui/material/Card";
import { new_buddies } from "../../constant/updates";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import useTheme from "@mui/material/styles/useTheme";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import useModalStore from "../../store/useModalStore";
import { characters } from "../../constant/parseData";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

const BuddyInfo: React.FC<BuddyInfo> = (info) => {
  const { inven } = useCheckStore();
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const { setModal } = useModalStore();

  const name = t(`bud${info.code}`);
  const checked = info.link.length > 0 && arrAllIncludes(inven, info.link);

  const statusIcon = () => {
    if (info.link.length <= 0) {
      return (
        <Chip
          sx={{
            position: "absolute",
            right: -3,
            top: -6,
            zIndex: 10,
            fontWeight: "600",
            backgroundColor: theme.palette.grey[300],
          }}
          size="small"
          label="Free"
        />
      );
    } else if (!checked) return null;
    else {
      return (
        <img
          src={`/image/icon/check.png`}
          width={25}
          height={25}
          alt="check"
          style={{
            width: 25,
            height: 25,
            position: "absolute",
            right: -5,
            top: -5,
            zIndex: 10,
          }}
        />
      );
    }
  };

  return (
    <Card
      sx={{
        display: "flex",
        overflow: "unset",
        textAlign: "center",
        alignItems: "center",
        wordBreak: "keep-all",
        border: new_buddies.includes(info.id)
          ? `3px solid ${theme.palette.secondary.main}`
          : "3px solid transparent",
        boxSizing: "border-box",
      }}
    >
      <ImageListItem
        component={"div"}
        sx={{
          maxHeight: 75,
          minWidth: 75,
          maxWidth: 75,
          position: "relative",
        }}
      >
        {statusIcon()}
        <picture>
          <source srcSet={`/image/data/${info.id}.webp`} type="image/webp" />
          <img
            src={`/image/data/${info.id}.png`}
            alt={`${name}_${info.id}`}
            width={80}
            height={80}
            style={{
              width: 75,
              height: 75,
              boxSizing: "border-box",
              pointerEvents: "none",
            }}
          />
        </picture>
        <ImageListItemBar
          subtitle={name}
          sx={{
            "& .MuiImageListItemBar-title": {
              display: "none",
            },
            "& .MuiImageListItemBar-subtitle": {
              textAlign: "center",
              fontSize: "12px",
            },
            ".MuiImageListItemBar-titleWrap": {
              padding: 0.5,
            },
          }}
        />
      </ImageListItem>
      <Box
        sx={{
          ml: 1,
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {info.link.length > 0 ? (
          <>
            {info.link.map((id) => (
              <picture
                onClick={() =>
                  setModal(characters.find((cha) => cha.id === id)!)
                }
              >
                <source srcSet={`/image/data/${id}.webp`} type="image/webp" />
                <img
                  src={`/image/data/${id}.png`}
                  alt={`link_${id}`}
                  width={40}
                  height={40}
                  style={{
                    width: 40,
                    height: 40,
                    pointerEvents: "none",
                    border: `1px solid ${theme.palette.grey[400]}`,
                  }}
                />
              </picture>
            ))}
          </>
        ) : (
          <Typography variant="subtitle2" sx={{ m: 1 }}>
            {t(info.get)}
          </Typography>
        )}
      </Box>
      {info.seesaa ? (
        <IconButton
          aria-label="seesaa"
          href={i18n.language === "en" ? info.aewiki! : info.seesaa!}
          target="_blank"
          rel="noreferrer"
        >
          <OpenInNewIcon />
        </IconButton>
      ) : null}
    </Card>
  );
};

export default BuddyInfo;
