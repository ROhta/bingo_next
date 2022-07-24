import type { FC } from "react"
import { useRecoilValue } from "recoil"
import { HistoryNumber } from "../atoms/HistoryNumber"
import { historiesListAtom} from "../recoil/atoms"

export const HistoryNumbers: FC = () => {
    return (
        <>
            {useRecoilValue(historiesListAtom).map((n) => <HistoryNumber key={n} />)}
        </>
    )
}
