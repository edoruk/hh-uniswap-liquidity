// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {IUniswapV2Router02} from "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract LiquidityPool {
    IERC20 tokenA;
    IERC20 tokenB;
    IUniswapV2Router02 public constant ROUTER =
        IUniswapV2Router02(0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45);

    event log(string);

    constructor(address _tokenA, address _tokenB) {
        tokenA = IERC20(_tokenA);
        tokenB = IERC20(_tokenB);
    }

    function approve(
        address spender,
        uint256 value
    ) public virtual returns (bool) {
        tokenA.approve(spender, value);
        tokenB.approve(spender, value);
        emit log("Approved both tokens");
        return true;
    }

    function addLiquidity(
        address _tokenA,
        address _tokenB,
        uint _amountADesired,
        uint _amountBDesired,
        uint _amountAMin,
        uint _amountBMin,
        address _to,
        uint _deadline
    ) external returns (uint amountA, uint amountB, uint liquidity) {
        ROUTER.addLiquidity(
            _tokenA,
            _tokenB,
            _amountADesired,
            _amountBDesired,
            _amountAMin,
            _amountBMin,
            _to,
            block.timestamp
        );
        return (amountA, amountB, liquidity);
    }
}
