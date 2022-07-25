import type { FC, RefObject } from "react"

type Props = {
    onClick: () => void,
    id: string,
    word: string,
    additionalClass?: string,
    ref?: RefObject<HTMLButtonElement>,
}

export const OperationButton: FC<Props> = (props) => {
    return <button type={`button`} ref={props.ref} onClick={props.onClick} id={props.id} className={`bg-slate-100/50 ${props.additionalClass} py-6 rounded text-3xl`}>{props.word}</button>
}
