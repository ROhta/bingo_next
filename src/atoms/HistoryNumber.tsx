import type { FC } from "react"

type Props = {
    key: number
}

export const HistoryNumber: FC<Props> = (props) => {
    return <p className={`text-5xl`}>{props.key}</p>
}
