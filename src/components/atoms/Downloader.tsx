import React from "react";
import html2canvas from "html2canvas";
import DownloadIcon from "@mui/icons-material/Download";
import useTheme from "@mui/material/styles/useTheme";
import useModalStore from "../../store/useModalStore";
import Fab from "@mui/material/Fab";
import saveAs from "file-saver";
import { isIOS } from "react-device-detect";

interface DownloaderProps {
  tag: string;
}

/**
 * Downloader
 *
 * 특정 태그가 달린 div 영역을 이미지로 다운로드할 수 있게 합니다.
 * 일부 기기에서 동작하지 않을 수도 있습니다.
 *
 * @param tag
 */
const Downloader: React.FC<DownloaderProps> = ({ tag }) => {
  const theme = useTheme();
  const { setModal, hideModal } = useModalStore();

  const handleSaveClick = async () => {
    const element = document.getElementById(tag);
    if (!element) return;
    setModal("LOADING");
    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        allowTaint: true,
        useCORS: true,
        windowWidth: Math.max(element.clientWidth, 700),
        backgroundColor: theme.palette.background.paper,
        ignoreElements: (element) => element.id === "downloader",
      });
      canvas.toBlob((blob) => {
        if (!blob) {
          return window.alert("!!!");
        }
        saveAs(blob, `${Date.now().toString()}${isIOS ? "" : ".jpg"}`);
      });
    } finally {
      hideModal();
    }
  };

  return (
    <Fab
      aria-label="Download Button"
      id="downloader"
      color="secondary"
      onClick={handleSaveClick}
      size="small"
      sx={{ m: 0.5, mr: 1, ml: 2, minWidth: 40, minHeight: 40 }}
    >
      <DownloadIcon />
    </Fab>
  );
};

export default Downloader;
