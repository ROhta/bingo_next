import type { FC } from "react"
import { OperationButton } from "../atoms/OperationButton"

type props = {
    rouletteAction: () => void,
    btnText: string,
    resetAction: () => void,
}

export const OperationButtons: FC<props> = (props) => {
    return (
        <>
            <OperationButton onClick={props.rouletteAction} id={`start-button`} additionalClass={`px-16`} word={props.btnText}/>
            <OperationButton onClick={props.resetAction} id={`reset-button`} additionalClass={`px-8`} word={`RESET`}/>
        </>
    )
}
