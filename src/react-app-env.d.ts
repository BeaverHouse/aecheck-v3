/// <reference types="react-scripts" />

// character.json을 파싱할 때 사용하는 interface
interface CharacterInfo {
  id: number;
  code: number;
  tags: Array<string>;
  from?: Array<number>;
  change?: Array<number>;
  dungeon_drop?: Array<number>;
  year?: string;
  seesaa?: string;
  aewiki?: string;
}

// buddy.json을 파싱할 때 사용하는 interface
interface BuddyInfo {
  id: number;
  code: number | string;
  link: Array<number>;
  get: string;
  seesaa?: string | null;
  aewiki?: string | null;
}

// fixedData.ts의 탭 정보 파싱할 때 사용하는 interface
interface TabInfo {
  subpath: string;
  labelTag: string;
}

interface CheckValueState {
  inven: Array<number>;
  manifest: Array<number>;
  grasta: Array<number>;
  staralign: Array<number>;
}
