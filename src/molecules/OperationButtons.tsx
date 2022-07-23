import type { FC } from "react"
import { OperationButton } from "../atoms/OperationButton"

type props = {
    rouletteAction: () => void,
    resetAction: () => void,
}

export const OperationButtons: FC<props> = (props) => {
    return (
        <>
            <OperationButton onClick={props.rouletteAction} id={`start-button`} additionalClass={`px-16`} word={`START`}/>
            <OperationButton onClick={props.resetAction} id={`reset-button`} additionalClass={`px-8`} word={`RESET`}/>
        </>
    )
}
