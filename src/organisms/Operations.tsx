import type { FC } from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import { BingoNumber } from "../atoms/BingoNumber"
import { OperationButtons } from "../molecules/OperationButtons"
import { isStartedAtom } from "../recoil/atoms"


const Operations: FC = () => {
    const [isStarted, setStarted] = useRecoilState(isStartedAtom)

    const rouletteAction = (): void => {

        if (isStarted) {
            chooseNumber()
        } else {
            startButton.innerHTML = stopText

            cymbals.pause()
            drum.currentTime = 0
            drum.play()

            setStarted(true)
            playRoulette()
        }
    }

    const resetAction = (): void => {
        if (confirm("Do you really want to reset?")) {
            resetLists()
            setStarted(false)

            historyDisplay.innerHTML = ""
            drum.pause()
            startButton.innerHTML = this.#startText
            bingoNumber.innerHTML = this.#firstDisplayNumber
            startButton.focus()
        }
    }



    return (
        <section className={`text-center flex-auto`}>
            <BingoNumber />
            <OperationButtons />
        </section>
    )
}

export default Operations


generateRandomNumber = (n: number): number => Math.floor(Math.random() * n)

resetLists(): void {
    localStorage.removeItem(this.#historyListKey)
    localStorage.removeItem(this.#remainListKey)
    this.remainList = this.#allNumberList
    this.historyList = []
}

#chooseNumber = (): void => {
    if (!this.#isStarted) return
    this.#startButton.innerHTML = this.#startText

    const remains = this.#numbers.remainList
    const i = this.#numbers.generateRandomNumber(remains.length)
    const choosedNumber = remains[i]
    if (typeof choosedNumber === "number") {
        remains.splice(i, 1)
        this.#numbers.remainList = remains

        const histories = this.#numbers.historyList
        histories.push(choosedNumber)
        this.#numbers.historyList = histories

        this.#bingoNumber.innerHTML = this.#zeroPad(choosedNumber)
        this.#addHistory(choosedNumber)
    } else {
        throw new Error("Index out of bounds. Check the method!")
    }

    this.#drum.pause()
    this.#cymbals.currentTime = 0
    this.#cymbals.play()

    this.#isStarted = false
}

#playRoulette = (): void => {
    if (!this.#isStarted) return
    if (this.#drum.currentTime < this.#drum.duration) {
        const rouletteNumber = this.#numbers.remainList.at(this.#numbers.generateRandomNumber(this.#numbers.remainList.length))
        if (typeof rouletteNumber === "number") {
            this.#bingoNumber.innerHTML = this.#zeroPad(rouletteNumber)
        } else {
            throw new Error("Something is wrong with localStorage!")
        }
        setTimeout(this.#playRoulette, this.#rouletteInterval)
    } else {
        try {
            this.#chooseNumber()
        } catch (e: unknown) {
            if (e instanceof Error) console.error(e.name, e.message, e.stack)
        }
    }
}