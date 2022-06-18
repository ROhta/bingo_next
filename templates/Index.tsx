import type { FC } from "react"
import Operations from "../organisms/Operations"
import Histories from "../organisms/Histories"
import Audios from "../molecules/Audios"

const IndexPage: FC = () => {
    return (
        <>
            <div className="row">
                <Operations />
                <Histories />
            </div>
            <Audios />
        </>
    )
}

export default IndexPage