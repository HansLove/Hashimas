// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./IHashima.sol";
import "./ERC721Hashima.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";



contract NewHashima is ERC721Hashima{


  constructor() ERC721("Hashima2", "HASHIMA2") {}



}