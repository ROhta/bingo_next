import type { FC } from "react"
import {atom, selector} from "recoil"
import { HistoryNumbers } from "../molecules/HistoryNumbers"
import { HistoryTitle } from "../atoms/HistoryTitle"

const ManualOperation: FC = () => {


    return (
        <section className={`flex-auto`}>
            <HistoryTitle />
            <HistoryNumbers  />
        </section>
    )
}

export default ManualOperation