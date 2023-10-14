import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'

interface ConfigState {
    theme: string;
    lang: string;
    checkPath: string;
    toggleTheme: (theme: string) => void;
    changeLang: (lang: string) => void;
    changeCheckPath: (path: string) => void;
}

const useConfigStore = create(
    persist<ConfigState>(
        (set, get) => ({
            theme: "dark",
            lang: "ko",
            checkPath: "/check/character",
            toggleTheme: (theme) => set((state) => ({
                ...state,
                theme: theme
            })),
            changeLang: (lang) => set((state) => ({
                ...state,
                lang: lang
            })),
            changeCheckPath: (path) => set((state) => ({
                ...state,
                checkPath: path
            })),
        }),
        {
            name: "AE_CONFIG",
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export default useConfigStore;