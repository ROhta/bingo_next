import {DefaultValue, selector} from "recoil"
import { historiesListAtom, remainsListAtom, minBingoNumber, maxBingoNumber } from "./atoms"

export const chooseNumberSelector = selector<number>({
    key: "chooseNumberSelector",
    get: ({ get }) => {
        return Math.floor(Math.random() * get(remainsListAtom).length)
    },
    set: ({ set, get }, i) => {
        if (i instanceof DefaultValue || i < minBingoNumber || i > maxBingoNumber) i = 0

        const remains = get(remainsListAtom)
        remains.splice(i, 1)
        set(remainsListAtom, remains)

        const histories = get(historiesListAtom)
        histories.push(i)
        set(historiesListAtom, histories)
    }
})

export const resetSelector = selector({
    key: "resetSelector",
    get: () => "",
    set: ({ reset }) => {
        reset(historiesListAtom)
        reset(remainsListAtom)
    }
})