const { ethers } = require("hardhat");
require("@nomiclabs/hardhat-etherscan");

async function main() {

	// Deploy Verifier Contract
  const VerifierContract = await ethers.getContractFactory("Verifier");
	console.log("\nDeploying Verifier contract...");
	const verifier = await VerifierContract.deploy();
	await verifier.deployed();

	console.log("Verifier contract deployed to:", verifier.address);

	// Deploy zkSBT Contract
	const zkSBTContract = await ethers.getContractFactory("zkSBT");
	console.log("\nDeploying zkSBT contract...");
	const zkSBT = await zkSBTContract.deploy("Spartan Labs ZK SBT", "zkSBT");
	console.log("zkSBT contract deployed to:", zkSBT.address);
	await zkSBT.deployed();


	// wait for 1 block confirmation
	console.log("\nWaiting for 1 block confirmation...");
	await new Promise((resolve) => setTimeout(resolve, 5000)); // wait for 5 sec
	
	// Verify contract on Etherscan
	console.log("\nVerifying zkSBT contract on Etherscan...");
	console.log("Verifying Verifier contract on Etherscan...");

	await hre.run("verify:verify", {
		address: verifier.address,
		contract: "contracts/Verifier.sol:Verifier",
		constructorArguments: [],
	});

	await hre.run("verify:verify", {
		address: zkSBT.address,
		contract: "contracts/zkSBT.sol:zkSBT",
		constructorArguments: ["Spartan Labs ZK SBT", "zkSBT"],
	});

	console.log("Contracts verified on Etherscan!");
	console.log("Address of zkSBT contract:", zkSBT.address);
	console.log("Address of Verifier contract:", verifier.address);

}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});