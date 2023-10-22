import React from 'react'
import html2canvas from 'html2canvas';
import DownloadIcon from '@mui/icons-material/Download';
import useTheme from '@mui/material/styles/useTheme';
import useModalStore from '../../store/useModalStore';
import Fab from '@mui/material/Fab';

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

    const theme = useTheme()
    const { setModal, hideModal } = useModalStore()

    const handleSaveClick = async () => {
        const element = document.getElementById(tag)
        if (!element) return;
        setModal("LOADING")
        try {
            await html2canvas(element, {
                allowTaint: true,
                useCORS: true,
                windowWidth: Math.max(element.clientWidth, 700),
                backgroundColor: theme.palette.background.paper,
                ignoreElements: (element) => element.id === "downloader",
            }).then((canvas) => {
                const dataUrl = canvas.toDataURL("image/jpeg")
                const link = document.createElement('a');
                link.download = `${Date.now().toString()}.jpg`;
                link.href = dataUrl;
                link.click();
            })
        } finally {
            hideModal()
        }
    }

    return (
        <Fab
            aria-label="Download Button"
            id="downloader"
            color='secondary'
            onClick={handleSaveClick}
            size='small'
            sx={{ m: 1, mr: 2, ml: 2, minWidth: 40 }}
        >
            <DownloadIcon />
        </Fab>
    )
}

export default Downloader

