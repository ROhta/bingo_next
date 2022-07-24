import type { RefObject } from "react";
import { atom } from "recoil"

export const rouletteInterval = 150

export const minBingoNumber = 1
export const maxBingoNumber = 75
const allNumberList: number[] = []
for (let i = minBingoNumber; i <= maxBingoNumber; i++) allNumberList.push(i)

export const historiesListAtom = atom<typeof allNumberList>({
    key: "historiesListAtom",
    default: [],
})

export const remainsListAtom = atom<typeof allNumberList>({
    key: "remainsListAtom",
    default: allNumberList,
})

export const isStartedAtom = atom<boolean>({
    key: "isStartedAtom",
    default: false
})

export const startBtnAtom = atom<RefObject<HTMLButtonElement>>({
    key: "startBtnAtom",
    default: undefined
})

export const drumAtom = atom<RefObject<HTMLAudioElement>>({
    key: "drumAtom",
    default: undefined
})

export const cymbalsAtom = atom<RefObject<HTMLAudioElement>>({
    key: "cymbalsAtom",
    default: undefined
})
