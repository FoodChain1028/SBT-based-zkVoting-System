# This Make file is to deploy contracts to the blockchain
hardhat-deploy-local:
	npx hardhat compile
	npx hardhat run --network localhost ./contracts/scripts/deploy.js
hardhat-deploy-goerli:
	npx hardhat compile
	npx hardhat run --network goerli ./contracts/scripts/deploy.js	
hardhat-chain:
	npx hardhat node