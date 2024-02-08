import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface ConfigState {
  theme: string;
  lang: string;
  checkPath: string;
  analyzePath: string;
  toggleTheme: (theme: string) => void;
  changeLang: (lang: string) => void;
  changeCheckPath: (path: string) => void;
  changeAnalyzePath: (path: string) => void;
}

const useConfigStore = create(
  persist<ConfigState>(
    (set) => ({
      theme: "dark",
      lang: "ko",
      checkPath: "/check/character",
      analyzePath: "/analyze/stardream",
      toggleTheme: (theme) =>
        set((state) => ({
          ...state,
          theme: theme,
        })),
      changeLang: (lang) =>
        set((state) => ({
          ...state,
          lang: lang,
        })),
      changeCheckPath: (path) =>
        set((state) => ({
          ...state,
          checkPath: path,
        })),
      changeAnalyzePath: (path) =>
        set((state) => ({
          ...state,
          analyzePath: path,
        })),
    }),
    {
      name: "AE_CONFIG",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useConfigStore;
