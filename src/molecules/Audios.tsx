import type { FC } from "react"
import { useRef } from "react"
import { useRecoilState } from "recoil";
import { AudioElement } from "../atoms/AudioElement"
import { drumAtom, cymbalsAtom } from "../recoil/atoms"

export const Audios: FC = () => {
    const [ drum, setDrum ] = useRecoilState(drumAtom)
    const [ cymbals, setCymbals ] = useRecoilState(cymbalsAtom)
    setDrum(useRef<HTMLAudioElement>(null))
    setCymbals(useRef<HTMLAudioElement>(null))

    return (
        <>
            <AudioElement id={`drum`} src={`drumroll.mp3`} ref={drum} />
            <AudioElement id={`cymbals`} src={`cymbals.mp3`} ref={cymbals}/>
        </>
    )
}
