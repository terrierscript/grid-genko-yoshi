import React, { useState, useMemo, useCallback } from "react"
import styled from "styled-components"

const Body = styled.div`
  --color: ${({ color }) => color};
  --row-num: ${({ rowNum }) => rowNum};
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
  writing-mode: vertical-rl;
  margin-top: -1px;
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

const useChangeCallback = (onChange) =>
  useCallback(
    (e) => {
      onChange(e.target.value)
    },
    [onChange]
  )

function App() {
  const [text, setText] = useState(lorem)
  const [color, setColor] = useState("#d2a7a4")
  const [rowNum, setRowNum] = useState(10)
  const handleText = useChangeCallback(setText)
  const handleColor = useChangeCallback(setColor)
  const handleRowNum = useChangeCallback(setRowNum)
  const chars = useMemo(() => {
    const str = text.split("")
    const pad = rowNum - (str.length % rowNum)
    return str.concat(Array.from({ length: pad }))
  }, [text, rowNum])

  return (
    <Body color={color} rowNum={rowNum}>
      <div>
        <TextArea onChange={handleText} value={text} />
        <label>
          color:
          <input type="color" value={color} onChange={handleColor} />
        </label>

        <label>
          rowNum:
          <input type="number" value={rowNum} onChange={handleRowNum} />
        </label>
      </div>

      <Outline>
        <Grid>
          {chars.map((c, key) => (
            <Cell key={key}>{c}</Cell>
          ))}
        </Grid>
      </Outline>
      <a href="https://github.com/terrierscript/grid-genko-yoshi">
        Source Code
      </a>
    </Body>
  )
}

export default App
