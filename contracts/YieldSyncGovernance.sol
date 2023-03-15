// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;


import { AccessControlEnumerable } from "@openzeppelin/contracts/access/AccessControlEnumerable.sol";

import { IYieldSyncGovernance } from "./interface/IYieldSyncGovernance.sol";


/**
* @title YieldSyncGovernance
*/
contract YieldSyncGovernance is
	AccessControlEnumerable,
	IYieldSyncGovernance
{
	// [mapping]
	mapping (string roleString => bytes32 roleHash) public roleString_roleHash;


	constructor ()
	{
		roleString_roleHash["DEFAULT_ADMIN_ROLE"] = DEFAULT_ADMIN_ROLE;

		_setupRole(roleString_roleHash["DEFAULT_ADMIN_ROLE"], _msgSender());
	}


	/// @inheritdoc IYieldSyncGovernance
	function addRoleString_roleHash(string memory roleString)
		public
		override
		onlyRole(roleString_roleHash["DEFAULT_ADMIN_ROLE"])
	{
		roleString_roleHash[roleString] = keccak256(abi.encodePacked(roleString));

		_setRoleAdmin(roleString_roleHash[roleString], DEFAULT_ADMIN_ROLE);
	}
}

/*
* ██╗   ██╗██╗███████╗██╗     ██████╗     ███████╗██╗   ██╗███╗   ██╗ ██████╗
* ╚██╗ ██╔╝██║██╔════╝██║     ██╔══██╗    ██╔════╝╚██╗ ██╔╝████╗  ██║██╔════╝
*  ╚████╔╝ ██║█████╗  ██║     ██║  ██║    ███████╗ ╚████╔╝ ██╔██╗ ██║██║
*   ╚██╔╝  ██║██╔══╝  ██║     ██║  ██║    ╚════██║  ╚██╔╝  ██║╚██╗██║██║
*    ██║   ██║███████╗███████╗██████╔╝    ███████║   ██║   ██║ ╚████║╚██████╗
*    ╚═╝   ╚═╝╚══════╝╚══════╝╚═════╝     ╚══════╝   ╚═╝   ╚═╝  ╚═══╝ ╚═════╝
*/
