// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./ERC721Hashima.sol";


contract Hashima is ERC721Hashima{
   
    constructor() ERC721("Hashima", "HASHIMA") {}

    function checkHash(
        string memory _data, 
        string memory _nonce,uint256 altura,uint256 dificultad)public pure returns(bool,bytes32){
            
        bytes32 _hashFinal=sha256(abi.encodePacked(_data,_nonce,Strings.toString(altura)));
        bool respuesta=true;

        for (uint256 index = 0; index < dificultad; index++) {
            if (_hashFinal[index]!=0x00) {
                    respuesta=false;  
                }
        
        }
        return (respuesta,_hashFinal);
        }


        
}