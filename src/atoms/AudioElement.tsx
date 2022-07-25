import type { FC, RefObject } from "react"

type Props = {
    id: string,
    src: string,
    ref: RefObject<HTMLAudioElement>,
}

export const AudioElement: FC<Props> = (props) => {
    return <audio id={props.id} preload={`auto`} src={props.src} ref={props.ref}></audio>
}
