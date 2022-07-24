import type { FC } from "react"
import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue } from 'recoil';
import { Operations } from "../organisms/Operations"
import { Histories } from "../organisms/Histories"
import { Audios } from "../molecules/Audios"

export const IndexPage: FC = () => {
    return (
        <RecoilRoot>
            <div className={`flex`}>
                <Operations />
                <Histories />
            </div>
            <Audios />
        </RecoilRoot>
    )
}
