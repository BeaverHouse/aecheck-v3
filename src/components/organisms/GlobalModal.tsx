import React from "react";
import FilterModal from "../molecules/FilterModal";
import CharacterModal from "../atoms/CharacterModal";
import { isCharacterInfo } from "../../util/typecheck";
import DataLoaderModal from "../atoms/DataLoaderModal";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import useModalStore from "../../store/useModalStore";

interface GlobalModalState {
  modalInfo: string | CharacterInfo | null;
}

const GlobalModal: React.FC<GlobalModalState> = ({ modalInfo }) => {
  const { hideModal } = useModalStore();

  const popModal = (e: PopStateEvent) => {
    e.preventDefault();
    if (modalInfo !== null) {
      hideModal();
      window.history.go(1);
    }
  };

  React.useEffect(() => {
    window.addEventListener("popstate", popModal);
    return () => window.removeEventListener("popstate", popModal);
  });

  if (typeof modalInfo === "string") {
    if (modalInfo === "DATALOADER") return <DataLoaderModal />;
    else if (modalInfo === "LOADING") {
      return (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      );
    }
    return <FilterModal modalType={modalInfo} />;
  } else if (isCharacterInfo(modalInfo)) {
    return <CharacterModal {...modalInfo} />;
  } else {
    return null;
  }
};

export default GlobalModal;
