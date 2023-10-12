import { characters } from "../constant/parseData";
import { arrOverlap } from "./arrayUtil";
import React from 'react'

export const getShortName = (name: string, lang: string) => {
    const arr = name.split(" ")
    switch (lang) {
        case "jp":
            return arr[0];
        case "ko":
            return name.includes("(") ? arr[0] : arr[arr.length - 1]
        case "en":
            return name.includes("(") ? arr[0] : name
    }
}

export const getCharacterStatus = (info: CharacterInfo, inven: Array<number>) => {
    // 1. 목록에 있으면 보유중
    if (inven.includes(info.id)) return "inven.have";

    // 2. 클체 목록 중에 있는지에 따라 분기처리
    const ccList = characters.filter((c) => inven.includes(c.id))
        .map((c) => c.from).flat();

    if (ccList.includes(info.id)) return "inven.classchange"
    else return "inven.nothave"
}

export const getManifestStatus = (info: CharacterInfo, inven: Array<number>) => {
    // 1. 목록에 있으면 현현 가능
    if (inven.includes(info.id)) return "manifest.available";

    // 2. AS/ES면 클체가능 여부에 따라 판정
    const styleTags = ["style.another", "style.extra"]
    if (arrOverlap(styleTags, info.tags))
        return getCharacterStatus(info, inven) === "inven.classchange"
            ? "manifest.classchange"
            : "manifest.unavailable"
    else {
        // 3. NS면 스타일을 다 봐야 함
        const currentStyles = characters.filter((c) => c.code === info.code && inven.includes(c.id))
            .map((c) => c.tags).flat().filter((tag) => tag.startsWith("style."))
        if (currentStyles.includes("style.four"))
            // 4.5가 있으면 추가로 스타일이 있으면 가능, 아니면 클체
            return currentStyles.length > 1 ? "manifest.available" : "manifest.classchange"
        else
            // 4.5가 없으면 추가로 스타일이 있으면 클체, 아니면 불가
            return currentStyles.length > 0 ? "manifest.classchange" : "manifest.unavailable"
    }
}

export const styleIcon = (info: CharacterInfo) => {
    const tags = info.tags;
    const style: React.CSSProperties = {
        position: "absolute",
        top: -6,
        left: -6,
        zIndex: 10,
        width: 30,
        height: 30
    }
    if (tags.includes("style.normal"))
        return <img src='/image/icon/ns.png' width={30} height={30} alt={"ns"} style={style} />
    else if (tags.includes("style.another"))
        return <img src='/image/icon/as.png' width={30} height={30} alt={"as"} style={style} />
    else if (tags.includes("style.extra"))
        return <img src='/image/icon/es.png' width={30} height={30} alt={"es"} style={style} />
    return null
}

export const grastaIcon = (step: number) => {
    const style: React.CSSProperties = {
        position: "absolute",
        top: -9,
        right: -9,
        zIndex: 10,
        width: 37,
        height: 37
    }
    return <img src={`/image/icon/grasta${step}.png`} width={37} height={37} alt={`step${step}`} style={style} />
}

export const getManifestStep = (info: CharacterInfo, manifest: Array<number>) => {
    const stepArr = manifest.filter((m) => m % 10000 === info.id)
    if (stepArr.length > 0) return Math.floor(stepArr[0] / 10000)
    else return 0
}
export const getGrastaStep = (info: CharacterInfo, grasta: Array<number>) => {
    const stepArr = grasta.filter((g) => g % 10000 === info.id)
    if (stepArr.length > 0) return Math.floor(stepArr[0] / 10000)
    else return 0
}

export const getPaddedNumber = (num: number, padLength: number) => {
    return String(num).padStart(padLength, "0");
}