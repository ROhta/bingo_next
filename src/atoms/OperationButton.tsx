import type { FC } from "react"

type Props = {
    id: string,
    word: string,
    additionalClass?: string,
}

export const OperationButton: FC<Props> = (props) => {
    return <button type={`button`} id={props.id} className={`bg-slate-100/50 ${props.additionalClass} py-6 rounded text-3xl`}>{props.word}</button>
}
