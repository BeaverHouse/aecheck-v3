import { characters } from "../constant/parseData";
import { arrAllIncludes, arrOverlap } from "./arrayUtil";

export const getShortName = (name: string, lang: string) => {
  const arr = name.split(" ");
  switch (lang) {
    case "jp":
      return arr[0];
    case "ko":
      return name.includes("(") ? arr[0] : arr[arr.length - 1];
    case "en":
      return name.includes("(") ? arr[0] : name;
    default:
      return name;
  }
};

export const getCharacterStatus = (
  info: CharacterInfo,
  inven: Array<number>
) => {
  // 1. 목록에 있으면 보유중
  if (inven.includes(info.id)) return "inven.have";

  // 2. 클체 목록 중에 있는지에 따라 분기처리
  const ccList = characters
    .filter((c) => inven.includes(c.id))
    .map((c) => c.change)
    .flat();

  if (ccList.includes(info.id)) return "inven.classchange";
  else return "inven.nothave";
};

export const getManifestStatus = (
  info: CharacterInfo,
  inven: Array<number>
) => {
  // 1. 목록에 있으면 현현 가능
  if (inven.includes(info.id)) return "manifest.available";

  // 2. AS/ES면 클체가능 여부에 따라 판정
  const styleTags = ["style.another", "style.extra"];
  if (arrOverlap(info.tags, styleTags))
    return getCharacterStatus(info, inven) === "inven.classchange"
      ? "manifest.classchange"
      : "manifest.unavailable";
  else {
    // 3. NS면 스타일을 다 봐야 함
    const currentStyles = characters
      .filter((c) => c.code === info.code && inven.includes(c.id))
      .map((c) => c.tags)
      .flat()
      .filter((tag) => tag.startsWith("style."));
    if (currentStyles.includes("style.four"))
      // 4.5가 있으면 추가로 스타일이 있으면 가능, 아니면 클체
      return currentStyles.length > 1
        ? "manifest.available"
        : "manifest.classchange";
    // 4.5가 없으면 추가로 스타일이 있으면 클체, 아니면 불가
    else
      return currentStyles.length > 0
        ? "manifest.classchange"
        : "manifest.unavailable";
  }
};

export const getManifestStep = (
  info: CharacterInfo,
  manifest: Array<number>
) => {
  const stepArr = manifest.filter((m) => m % 10000 === info.id);
  if (stepArr.length > 0) return Math.floor(stepArr[0] / 10000);
  else return 0;
};
export const getGrastaStep = (info: CharacterInfo, grasta: Array<number>) => {
  const stepArr = grasta.filter((g) => g % 10000 === info.id);
  if (stepArr.length > 0) return Math.floor(stepArr[0] / 10000);
  else return 0;
};
export const getAlignStep = (info: CharacterInfo, staralign: Array<number>) => {
  const stepArr = staralign.filter((g) => g % 10000 === info.id);
  if (stepArr.length > 0) return Math.floor(stepArr[0] / 10000);
  else return 0;
};

export const getStep = (info: CharacterInfo, arr: Array<number>) => {
  const stepList = arr.filter((x) => x % 10000 === info.id);
  return stepList.length > 0 ? Math.floor(stepList[0] / 10000) : 0;
};

export const getPaddedNumber = (num: number, padLength: number) => {
  return String(num).padStart(padLength, "0");
};

export const commonFiltered = (
  info: CharacterInfo,
  styleTags: Array<string>,
  alterTags: Array<string>,
  manifestTags: Array<string>,
  typeTags: Array<string>,
  getTags: Array<string>,
  choosePersonalityTags: Array<string>,
  essenTialPersonalityTags: Array<string>,
  staralignTags: Array<string>
) => {
  for (const tags of [
    styleTags,
    alterTags,
    manifestTags,
    typeTags,
    getTags,
    staralignTags,
  ]) {
    if (!arrOverlap(info.tags, tags)) return false;
  }
  if (!arrAllIncludes(info.tags, essenTialPersonalityTags)) return false;
  return (
    choosePersonalityTags.length <= 0 ||
    arrOverlap(info.tags, choosePersonalityTags)
  );
};
