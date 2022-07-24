import type { FC } from "react"
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil"
import { BingoNumber } from "../atoms/BingoNumber"
import { OperationButtons } from "../molecules/OperationButtons"
import { rouletteInterval, drumAtom, cymbalsAtom } from "../recoil/atoms"
import { chooseNumberSelector, resetSelector } from "../recoil/selectors";

export const Operations: FC = () => {
    const [ isStarted, setStarted ] = useRecoilState(isStartedAtom)
    const [ choosedNumber, setChoosedNumber ] = useRecoilState(chooseNumberSelector)
    const drum = useRecoilValue(drumAtom)
    const cymbals = useRecoilValue(cymbalsAtom)
    const reset = useResetRecoilState(resetSelector)

    const chooseNumber = (): void => {
        if (!isStarted) return
        setChoosedNumber(choosedNumber)

        addHistory(choosedNumber)

        if(drum.current && cymbals.current) {
            drum.current.pause()
            cymbals.current.currentTime = 0
            cymbals.current.play()
        }

        setStarted( false)
    }

    const playRoulette = (): void => {
        if (!isStarted || !drum.current || !cymbals.current) return
        if (drum.current.currentTime < drum.current.duration) {
            setTimeout(playRoulette, rouletteInterval)
        } else {
            chooseNumber()
        }
    }

    const rouletteAction = (): void => {
        if (!drum.current || !cymbals.current) return
        if (isStarted) {
            chooseNumber()
        } else {
            cymbals.current.pause()
            drum.current.currentTime = 0
            drum.current.play()

            setStarted(true)
            playRoulette()
        }
    }

    const resetAction = (): void => {
        if (!drum.current || !cymbals.current) return
        if (confirm("Do you really want to reset?")) {
            reset()
            setStarted(false)

            historyDisplay.innerHTML = ""
            drum.current.pause()
            cymbals.current.pause()
            startButton.focus()
        }
    }

    return (
        <section className={`text-center flex-auto`}>
            <BingoNumber numStr={String(useRecoilValue(chooseNumberSelector)).padStart(2, "0")}/>
            <OperationButtons rouletteAction={rouletteAction} btnText={isStarted ? "START" : "STOP"} resetAction={resetAction} />
        </section>
    )
}
