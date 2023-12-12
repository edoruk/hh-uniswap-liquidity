// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract CoinB is ERC20 {
    constructor() ERC20("BCN", "B Coin") {
        _mint(msg.sender, 1000 * 10 ** 18);
    }
}
