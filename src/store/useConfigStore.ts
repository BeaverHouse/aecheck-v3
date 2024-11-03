import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  AnalysisMenuOptions,
  CheckMenuOptions,
  CheckTabOptions,
  PopupOnCheckOptions,
  ThemeOptions,
} from "../constants/enum";

interface ConfigState {
  popupOnCheck: PopupOnCheckOptions;
  theme: ThemeOptions;
  lastCheckMenu: CheckMenuOptions;
  lastCheckTab: CheckTabOptions;
  lastSearchMenu: CheckMenuOptions;
  lastAnalysisMenu: AnalysisMenuOptions;
  setPopupOnCheck: (popup: PopupOnCheckOptions) => void;
  toggleTheme: (theme: ThemeOptions) => void;
  updateLastCheckMenu: (option: CheckMenuOptions) => void;
  updateLastCheckTab: (option: CheckTabOptions) => void;
  updateLastSearchMenu: (option: CheckMenuOptions) => void;
  updateLastAnalysisMenu: (option: AnalysisMenuOptions) => void;
}

const useConfigStore = create(
  persist<ConfigState>(
    (set) => ({
      popupOnCheck: PopupOnCheckOptions.fourOnly,
      theme: ThemeOptions.light,
      lastCheckMenu: CheckMenuOptions.characters,
      lastCheckTab: CheckTabOptions.inven,
      lastSearchMenu: CheckMenuOptions.characters,
      lastAnalysisMenu: AnalysisMenuOptions.stardream,
      setPopupOnCheck: (popup) =>  set((state) => ({
        ...state,
        popupOnCheck: popup,
      })),
      toggleTheme: (theme) =>
        set((state) => ({
          ...state,
          theme: theme,
        })),
      updateLastCheckMenu: (option) =>
        set((state) => ({
          ...state,
          lastCheckMenu: option,
        })),
      updateLastCheckTab: (option) =>
        set((state) => ({
          ...state,
          lastCheckTab: option,
        })),
      updateLastSearchMenu: (option) =>
        set((state) => ({
          ...state,
          lastSearchMenu: option,
        })),
      updateLastAnalysisMenu: (option) =>
        set((state) => ({
          ...state,
          lastAnalysisMenu: option,
        })),
    }),
    {
      name: "AE_CONFIG_V3_1",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useConfigStore;
