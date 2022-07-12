import type { FC } from "react"
import AudioElement from "../atoms/AudioElement"

const Audios: FC = () => {
    return (
        <>
            <AudioElement id={`drum`} src={`drumroll.mp3`} />
            <AudioElement id={`cymbals`} src={`cymbals.mp3`} />
        </>
    )
}

export default Audios