import React from "react";
import useCheckStore from "../../../store/useCheckStore";
import { useTranslation } from "react-i18next";
import { getNumber, getShortName, getStep, isUpdatedInWeeks } from "../../../util/func";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { AECharacterStyles } from "../../../constants/enum";
import { FlexCenter } from "../../../constants/style";

interface CharacterCheckProps {
  info: CharacterSummary;
  disableShadow: boolean;
  disableGray?: boolean;
  onClick: () => void;
}

// 캐릭터 체크 UI
const CharacterAvatar: React.FC<CharacterCheckProps> = ({
  info,
  disableShadow,
  disableGray = false,
  onClick,
}) => {
  const { inven, grasta, manifest, staralign } = useCheckStore();
  const { t, i18n } = useTranslation();

  const id = getNumber(info);
  const checked = inven.includes(id);
  const isRecent = isUpdatedInWeeks(info.updateDate);

  const currentGrastaStep = getStep(id, grasta);
  const currentManifestStep = getStep(id, manifest);
  const currentAlignStep = getStep(id, staralign);

  const manifestIcon = () => {
    const manifestCompleted =
      currentManifestStep >= info.maxManifest && info.maxManifest > 0;
    if (manifestCompleted) {
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
          src={`${import.meta.env.VITE_CDN_URL}/icon/crown.png`}
          alt="complete"
          style={style}
        />
      );
    }
  };

  const styleIcon = () => {
    if (info.style === AECharacterStyles.four) return null;
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
        src={`${
          import.meta.env.VITE_CDN_URL
        }/icon/${info.style.toLowerCase()}.png`}
        alt={info.style}
        style={style}
      />
    );
  };

  const grastaIcon = () => {
    if (currentGrastaStep === 0) return null;
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
        src={`${
          import.meta.env.VITE_CDN_URL
        }/icon/grasta${currentGrastaStep}.png`}
        alt={`grasta${currentGrastaStep}`}
        style={style}
      />
    );
  };

  return (
    <ImageListItem
      component={"div"}
      onClick={onClick}
      sx={{
        minHeight: 75,
        maxHeight: 75,
        minWidth: 75,
        maxWidth: 75,
        cursor: "pointer",
        position: "relative",
      }}
    >
      {styleIcon()}
      {grastaIcon()}
      {manifestIcon()}
      <picture
        className={isRecent && !disableShadow ? "shadow" : ""}
        style={{
          ...FlexCenter,
          maxHeight: 75,
        }}
      >
        {currentAlignStep === 3 && inven.includes(id) ? (
          <>
            <source
              srcSet={`${import.meta.env.VITE_CDN_URL}/staralign/${
                info.id
              }.webp`}
              type="image/webp"
            />
            <img
              src={`${import.meta.env.VITE_CDN_URL}/staralign/${info.id}.png`}
              alt={info.id}
              className={checked || disableGray ? "" : "gray"}
              style={{
                width: 105,
                height: 105,
                borderRadius: "3px",
                pointerEvents: "none",
              }}
            />
          </>
        ) : (
          <>
            <source
              srcSet={`${import.meta.env.VITE_CDN_URL}/character/${
                info.id
              }.webp`}
              type="image/webp"
            />
            <img
              src={`${import.meta.env.VITE_CDN_URL}/character/${info.id}.png`}
              alt={info.id}
              className={checked || disableGray ? "" : "gray"}
              style={{
                width: 75,
                height: 75,
                borderRadius: "3px",
                pointerEvents: "none",
              }}
            />
          </>
        )}
      </picture>
      <ImageListItemBar
        subtitle={getShortName(t(info.code), i18n.language)}
        sx={{
          "& .MuiImageListItemBar-title": {
            display: "none",
          },
          "& .MuiImageListItemBar-subtitle": {
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

export default CharacterAvatar;
