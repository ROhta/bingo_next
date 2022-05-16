import { FC } from "react"
import HistoryNumbers from "../molecules/HistoryNumbers"
import HistoryTitle from "../atoms/HistoryTitle"

const ManualOperation: FC = () => {
    return (
        <section className="col-sm h1">
            <HistoryTitle />
            <HistoryNumbers />
        </section>
    )
}

export default ManualOperation