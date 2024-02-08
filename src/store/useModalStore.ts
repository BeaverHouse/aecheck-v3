import { create } from "zustand";

interface ModalState {
  modalInfo: string | CharacterInfo | null;
  setModal: (modalInfo: string | CharacterInfo) => void;
  hideModal: () => void;
}

const useModalStore = create<ModalState>((set) => ({
  modalInfo: null,
  setModal: (modalInfo) =>
    set({
      modalInfo: modalInfo,
    }),
  hideModal: () =>
    set({
      modalInfo: null,
    }),
}));

export default useModalStore;
