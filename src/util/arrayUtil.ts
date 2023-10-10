export const cleanNumArr = (arr: Array<number>) => Array.from(new Set(arr)).sort((a, b) => a - b);

export const arrOverlap = <T>(arr1: Array<T>, arr2: Array<T>): boolean => {
    if (arr1.length === 0 || arr2.length === 0) return true
    const combinedArr = Array.from(new Set([...arr1, ...arr2]))
    return arr1.length + arr2.length !== combinedArr.length
}

export const arrAllIncludes = <T>(bigArr: Array<T>, smallArr: Array<T>): boolean => {
    return smallArr.every((i) => bigArr.includes(i));
}

export const addOrRemove = <T>(arr: Array<T>, item: T): Array<T> => {
    const exists = arr.includes(item)

    if (exists) {
        return arr.filter((c) => { return c !== item })
    } else {
        return [...arr, item]
    }
}