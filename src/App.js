import React, { useState, useMemo } from "react"
import styled from "styled-components"

const rowNum = 10
const Body = styled.div`
  --color: #d2a7a4;
  --row-num: ${rowNum};
  --w: 3em;
`

const Outline1 = styled.div`
  border: 2px var(--color) solid;
`
const Outline2 = styled.div`
  border: 4px var(--color) double;
  padding-right: 0.8em;
  padding-left: 0.8em;
`

const Outline = ({ children }) => (
  <Outline1>
    <Outline2>{children}</Outline2>
  </Outline1>
)

const Grid = styled.div`
  display: grid;
  grid-auto-columns: 3em;
  grid-template-rows: repeat(var(--row-num), var(--w));
  grid-auto-flow: column;
  direction: rtl;
  grid-column-gap: 1em;
`

const Cell = styled.div`
  border: var(--color) 1px solid;
  border-top: dotted var(--color) 1px;
  border-bottom: 0px;
  margin-top: -1px;
  writing-mode: vertical-rl;
  :nth-child(${rowNum}n + 1) {
    border-top: 0px;
    /* 1px solid var(--color); */
  }
  :nth-child(${rowNum}n) {
    border-bottom: 0px;
  }
  line-height: 2em;
  font-size: 22px;
  text-align: center;
  vertical-align: middle;
  font-family: "ヒラギノ明朝 ProN W6", "HiraMinProN-W6", "HG明朝E",
    "ＭＳ Ｐ明朝", "MS PMincho", "MS 明朝", serif;
`

const lorem =
  "依然として速度を増しながら進むにつれて、夜と日中の切り替わりが曖昧になり、一続きの灰色になった。空は深い青色で夕暮れ時のような明るい光で照らされている。急に現れる太陽はきらめく円弧の形をした光の筋となった。月はおぼろげに揺らぐ帯となり、星は見えなかった。ただ、時折青い空に明るく瞬く円が見えた。"

const TextArea = styled.textarea`
  height: 5em;
`

function App() {
  const [state, setState] = useState(lorem)
  const chars = useMemo(() => {
    const str = state.split("")
    const r = rowNum - (str.length % rowNum)
    return str.concat(Array.from({ length: r }))
  }, [state])
  return (
    <Body>
      <div>
        <TextArea onChange={(e) => setState(e.target.value)} value={state} />
      </div>
      <Outline>
        <Grid>
          {chars.map((c, key) => (
            <Cell key={key}>{c}</Cell>
          ))}
        </Grid>
      </Outline>
    </Body>
  )
}

export default App
