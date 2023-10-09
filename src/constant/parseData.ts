import charjson from "../data/character.json";
import kojson from "../i18n/ko.json";

export const characters = (charjson as Array<CharacterInfo>)
    .sort((a, b) => a.code - b.code);

const tags = Object.keys(kojson)
export const personalities = tags.filter((t) => t.startsWith("personality."))