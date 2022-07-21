import type { FC } from "react"
import OperationButton from "../atoms/OperationButton"

const OperationButtons: FC = () => {
    const rouletteAction = (): void => {
        if (this.#isStarted) {
            this.#chooseNumber()
        } else {
            this.#startButton.innerHTML = this.#stopText

            this.#cymbals.pause()
            this.#drum.currentTime = 0
            this.#drum.play()

            this.#isStarted = true
            this.#playRoulette()
        }
    }

    const resetAction = (): void => {
        if (confirm("Do you really want to reset?")) {
            this.#numbers.resetLists()
            this.#isStarted = false

            this.#historyDisplay.innerHTML = ""
            this.#drum.pause()
            this.#startButton.innerHTML = this.#startText
            this.#bingoNumber.innerHTML = this.#firstDisplayNumber
            this.#startButton.focus()
        }
    }

    return (
        <>
            <OperationButton onClick={rouletteAction} id={`start-button`} additionalClass={`px-16`} word={`START`}/>
            <OperationButton onClick={resetAction} id={`reset-button`} additionalClass={`px-8`} word={`RESET`}/>
        </>
    )
}

generateRandomNumber = (n: number): number => Math.floor(Math.random() * n)

resetLists(): void {
    localStorage.removeItem(this.#historyListKey)
    localStorage.removeItem(this.#remainListKey)
    this.remainList = this.#allNumberList
    this.historyList = []
}

#zeroPad = (n: number): string => String(n).padStart(2, "0")

#addHistory = (n: number): void => {
    const historyNumberElement = document.createElement("p")
    historyNumberElement.className = this.#historyDisplayClassName
    historyNumberElement.innerHTML = this.#zeroPad(n)
    this.#historyDisplay.appendChild(historyNumberElement)
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

export default OperationButtons