import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'
import { cleanNumArr } from '../util/arrayUtil';

interface CheckState {
    inven: Array<number>;
    manifest: Array<number>;
    grasta: Array<number>;
    buddy: Array<number>;
    addInven: (id: number) => void;
    removeInven: (id: number) => void;
    addManifest: (code: number) => void;
    removeManifest: (id: number) => void;
    addGrasta: (code: number) => void;
    removeGrasta: (id: number) => void;
}

const useCheckStore = create(
    persist<CheckState>(
        (set, get) => ({
            inven: [],
            manifest: [],
            grasta: [],
            buddy: [],
            addInven: (id) => set((state) => ({
                ...state,
                inven: cleanNumArr([...state.inven, id])
            })),
            removeInven: (id) => set((state) => ({
                ...state,
                inven: cleanNumArr(state.inven.filter((i) => i !== id))
            })),
            addManifest: (code) => set((state) => ({
                ...state,
                manifest: cleanNumArr([...state.manifest.filter((m) => m % 10000 !== code % 10000), code])
            })),
            removeManifest: (id) => set((state) => ({
                ...state,
                manifest: cleanNumArr(state.manifest.filter((m) => m % 10000 !== id))
            })),
            addGrasta: (code) => set((state) => ({
                ...state,
                grasta: cleanNumArr([...state.grasta.filter((m) => m % 10000 !== code % 10000), code])
            })),
            removeGrasta: (id) => set((state) => ({
                ...state,
                grasta: cleanNumArr(state.grasta.filter((m) => m % 10000 !== id))
            })),
        }),
        {
            name: "AE_CHECK",
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export default useCheckStore;