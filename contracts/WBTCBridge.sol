// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract WBTCBridge {
    IERC20 public immutable wbtc;
    
    constructor(address _wbtc) {
        wbtc = IERC20(_wbtc);
    }

    function deposit() external payable {
        wbtc.transfer(msg.sender, msg.value);
    }

    function withdraw(uint amount) external {
        wbtc.transferFrom(msg.sender, address(this), amount);
        payable(msg.sender).transfer(amount);
    }
}