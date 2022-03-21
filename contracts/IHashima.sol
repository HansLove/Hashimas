// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


interface IHashima{

    function init()external;

    function check()external returns(bool,bytes32,uint256);
}