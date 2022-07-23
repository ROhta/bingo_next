import {atom} from "recoil";

export const isStartedAtom = atom({
    key: "isStarted",
    default: false
}

const minBingoNumber = 1
const maxBingoNumber = 75

const allNumberList: number[] = []
for (let i = minBingoNumber; i <= maxBingoNumber; i++) allNumberList.push(i)

const historiesList = atom({
    key: 'historiesList',
    default: allNumberList,
})


const remainNumberList: number[] = []
const remainsList = atom({
    key: 'remainsList',
    default: remainNumberList,
})