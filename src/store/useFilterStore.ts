import { create } from "zustand";
import { addOrRemove } from "../util/arrayUtil";
import { persist, createJSONStorage } from "zustand/middleware";

interface FilterState {
  searchWord: string;
  styleTags: Array<string>;
  alterTags: Array<string>;
  getTags: Array<string>;
  manifestTags: Array<string>;
  typeTags: Array<string>;
  essenTialPersonalityTags: Array<string>;
  choosePersonalityTags: Array<string>;
  invenTags: Array<string>;
  staralignTags: Array<string>;
  dungeon: string | null;
  setSearch: (word: string) => void;
  toggleTag: (tag: string) => void;
  setPersonalities: (tags: Array<string>, essential: boolean) => void;
  removeFilter: () => void;
  setDungeon: (word: string | null) => void;
}

const initialState = {
  searchWord: "",
  styleTags: ["style.another", "style.extra", "style.four", "style.normal"],
  alterTags: ["alter.false", "alter.true"],
  getTags: ["get.free", "get.notfree"],
  manifestTags: ["manifest.step0", "manifest.step1", "manifest.step2"],
  typeTags: ["type.light", "type.shadow"],
  essenTialPersonalityTags: [],
  choosePersonalityTags: [],
  invenTags: ["inven.nothave", "inven.classchange", "inven.have"],
  staralignTags: ["staralign.false", "staralign.true"],
  dungeon: null,
};

const useFilterStore = create(
  persist<FilterState>(
    (set, get) => ({
      ...initialState,
      setSearch: (word) =>
        set((state) => ({
          ...state,
          searchWord: word,
        })),
      toggleTag: (tag) => {
        const category = tag.split(".")[0];
        let newState: FilterState | Partial<FilterState>;
        switch (category) {
          case "style":
            newState = { styleTags: addOrRemove(get().styleTags, tag) };
            break;
          case "alter":
            newState = { alterTags: addOrRemove(get().alterTags, tag) };
            break;
          case "get":
            newState = { getTags: addOrRemove(get().getTags, tag) };
            break;
          case "manifest":
            newState = { manifestTags: addOrRemove(get().manifestTags, tag) };
            break;
          case "type":
            newState = { typeTags: addOrRemove(get().typeTags, tag) };
            break;
          case "inven":
            newState = { invenTags: addOrRemove(get().invenTags, tag) };
            break;
          case "staralign":
            newState = { staralignTags: addOrRemove(get().staralignTags, tag) };
            break;
          default:
            return;
        }
        set((state) => ({
          ...state,
          ...newState,
        }));
      },
      setPersonalities: (tags, essential) => {
        if (essential)
          set((state) => ({
            ...state,
            essenTialPersonalityTags: tags,
          }));
        else
          set((state) => ({
            ...state,
            choosePersonalityTags: tags,
          }));
      },
      removeFilter: () => {
        set(
          (state) => ({
            ...state,
            ...initialState,
          }),
          true
        );
      },
      setDungeon: (word) =>
        set((state) => ({
          ...state,
          dungeon: word,
        })),
    }),
    {
      name: "AE_FILTER",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useFilterStore;
