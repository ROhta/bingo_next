import type { FC } from "react"
import Operations from "../organisms/Operations"
import Histories from "../organisms/Histories"
import Audios from "../molecules/Audios"

const IndexPage: FC = () => {
    return (
        <>
            <div className={`flex`}>
                <Operations />
                <Histories />
            </div>
            <Audios />
        </>
    )
}

export default IndexPage

if (this.#numbers.remainList.length === 0 && this.#numbers.historyList.length === 0) {
    this.#numbers.resetLists()
} else {
    this.#numbers.historyList.forEach((n: number) => this.#addHistory(n))
}

for (let i = this.#minBingoNumber; i <= this.#maxBingoNumber; i++) this.#allNumberList.push(i)

get remainList(): number[] {
    return this.#getListFromLocalStorage(this.#remainListKey)
}

set remainList(remainsList: number[]) {
    this.#setListOnLocalStorage(this.#remainListKey, remainsList)
}

get historyList(): number[] {
    return this.#getListFromLocalStorage(this.#historyListKey)
}

set historyList(historiesList: number[]) {
    this.#setListOnLocalStorage(this.#historyListKey, historiesList)
}

#getListFromLocalStorage(key: string): number[] {
    let ret: number[] = []
    try {
        ret = JSON.parse(localStorage.getItem(key) || "")
        if (!Array.isArray(ret)) throw new Error("There is no Array in the localStorage!")
        for (const i of ret) if (typeof i !== "number") throw new Error("The array contains non-digit character in the localStorage!")
    } catch (e: unknown) {
        if (e instanceof Error) console.error(e.name, e.message, e.stack)
    }
    return ret
}

#setListOnLocalStorage = (key: string, list: number[]): void => localStorage.setItem(key, JSON.stringify(list))