// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./IHashima.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Hashima.sol";


contract Certificado is ERC721Hashima{

    constructor() ERC721("Certificado", "CERTIFICATE") {}

    function getHashima(uint256 _index)external view returns(Hashi memory){
        return _hashis[_index];
  }
}