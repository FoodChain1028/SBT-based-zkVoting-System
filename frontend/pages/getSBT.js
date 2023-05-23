import React, { useState } from 'react'
import { useContract, useContractWrite, Web3Button } from '@thirdweb-dev/react'
import api from '../apis/api'

const SBT = () => {
  const [secret, setSecret] = useState('')
  const [publicNum, setPublicNum] = useState('')
  const [data, setData] = useState({ a: ["", ""], b: [["", ""], ["", ""]], c: ["", ""], Input: [""] })
  const [dataGet, setDataGet] = useState(false);
  const zkSBTAddress = "0x5041acf51104EbC59192D1fCf705F3adECb3D2FA"
  // for blockchain interaction
  // -    zkSBT contract address: 0x5041acf51104EbC59192D1fCf705F3adECb3D2FA
  // - Verifier contract address: 0xC8df7B6e803A56EC45cbbA46385219fAdDFD7483
  const { contract } = useContract(zkSBTAddress); 
  const { mutateAsync } = useContractWrite(
    contract,
    "mint",
  );

  const subS = (string) => {
    if (!string) return ""
    if (String(string).length < 20) {
      return String(string)
    }
    return String(string).substring(0, 10) + "..." + String(string).substring(string.length - 10, string.length)
  }

  const getData = (secret, publicNum) => {
    if (publicNum < 0) {
      alert('Public Num 需大於0... QQQQ')
    } else {
      api.generateCallData(secret, publicNum).then((r) => {
        console.log(r)
        setData(r)
        setDataGet(true)
      })
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%", justifyContent: "center", alignItems: "center", background: "transparent" }} >
      <h1>SBT</h1>
      <div style={{ width: "40%", background: "white", borderRadius: "15px", height: "400px", display: 'flex', flexDirection: "column", justifyContent: "center", alignItems: "center", color: "black" }}>
        <p>Secret:</p>
        <input onChange={(e) => setSecret(e.target.value)} />
        <p style={{ marginTop: "5%" }} >Public Number:</p>
        <input onChange={(e) => setPublicNum(e.target.value)} />
        <button style={{ border: "0", height: "50px", width: "120px", cursor: "pointer", borderRadius: "5px", color: "white", marginTop: "5%", background: "linear-gradient(90deg, rgba(119,9,121,0.6181066176470589) 26%, rgba(78,8,161,1) 100%)" }} onClick={() => getData(secret, publicNum)} >Generate Proof</button>
        <br />
        {dataGet &&
        <Web3Button 
          contractAddress={zkSBTAddress} 
          action={() => mutateAsync({ 
            args: [
              data.a, data.b, data.c, publicNum
            ]
          }
          )}
          onSuccess={(result) => alert("Successfully Minted a zkSBT!!\n" + result)}
          onError={(error) => {alert(error.message)}}
        >
            Mint
        </Web3Button>}
      </div>
      {
        dataGet &&
        <div style={{background:"rgba(255, 255, 255, 0.2)", boxShadow:"0 4px 30px rgba(0, 0, 0, 0.1)", padding:"5%", color:"white", borderRadius:"15px", marginTop:"5%"}} >
          <h1>Proof</h1>
          <p>- a: {subS(data.a[0])}, {subS(data.a[1])}</p>
          <p>- b1: {subS(data.b[0][0])}, {subS(data.b[0][1])}</p>
          <p>- b2: {subS(data.b[1][0])}, {subS(data.b[1][1])}</p>
          <p>- c: {subS(data.c[0])}, {subS(data.c[1])}</p>
          <p>- input: {subS(data.Input[0])}</p>
        </div>
      }
    </div>

  )
}

export default SBT