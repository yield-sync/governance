import { expect } from "chai";
import { Contract, ContractFactory } from "ethers";

const { ethers } = require("hardhat");


const stageContracts = async () => {
	const YieldSyncGovernance: ContractFactory = await ethers.getContractFactory("YieldSyncGovernance");

	const yieldSyncGovernance: Contract = await (await YieldSyncGovernance.deploy()).deployed();

	return {
		yieldSyncGovernance,
	};
}


describe("[0] YieldSyncGovernance.sol - YieldSync Governance", async () => {
	let yieldSyncGovernance: Contract;

	before("[before] Set up contracts..", async () => {
		const stagedContracts = await stageContracts();

		yieldSyncGovernance = stagedContracts.yieldSyncGovernance
	});

	describe("Initial values", async () => {
		it(
			"Should set DEFAULT_ADMIN_ROLE roleHash to 0x0000000000000000000000000000000000000000000000000000000000000000 ..",
			async () => {
				expect(await yieldSyncGovernance.roleString_roleHash("DEFAULT_ADMIN_ROLE")).to.equal(
					"0x0000000000000000000000000000000000000000000000000000000000000000"
				);
			}
		);

		it(
			"Should set msg.sender as an admin",
			async () => {
				const [owner] = await ethers.getSigners();

				expect(
					await yieldSyncGovernance.hasRole(
						"0x0000000000000000000000000000000000000000000000000000000000000000",
						owner.address
					)
				).to.be.true;
			}
		);
	});


	describe("Restriction: IYieldSyncGovernance DEFAULT_ADMIN_ROLE", async () => {
		describe("addRoleString_roleHash()", async () => {
			it(
				"Should revert when unauthorized msg.sender calls..",
				async () => {
					const [, addr1] = await ethers.getSigners();

					await expect(
						yieldSyncGovernance.connect(addr1).addRoleString_roleHash("JARL_OF_WHITERUN")
					).to.be.rejected;
				}
			);

			it(
				"Should be able to add to `roleString_roleHash`..",
				async () => {
					await yieldSyncGovernance.addRoleString_roleHash("JARL_OF_WHITERUN")

					await expect(
						await yieldSyncGovernance.roleString_roleHash("JARL_OF_WHITERUN")
					).to.be.equal(ethers.utils.solidityKeccak256(["string"], ["JARL_OF_WHITERUN"]));
				}
			);
		});
	});
});
