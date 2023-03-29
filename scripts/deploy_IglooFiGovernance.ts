require("dotenv").config();
import { Contract } from "ethers";
import { ethers } from "hardhat";


async function main() {
	const [deployer] = await ethers.getSigners();

	console.log(`Deploying contracts with the account: ${deployer.address}`);

	const yieldSyncGovernance: Contract = await (await ethers.getContractFactory('YieldSyncGovernance')).deploy();

	console.log(`Contract address: ${yieldSyncGovernance.address}`);
}

main()
	.then(() => {
		console.log(process.env)

		process.exit(0);
	})
	.catch((error) => {
		console.error(error);
		process.exit(1);
	})
;
