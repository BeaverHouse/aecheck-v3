import charjson from "../data/character.json";
import kojson from "../i18n/ko.json";
import budjson from "../data/buddy.json";

export const characters = charjson as Array<CharacterInfo>;

const tags = Object.keys(kojson);
export const personalities = tags.filter((t) => t.startsWith("personality."));

export const dungeons = tags
  .filter((t) => t.startsWith("drop.dungeon"))
  .sort(
    (a, b) =>
      parseInt(a.replace("drop.dungeon", "")) -
      parseInt(b.replace("drop.dungeon", ""))
  );

export const buddyCharacterIds = budjson.map((b) => b.link).flat();

export const totalCodes = Array.from(new Set(characters.map((c) => c.code)));
