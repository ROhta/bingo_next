import type { FC } from "react"
import OperationButtons from "../molecules/OperationButtons"
import BingoNumber from "../atoms/BingoNumber"

const Operations: FC = () => {
    return (
        <section className={`text-center flex-auto`}>
            <BingoNumber />
            <OperationButtons />
        </section>
    )
}

export default Operations