// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC721/IERC721.sol';


interface IHashima is IERC721{

    struct Hashi {
      uint256 tokenId;
      string data;
      address payable currentOwner;
      address payable previousOwner;
      uint256 stars;
      uint256 blockTolerance;
      string nonce;
      uint256 price;
      bool forSale;
    }
  
    //Events
    event GameStart(uint256 _blocknumber);

    event Minted(bool respuesta,bytes32 hashResultado,uint256 id);

    //Getters
    function getHashima(uint256 _index)external view returns(Hashi memory);

    function getStars(uint256 _index)external view returns(uint256);

    function getTotal()external view returns(uint256);

    function getProofOfWorkData(uint256 tokenID)external view returns(string memory,uint256,string memory,uint256);
    
    function getBlockTolerance()external returns(uint256);

    function checkTolerance()external view returns(uint256);

    function buyToken(uint256 _tokenId)external payable returns(bool);

    //Setters
    function Init()external returns(uint256);

    function Mint(uint256 _stars,string memory _data,string memory _nonce,string memory _uri,uint256 _price,bool _forSale)external;

    function toggleForSale(uint256 _tokenId) external;

    function changePrice(uint256 _tokenId,uint256 _newPrice) external;

}