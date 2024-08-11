import React from "react";
import useCheckStore from "../../store/useCheckStore";
import { useTranslation } from "react-i18next";
import { getShortName, getStep } from "../../util/func";
import { pickups } from "../../constant/updates";
import useTheme from "@mui/material/styles/useTheme";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import useModalStore from "../../store/useModalStore";

interface CharacterCheckProps {
  info: CharacterInfo;
  isCheck?: boolean;
  disableBorder?: boolean;
  makeNotOwnedGray?: boolean;
}

// 캐릭터 체크 UI
const CharacterCheck: React.FC<CharacterCheckProps> = ({
  info,
  isCheck = true,
  disableBorder = false,
  makeNotOwnedGray = false,
}) => {
  const { addInven, removeInven, inven, grasta, manifest, staralign } =
    useCheckStore();
  const { setModal } = useModalStore();
  const { t, i18n } = useTranslation();
  const theme = useTheme();

  const name = t(`c${info.code}`);
  const checked = inven.includes(info.id);

  const manifestTag =
    info.id < 1000
      ? info.tags.find((t) => t.startsWith("manifest."))
      : "manifest.step0";
  const currentGrastaStep = getStep(info, grasta);
  const currentManifestStep = getStep(info, manifest);
  const currentAlignStep = getStep(info, staralign);

  const manifestIcon = () => {
    const manifestConpleted =
      currentManifestStep >=
        parseInt(manifestTag!.replace("manifest.step", "")) &&
      currentManifestStep > 0;
    if (manifestConpleted) {
      const style: React.CSSProperties = {
        position: "absolute",
        bottom: -8,
        left: -8,
        zIndex: 10,
        width: 23,
        height: 23,
      };
      return (
        <img
          src={`/image/icon/crown.png`}
          width={25}
          height={25}
          alt="complete"
          style={style}
        />
      );
    }
  };

  const statusIcon = () => {
    if (!checked) return null;
    else if (currentGrastaStep > 0) {
      return grastaIcon(currentGrastaStep);
    } else {
      return (
        <img
          src={`/image/icon/check.png`}
          width={30}
          height={30}
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

  const styleIcon = (info: CharacterInfo) => {
    const styleTag = info.tags.find((t) => t.startsWith("style."));
    if (styleTag === undefined || styleTag === "style.four") return null;
    const style: React.CSSProperties = {
      position: "absolute",
      top: -7,
      left: -7,
      zIndex: 10,
      width: 27,
      height: 27,
    };
    return (
      <img
        src={`/image/icon/${styleTag}.png`}
        width={30}
        height={30}
        alt={styleTag}
        style={style}
      />
    );
  };

  const grastaIcon = (step: number) => {
    const style: React.CSSProperties = {
      position: "absolute",
      top: -11,
      right: -11,
      zIndex: 10,
      width: 33,
      height: 33,
    };
    return (
      <img
        src={`/image/icon/grasta${step}.png`}
        width={37}
        height={37}
        alt={`step${step}`}
        style={style}
      />
    );
  };

  const toggleInven = () => {
    const id = info.id;
    const from = info.from!; // 체크하는 캐릭터는 반드시 존재
    if (checked) removeInven(id);
    else {
      addInven(id);
      for (const i of from) {
        addInven(i);
      }
    }
  };
  return (
    <ImageListItem
      component={"div"}
      onClick={isCheck ? toggleInven : () => setModal(info)}
      sx={{
        minHeight: 75,
        maxHeight: 75,
        minWidth: 75,
        maxWidth: 75,
        cursor: "pointer",
        position: "relative",
      }}
    >
      {styleIcon(info)}
      {statusIcon()}
      {manifestIcon()}
      <picture
        style={{
          maxHeight: 75,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {currentAlignStep === 3 && inven.includes(info.id) ? (
          <>
            <source
              srcSet={`/image/data/${info.id}_awaken.webp`}
              type="image/webp"
            />
            <img
              src={`/image/data/${info.id}_awaken.png`}
              alt={`${name}_${info.id}`}
              width={120}
              height={120}
              className={checked ? "base" : "base gray"}
              style={{
                width: 105,
                height: 105,
                boxSizing: "border-box",
                borderRadius: "3px",
                pointerEvents: "none",
              }}
            />
          </>
        ) : (
          <>
            <source srcSet={`/image/data/${info.id}.webp`} type="image/webp" />
            <img
              src={`/image/data/${info.id}.png`}
              alt={`${name}_${info.id}`}
              width={80}
              height={80}
              className={checked || !makeNotOwnedGray ? "" : "gray"}
              style={{
                border:
                  pickups.includes(info.id) && !disableBorder
                    ? `3px solid ${theme.palette.secondary.main}`
                    : "",
                width: 75,
                height: 75,
                boxSizing: "border-box",
                borderRadius: "3px",
                pointerEvents: "none",
              }}
            />
          </>
        )}
      </picture>
      <ImageListItemBar
        subtitle={getShortName(name, i18n.language)}
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
  );
};

export default CharacterCheck;
