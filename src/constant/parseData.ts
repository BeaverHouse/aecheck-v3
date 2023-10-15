import charjson from "../data/character.json";
import kojson from "../i18n/ko.json";
import budjson from "../data/buddy.json";

export const characters = (charjson as Array<CharacterInfo>)
    .sort((a, b) => a.code - b.code);

const tags = Object.keys(kojson)
export const personalities = tags.filter((t) => t.startsWith("personality."))

export const dungeons = tags.filter((t) => t.startsWith("drop.dungeon") && !t.endsWith("000"))
    .sort((a, b) => parseInt(a.replace("drop.dungeon", "")) - parseInt(b.replace("drop.dungeon", "")))

export const buddyCharacterIds = budjson.map((b) => b.link).flat()