import type { FC } from "react"

type Props = {
    id: string,
    src: string,
}

const AudioElement: FC<Props> = (props) => {
    return <audio id={props.id} preload={`auto`} src={props.src}></audio>
}

export default AudioElement