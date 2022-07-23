import type { FC } from "react"

type Props = {
    id: string,
    src: string,
}

export const AudioElement: FC<Props> = (props) => {
    return <audio id={props.id} preload={`auto`} src={props.src}></audio>
}
