import {selector} from "recoil";

const historySelector = selector({
    key: "remainList",
    get: ({get}) => get(historyAtom),
    set: ({set}, newValue) => set(historyAtom, newValue)
})