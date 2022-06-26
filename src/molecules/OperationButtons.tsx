import { FC } from "react"
import StartButton from "../atoms/StartButton"
import ResetButton from "../atoms/ResetButton"

const OperationButtons: FC = () => {
    return (
        <>
            <StartButton />
            <ResetButton />
        </>
    )
}

export default OperationButtons