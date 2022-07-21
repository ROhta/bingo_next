import type { FC } from "react"
import HistoryNumber from "../atoms/HistoryNumber"

const HistoryNumbers: FC = () => {
    #zeroPad = (n: number): string => String(n).padStart(2, "0")

    #addHistory = (n: number): void => {
        const historyNumberElement = document.createElement("p")
        historyNumberElement.className = this.#historyDisplayClassName
        historyNumberElement.innerHTML = this.#zeroPad(n)
        this.#historyDisplay.appendChild(historyNumberElement)
    }

    return <HistoryNumber />
}

export default HistoryNumbers