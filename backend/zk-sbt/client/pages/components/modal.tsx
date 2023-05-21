import React from "react";


export default function Modal() {
  const [showModal, setShowModal] = React.useState(false);
  return (
    <>
      <button
        className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 mb-4"
        type="button"
        onClick={() => setShowModal(true)}
      >
        What is this demo about?
      </button>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-scroll fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-auto mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    zKSBT Demo
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto overflow">
                  <p className="my-4 text-slate-500 text-lg leading-relaxed font-extrabold	">Problem</p>
                  <p className="my-4 text-slate-500 text-lg leading-relaxed">
                    For greater Web3 adoption in various use cases, storing of users’ specific data on-chain is critical.
                  </p>
                  <p className="my-4 text-slate-500 text-lg leading-relaxed">
                  However, this has been challenging to implement as having sensitive data on the blockchain exposes users to doxxing and potential malicious attacks due to the blockchain's public nature.
                  </p>
                  <p className="my-4 text-slate-500 text-lg leading-relaxed font-extrabold">
                    Solution with Zero-Knowledge Soulbound Tokens (zkSBT)
                  </p>  
                  <p className="my-4 text-slate-500 text-lg leading-relaxed">
                    A zkSBT is a non-transferable tokens that is bounded to a user's address. However, the data stored on the token is encrypted but can be publicly verified.
                  </p>
                  <p className="my-4 text-slate-500 text-lg leading-relaxed">
                    In our demo, we are assuming the role of a undercollaterized lending protocol who wants to verify the creditworthiness of a user without knowing their actual credit score.
                  </p>
                  <p className="my-4 text-slate-500 text-lg leading-relaxed">
                    Users are able to mint a SBT with an arbitary credit score. The credit score is then used to generate the proof and the proof is stored on the blockchain. Anybody including the undercollaterized lending protocol can then verify whether the credit score is above the threshold of 5 without knowing the user's actual credit score.
                  </p>
                  <p className="my-4 text-slate-500 text-lg leading-relaxed font-extrabold">
                  Impact
                  </p>
                    <p className="my-4 text-slate-500 text-lg leading-relaxed">
                      This is the power of Zero-Knowledge Technology, where sensitive data can be stored on the blockchain in a way that is both secured and publicly verifiable.
                  </p>
                  <p className="my-4 text-slate-500 text-lg leading-relaxed">
                    The concept of zkSBT would be revolutionary for a Web3 future where we reap the benefits of traditional interdependent economic relations while maintaining anonymity.
                  </p>
                  <p className="my-4 text-slate-500 text-lg leading-relaxed">
                    We hope you enjoy this demo!
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  {/* <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Save Changes
                  </button> */}
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}