// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const Verifier = await hre.ethers.getContractFactory("Verifier");
  const verifier = await Verifier.deploy();
  await verifier.deployed();

  const SBT = await hre.ethers.getContractFactory("zkSBT");
  const sbt = await SBT.deploy("Modified ZKSBT @foodchain & sen", "zkSBT");

  await sbt.deployed();

  console.log(`Verifier deployed to ${verifier.address}`);
  console.log(`zkSBT deployed to ${sbt.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
