import type { FC } from "react"
import {OperationButton} from "../atoms/OperationButton"

const OperationButtons: FC = () => {
    return (
        <>
            <OperationButton id={`start-button`} additionalClass={`px-16`} word={`START`}/>
            <OperationButton id={`reset-button`} additionalClass={`px-8`} word={`RESET`}/>
        </>
    )
}

export default OperationButtons