import React, { useState } from 'react'
import { VotingCard, VotingCon, Button } from './style'
import { useContract, useContractWrite, useContractRead, Web3Button } from '@thirdweb-dev/react';
import { Sepolia } from '@thirdweb-dev/chains';
import { ThirdwebSDK } from '@thirdweb-dev/sdk';
import api from '../apis/api';

const voteAddress = "0x481D802837C0f97a45e47b8DfB5B3dD342Cd1147"
const zkSBTAddress = "0x5041acf51104EbC59192D1fCf705F3adECb3D2FA"
const verifierAddress = "0xC8df7B6e803A56EC45cbbA46385219fAdDFD7483"

const Voting = () => {
  let J = '0x0bfa36c40b8771f59912a8b06e3ba9cd68504e69345a0ebcb952c3c6100ec88e'
  let A = '0x6070f87e7650727769f301b1e264c58d77a49792dc17c13fe3cb44a9bb1f7b44'
  let B = '0x780641b8ceca510c40f5f0178d126444811cc3e3edf7fa86f3656f77615dcc5c'
  const [selection, setSelect] = useState("");
  const [candidate, setCandidate] = useState("");
  const [secret, setSecret] = useState();
  const [soulAddress, setSoulAddr] = useState("");
  const [input, setInput] = useState([]);
  const [voteVis, setVoteVis] = useState(false)


  const sdk = new ThirdwebSDK(Sepolia);

  const { contract } = useContract(voteAddress);
  const { mutateAsync: voteForCandidate } = useContractWrite(
    contract,
    "voteForCandidate"
  )


  const generateInput = async (_soul) => {
    const contract = await sdk.getContract(zkSBTAddress);
    const data = await contract.call("getPublicNum", [_soul])
    const publicNum = parseInt(data._hex)
    console.log(publicNum);
    const proof = await api.generateCallData(secret, publicNum);
    setInput(proof.Input)
  }

  const vote = async (

  ) => {
    console.log(123123);

    try {

      const data = await voteForCandidate({
        args: [
          candidate,
          soulAddress,
          verifierAddress,
          zkSBTAddress,
          input
        ]
      });
      alert("Successfully Voted!")
      console.info("contract call successs", data);
      setVoteVis(false)
    } catch (err) {
      alert('SBT不存在或是已投票過。')
      console.error("contract call failure", err);
    }

  }

  const User = (props) => {
    let name = props.name
    let D = props.D

    return (
      <div style={{ width: "80%", backgroun: "white", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "5%" }}>
        <h1>{name}</h1>
        <div style={{ display: "flex", flexDirection: "column", height: "180px", width: "150px", background: "gray", marginBottom: "10%", whiteSpace: "pre", justifyContent: "center", alignItems: "center" }}>

          <p> /\_/\ <br />
            ( o.o )<br />
            {" > ^ <"}</p>
        </div>
        <button onClick={() => { setSelect(name); setCandidate(D) }}>Choose</button>
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
      <input
        style={{ margin: "1%" }}
        onChange={(e) => setSoulAddr(e.target.value)}
        placeholder='your soul address'
      />
      <input
        style={{ margin: "1%" }}
        onChange={(e) => setSecret(e.target.value)}
        placeholder='your secret'
      />
      <Button onClick={
        async () => {
          if (soulAddress !== "" && secret !== "") {
            await generateInput(soulAddress)
            setVoteVis(true)
          } else {
            alert('請輸入資料！')
          }

        }
      }>
        Generate Input
      </Button>
      {
        voteVis && <Button onClick={
          () => {
            if (selection === "") {
              alert("尚未選擇候選人。")
            } else {
              vote()
                .then((result) => {
                  console.log(result);
                })
                .catch((e) => {
                  console.log(e);
                })
            }
          }
        }
        >
          Vote
        </Button>
      }

    </VotingCon>
  )
}

export default Voting