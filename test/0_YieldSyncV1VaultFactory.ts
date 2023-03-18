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
			"Should set msg.sender as an admin",
			async () => {
				const [owner] = await ethers.getSigners();

				expect(await yieldSyncGovernance.hasRole(ethers.constants.HashZero, owner.address)).to.be.true;
			}
		);
	});


	describe("Restriction: IYieldSyncGovernance DEFAULT_ADMIN_ROLE", async () => {
		describe("grantRole()", async () => {
			it(
				"Should revert when unauthorized msg.sender calls..",
				async () => {
					const [, addr1] = await ethers.getSigners();

					await expect(
						yieldSyncGovernance.connect(addr1).grantRole(
							ethers.utils.solidityKeccak256(["string"], ["JARL_OF_WHITERUN"]),
							addr1.address
						)
					).to.be.rejected;
				}
			);

			it(
				"Should be able to add address to a newly created role..",
				async () => {
					const [, addr1] = await ethers.getSigners();

					expect(await yieldSyncGovernance.grantRole(
						ethers.utils.solidityKeccak256(["string"], ["JARL_OF_WHITERUN"]),
						addr1.address
					));

					expect(await yieldSyncGovernance.hasRole(
						ethers.utils.solidityKeccak256(["string"], ["JARL_OF_WHITERUN"]),
						addr1.address
					)).to.be.true;
				}
			);
		});

		describe("revokeRole()", async () => {
			it(
				"Should revert when unauthorized msg.sender calls..",
				async () => {
					const [, addr1] = await ethers.getSigners();

					await expect(
						yieldSyncGovernance.connect(addr1).revokeRole(
							ethers.utils.solidityKeccak256(["string"], ["JARL_OF_WHITERUN"]),
							addr1.address
						)
					).to.be.rejected;
				}
			);

			it(
				"Should be able to remove address from a role..",
				async () => {
					const [, addr1] = await ethers.getSigners();

					expect(await yieldSyncGovernance.revokeRole(
						ethers.utils.solidityKeccak256(["string"], ["JARL_OF_WHITERUN"]),
						addr1.address
					));

					expect(await yieldSyncGovernance.hasRole(
						ethers.utils.solidityKeccak256(["string"], ["JARL_OF_WHITERUN"]),
						addr1.address
					)).to.be.false;
				}
			);
		});

	});
});
