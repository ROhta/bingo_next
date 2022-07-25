import type { FC } from "react"

type Props = {
    numStr: string,
}

export const BingoNumber: FC<Props> = (props) => {
    return <p id={`bingo-number`} style={{fontSize: "55vmin"}}>{props.numStr}</p>
}
