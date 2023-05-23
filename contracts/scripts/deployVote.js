// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const Vote = await hre.ethers.getContractFactory("Vote");
  const vote = await Vote.deploy([
	"0x0bfa36c40b8771f59912a8b06e3ba9cd68504e69345a0ebcb952c3c6100ec88e",
	"0x6070f87e7650727769f301b1e264c58d77a49792dc17c13fe3cb44a9bb1f7b44",
	"0x780641b8ceca510c40f5f0178d126444811cc3e3edf7fa86f3656f77615dcc5c"
  ]);

  await vote.deployed();
  console.log(`vote deployed to ${vote.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
