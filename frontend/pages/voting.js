import React, { useState } from 'react'
import { VotingCard, VotingCon } from './style'
import Alice from '../asset/Alice.jpg'
import Bob from '../asset/Bob.jpg'
import John from '../asset/John.jpg'


const Voting = () => {
  let J = '0x0bfa36c40b8771f59912a8b06e3ba9cd68504e69345a0ebcb952c3c6100ec88e'
  let A = '0x6070f87e7650727769f301b1e264c58d77a49792dc17c13fe3cb44a9bb1f7b44'
  let B = '0x780641b8ceca510c40f5f0178d126444811cc3e3edf7fa86f3656f77615dcc5c'
  const [selection, setSelect] = useState("")
  const [data, setData] = useState("")

  const User = (props) => {
    let name = props.name
    let D = props.D

    return (
      <div style={{ width: "80%", backgroun: "white", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "5%" }}>
        <h1>{name}</h1>
        <div style={{ display: "flex", flexDirection: "column", height: "180px", width: "150px", background: "gray", marginBottom: "10%", whiteSpace: "pre", justifyContent: "center", alignItems: "center" }}>
          {/* |\---/|<br />
             | o_o | <br /> {""}
            \_^_/< */}
          <p> /\_/\ <br />
            ( o.o )<br />
            {" > ^ <"}</p>
        </div>
        <button onClick={() => { setSelect(name); setData(D) }}>Choose</button>
      </div>
    )
  }

  return (
    <VotingCon>
      <h1>Voting</h1>
      <VotingCard>
        <User name={"John"} D={J} />
        <User name={"Alice"} D={A} />
        <User name={"Bob"} D={B} />
      </VotingCard>
      <p>
        Your Choice: {selection} 
      </p>
      <button >
        確定投票
      </button>
    </VotingCon>
  )
}

export default Voting