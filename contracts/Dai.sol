// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Dai is ERC20 {

    constructor(uint256 initialSupply) ERC20("Dai", "DAI") {
        _mint(msg.sender, initialSupply*10**18);
    }

    function recive()external payable{}


    function contractBalance()public view returns(uint){
        return address(this).balance;
    }

    
}