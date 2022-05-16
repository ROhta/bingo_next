import { FC } from "react"
import styled from "styled-components"

const BingoNumber: FC = () => {
    return <NumberDisplay id="bingo-number">00</NumberDisplay>
}

const NumberDisplay = styled.p`
  font-size: 55vmin
`

export default BingoNumber