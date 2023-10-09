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
}

interface TabInfo {
    subpath: string;
    labelTag: string;
}