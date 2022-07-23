import type { FC } from "react"
import {RecoilRoot, atom, selector, useRecoilState, useRecoilValue} from 'recoil';
import Operations from "../organisms/Operations"
import Histories from "../organisms/Histories"
import Audios from "../molecules/Audios"

const IndexPage: FC = () => {
    return (
        <RecoilRoot>
            <div className={`flex`}>
                <Operations />
                <Histories />
            </div>
            <Audios />
        </RecoilRoot>
    )
}

export default IndexPage

if (this.#numbers.remainList.length === 0 && this.#numbers.historyList.length === 0) {
    this.#numbers.resetLists()
} else {
    this.#numbers.historyList.forEach((n: number) => this.#addHistory(n))
}
