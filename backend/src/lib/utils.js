import * as snarkjs from "snarkjs";
import { wrongProof, wrongPublicSignals } from "../public/wrong_proof.js";

// Current working directory is server/
const circuitWasm = "./src/public/Polynomial.wasm";
const finalZkey = "./src/public/Polynomial.zkey";
const verificationKeyPath = "./src/public/Polynomial.vkey.json";

// generate call data to send to SBT Contract
export async function generateCallData(secret, publicNum) {
    try {
        
        console.log("Generating ZKProofs...");
        const { proof, publicSignals } = await generateProof(secret, publicNum);

        console.log(proof);
        console.log("Generating call data...");
        
        const calldata = await snarkjs.groth16.exportSolidityCallData(proof, publicSignals);
        const argv = calldata
            .replace(/["[\]\s]/g, "")                                         
            .split(",")
            .map((x) => BigInt(x).toString());
        console.log("ARGV",calldata)
        const a = [argv[0], argv[1]];
        const b = [
            [argv[2], argv[3]],
            [argv[4], argv[5]],
        ];
        const c = [argv[6], argv[7]];
        const Input = [];

        for (let i = 8; i < argv.length; i++) {
            Input.push(argv[i]);
        }

        return { a, b, c, Input };
    }
    catch (error) {
        console.log("Error during exportSolidityCallData");
        console.log(`Error Message ${error.message}`);
        return null;
    }
}

// this function generate proof based on the witness and zkey
export async function generateProof(secret, publicNum) {
    try {
        secret = 15
        publicNum = 121
        const inputSignal = {
            "in": secret,
            "publicNum": publicNum
        }
        const { proof, publicSignals } = await snarkjs.groth16.fullProve(
            inputSignal,
            circuitWasm,
            finalZkey
        );
        return { proof, publicSignals };
    }
    catch (error) {
        // check if it returns Error: Assert Failed.
        console.log(error);
        if (error.message.includes("Assert Failed")) {
            return { proof: wrongProof, publicSignals: wrongPublicSignals };
        }
    }
}

export async function verifyProof(proofJson, publicSignals) {
    const verificationKey = await getVerificationKey();
    const result = await snarkjs.groth16.verify(
        verificationKey,
        publicSignals,
        proofJson
    );

    // Returns true if the proof is valid
    return result;
}