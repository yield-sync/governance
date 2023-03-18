// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;


import { AccessControlEnumerable } from "@openzeppelin/contracts/access/AccessControlEnumerable.sol";


/**
* @title YieldSyncGovernance
*/
contract YieldSyncGovernance is
	AccessControlEnumerable
{
	constructor ()
	{
		_setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
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
