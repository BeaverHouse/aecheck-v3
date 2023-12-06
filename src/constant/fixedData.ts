export const checkMenuData: Array<TabInfo> = [
  {
    labelTag: "frontend.tab.character",
    subpath: "character",
  },
  {
    labelTag: "manifest.step1",
    subpath: "manifest",
  },
  {
    labelTag: "frontend.tab.grasta",
    subpath: "grasta",
  },
  {
    labelTag: "frontend.filter.staralign",
    subpath: "staralign",
  },
];

export const searchMenuData: Array<TabInfo> = [
  {
    labelTag: "frontend.tab.character",
    subpath: "character",
  },
  {
    labelTag: "frontend.tab.buddy",
    subpath: "buddy",
  },
];

export const analyzeMenuData: Array<TabInfo> = [
  {
    labelTag: "frontend.tab.stardream",
    subpath: "stardream",
  },
  {
    labelTag: "frontend.tab.whitekey",
    subpath: "whitekey",
  },
  {
    labelTag: "frontend.tab.legacy",
    subpath: "legacy",
  },
  {
    labelTag: "frontend.tab.table",
    subpath: "table",
  },
];

export const filterChipOptions = {
  style: ["style.four", "style.normal", "style.another", "style.extra"],
  alter: ["alter.false", "alter.true"],
  get: ["get.notfree", "get.free"],
  manifest: ["manifest.step2", "manifest.step1", "manifest.step0"],
  type: ["type.light", "type.shadow"],
  inven: ["inven.nothave", "inven.classchange", "inven.have"],
  staralign: ["staralign.false", "staralign.true"],
};

export const elements = [0, 1, 2, 3, 4, 5, 6, 7].map(
  (a) => `personality.p00${a}`
);
export const weapons = [0, 1, 2, 3, 4, 5, 6, 7].map(
  (a) => `personality.p01${a}`
);
