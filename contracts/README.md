# Contracts

This project serves the purpose of deploying `Verifier.sol` and `zkSBT.sol` on sepolia testnet.

# Deploy Steps
> to deploy these two contracts on chain, you have to...

1. run `yarn`/ `npm install` to install dependencies in this project.
2. run `cp .env.example .env` && fill in the evironment variables
3. run `npx hardhat run script/deploy.js`

result:
```bash
$ npx hardhat run scripts/deploy.js --network sepolia
Verifier deployed to 0xC8df7B6e803A56EC45cbbA46385219fAdDFD7483
zkSBT deployed to 0x5041acf51104EbC59192D1fCf705F3adECb3D2FA
```

The contracts will be deployed on chain.