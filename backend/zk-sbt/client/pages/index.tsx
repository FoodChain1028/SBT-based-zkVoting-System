import React from 'react';
import { useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import axios from 'axios';
import { generateProofUrl, generateCallDataUrl } from '../globals/urlConfig';
import { BigNumber, utils } from 'ethers';
import { useCallback } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";


import Header from './components/hamburgHeader';
import CallToAction from './components/cta';
import Modal from './components/modal';
import YoutubeIframe from './components/youtubeIframe';


import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';

// Contracts
import verifierInterface from '../abi/verifier.json';
import zkSBTInterface from '../abi/zksbt.json';
import Router from 'next/router';


const verifierContractAddress = "0xA5578AF6d7d5dEA23020268004F6c2Fe3C2F0621"


const zksbtContractConfig = {
  addressOrName: '0x51B543C4a9d38E747a3c1963b76E42d8Ad696ef4',
  contractInterface: zkSBTInterface,
};



const Home: NextPage = () => {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  const [totalMinted, setTotalMinted] = React.useState(0);
  const [getHasSoul, setHasSoul] = React.useState(false);
  const { isConnected } = useAccount();
  const [getCreditScore, setCreditScore] = React.useState('');
  const [getVerificationAddress, setVerificationAddress] = React.useState('');
  interface UserData {
    a: string;
    b: string;
    c: string;
    inputs: string;
  }
  
  const [getCallData, setCallData] = useState<UserData>({a:'', b:'', c:'', inputs:''})
  const [getVerificationStatus, setVerificationStatus] = useState<boolean|null>(null);
  const [open, setOpen] = React.useState(false)


  // get wallet address
  const { address, isConnecting, isDisconnected } = useAccount()

  
  /* Helper Functions */
  // Minting
  const { config: zksbtMintConfig } = usePrepareContractWrite({
    ...zksbtContractConfig,
    functionName: 'mint',
    args: [getCallData.a, getCallData.b, getCallData.c, getCallData.inputs],
  });

  const {
    data: mintData,
    write: mint,
    isLoading: isMintLoading,
    isSuccess: isMintStarted,
    error: mintError,
  } = useContractWrite(zksbtMintConfig);

  const {
    data: txData,
    isSuccess: txSuccess,
    error: txError,
  } = useWaitForTransaction({
    hash: mintData?.hash,
  });

  const isMinted = txSuccess;


  // Total Supply
  const { data: totalSupplyData } = useContractRead({
    ...zksbtContractConfig,
    functionName: 'totalSBT',
    watch: true,
  });

  // SBT Data
  const { data: sbtData } = useContractRead({
    ...zksbtContractConfig,
    functionName: 'getSBTData',
    watch: true,
    args: [address]
  });

  
  const { data: addressVerified } = useContractRead({
    ...zksbtContractConfig,
    functionName: 'validateAttribute',
    watch: true,
    args: [getVerificationAddress, verifierContractAddress]
  });


  // Check if user has SBT
  const { data: hasSoul } = useContractRead({
    ...zksbtContractConfig,
    functionName: 'hasSoul',
    watch: true,
    args: [address]
  });

  const { data: verifyingAddressHasSoul } = useContractRead({
    ...zksbtContractConfig,
    functionName: 'hasSoul',
    watch: true,
    args: [getVerificationAddress]
  });

  React.useEffect(() => {
    if (totalSupplyData) {
      setTotalMinted(totalSupplyData.toNumber());
    }
  }, [totalSupplyData]);

  React.useEffect(() => {
    if (hasSoul) {
      setHasSoul(true);
    } else {
      setHasSoul(false);
    }
  }, [hasSoul]);

  React.useEffect(() => {
      if (addressVerified) {
        setVerificationStatus(true);
      }
    }
  , [getVerificationAddress]);

  function handleCreditScoreChange(e: any) {
    setCreditScore(e.target.value);
  }
  function handleVerificationAddressChange(e: any) {
    setVerificationAddress(e.target.value);
    if (addressVerified) {
        setVerificationStatus(true);
      }
  }


  /** API Call Functions */

  const getCallDataFromServer = useCallback(async () => {
    try{
      const response =  await axios.get(`${generateCallDataUrl}?creditScore=${getCreditScore}`)
      return convertCallDataToIntegers(response.data);
      
    } catch(error) {
      console.log(error);
      return {};
    }
  }, [getCreditScore]);
  

  // Helper 
  const convertCallDataToIntegers = (responseData : {a:Array<string>,b:Array<Array<string>>,c:Array<string>,Input:Array<string>}) => {
    const a = responseData.a.map((item: any) => BigNumber.from(item));
    // Loop through array in b and convert to BigNumber.from
    const b = responseData.b.map((item: any) => {
      return item.map((subItem: any) => BigNumber.from(subItem));
    });
    const c = responseData.c.map((item: any) => BigNumber.from(item));
    const inputs = responseData.Input.map((item: any) => parseInt(item));
    return { a, b, c, inputs };
  };


  /** Event Handler */
  async function handleMintButtonClick() {
    // check if credit score is valid
    if (isNaN(parseInt(getCreditScore))) {
      alert("Please enter a valid credit score");
      return;
    }
    if (hasSoul){
      alert("Address already minted a SBT");
      return;
    }
    if (parseInt(getCreditScore) > 100){
      alert("Credit Score cannot be greater than 100");
      return;
    }
    const callData = await getCallDataFromServer(); 
    // set state as a callback
    setCallData(callData)
    // mint?.();
    mintSbt();
  }

  const mintSbt = useCallback(() => {
    if (Object.keys(getCallData).length !== 0) {
      console.log("Call data minted", getCallData);
      mint?.();
    }
    else {
      alert("Please try clicking the mint button again");
    }
  }, [getCallData, mint]);
  

  async function handleVerifyButtonClick() {
    // check if the input is a valid address
    if (!utils.isAddress(getVerificationAddress)) {
      setVerificationStatus(null);
      alert("Please enter a valid address");
      return;
    }
    // // check if the address has a SBT
    if (!verifyingAddressHasSoul) {
      setVerificationStatus(null);
      alert("Address does not have a SBT");
      return;
    }
    
    // check if the address has been verified    
    if (addressVerified) {
      setVerificationStatus(true);
      return;
    }

    else if (!addressVerified) {
      setVerificationStatus(false);
      return;
    }
  }


  /* Render */
  return (
    <div className={styles.container}>
      <Head>
        <title>zKSBT App</title>
        <meta
          name="zkSBT Demo"
          content="by @spartan-labs"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Header isConnected />


      <main className={styles.main}>
        <div className='md:container md:mx-auto'>
        <h1 className={styles.title}>
            zKSBT Mint Demo by <a href="https://spartanlabs.studio/">Spartan Labs</a>
          </h1>
        </div>
        <Modal/>
        <p className={styles.description}>
          {totalMinted} ZK SoulBound Tokens minted so far!
        </p>
        <div className={styles.grid}>
          <div className='md:container md:mx-auto pb-5'>
            <YoutubeIframe videoId="NzMoTb6QBKc" videoTitle="zkSBT Demo" />
          </div>

          <a href="https://faucet.paradigm.xyz/" target="_blank" className={styles.card} rel="noreferrer">
            <h2>1. Get some Testnet ETH
            <FontAwesomeIcon className="ml-3" icon={faArrowUpRightFromSquare} /> </h2>
            <p>Before you do anything, you need some Goerli ETH from Faucet🚰</p>
          </a>
          
        </div>
        
        <div className={styles.card}>
          <h2>2. Mint zkSBT with credit score</h2>
          <p
          className='pb-5'>
            Generate zk Proofs and mint SBT with credit score between 0 to 100
          </p>
          <form>
            <label 
            className='font-light mt-5'>
              Credit Score:
            </label>
            <input id="credit_score" 
              type="text"
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              placeholder='Input a credit score from 0 to 100'
              required
              value={getCreditScore} 
              onChange={handleCreditScoreChange} />
          </form>
            <div style={{ padding: '12px 0px 12px 100px' }}>

              {mintError && (
                <p style={{ marginTop: 2, color: '#FF6257' }}
                className="overflow-x-auto">
                  Error: {mintError.message}
                </p>
              )}
              {txError && (
                <p style={{ marginTop: 2, color: '#FF6257' }}
                className="overflow-x-auto">
                  Error: {txError.message}
                </p>
              )}

              {mounted && isConnected && !isMinted && (
                <button
                  style={{ marginTop: 2 }}
                  disabled={isMintLoading || isMintStarted}
                  className="button object-center"
                  data-mint-loading={isMintLoading}
                  data-mint-started={isMintStarted}
                  onClick={() => handleMintButtonClick()}
                >
                  {isMintLoading && 'Waiting for approval'}
                  {isMintStarted && 'Minting...'}
                  {!isMintLoading && !isMintStarted && 'Mint'}
                </button>
              )}
              {mounted && isConnected && isMinted && (
                <div>
                <p>Transaction Minted to</p>
                  <a href={`https://goerli.etherscan.io/tx/${mintData?.hash}`} target="_blank" rel="noreferrer">{mintData?.hash.slice(0, 10)}...</a>
                </div>
              )}
          </div>
        </div>


          <div
            className={styles.card + ' w-96'}
          >
            <div className="container mx-auto">
              <h2>3. View SBT details</h2>
              <p>View your SBT details ⬇️</p>

            {mounted && isConnected && getHasSoul && (
              <span className="block ">{
                sbtData?.map((item, index) => {
                  return (
                    <a target="_blank" href="https://goerli.etherscan.io/address/0x51B543C4a9d38E747a3c1963b76E42d8Ad696ef4#readContract" rel="noreferrer"><p className="font-light break-all" key={index}>{item.toString().slice(0,30)}...</p></a>
                  )
                })}
                </span>
              )}
            </div>
          </div>

          <div className={styles.card} >
            <h2>4. Verification of SBT</h2>
            <p className='text-sm pb-5'>Input in any address to verify if their credit score is above 5 </p>
            <form>
              <label title="Try clicking again if its unverified" className='font-light mt-5'>
                Address to verify:
              </label>
              <input type="text" 
                style={{ marginTop: 4 }}

                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                placeholder='Input an address you want to verify'
                required
                value={getVerificationAddress} 
                onChange={handleVerificationAddressChange} />
            </form>
            <div style={{ padding: '12px 0px 12px 100px' }}>
              {mounted && isConnected && (
                  <button
                    style={{ marginTop: 4 }}
                    className="button object-center"
                    onClick={handleVerifyButtonClick}
                  >
                    Verify
                  </button>
                  
          )}
          
          <div>
            {(getVerificationStatus === true) && (
              <span>
              <p>Address has a SBT with credit score above 5</p>
              </span>
              
            )}
            {(getVerificationStatus === false) && (
            <p>Address does not have a SBT with credit score above 5</p>
            )}
          </div>
          </div>

            
          </div>
          <CallToAction/>

        {/* <div>
        <p>Contracts are deployed at:</p>
          <a href="https://goerli.etherscan.io/address/0xA5578AF6d7d5dEA23020268004F6c2Fe3C2F0621"><p>Verifier.sol</p></a>
          <a href="https://goerli.etherscan.io/address/0x51B543C4a9d38E747a3c1963b76E42d8Ad696ef4"><p>zkSBT.sol</p></a>
        </div> */}
      </main>

      <footer className={styles.footer}>
        <a href="https://spartanlabs.studio/" target="_blank" rel="noopener noreferrer">
          Made with ❤️ by your frens at Spartan Labs
        </a>
      </footer>
    </div>
  );
};

export default Home;
