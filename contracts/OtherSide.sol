// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


import '@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol';
import "./Hashi.sol";
import "./IHashima.sol";

contract OtherSide is ERC20Burnable{
    uint256 negative_votes=0;
    uint256 positive_votes=0;

    uint8 current_rate;

    Hashi private hashiContract;
    constructor() ERC20("Petunia", "PETU"){

    }

    function aprovar(uint256 amount)external{
        hashiContract.approve(address(this), amount);
    }

    function deposit(uint256 amount) external{
        hashiContract.burnFrom(msg.sender, amount);
        _mint(msg.sender, amount*current_rate);

   }

    function vote(bool positive,uint256 amount) external{
        burn(amount);
        if(positive){
            positive_votes+=amount;
        }else{
            negative_votes+=amount;
        }
    }


    function restartCycle()internal{
        negative_votes=0;
        positive_votes=0;
    }



}