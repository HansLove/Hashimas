// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./ERC721Hashima.sol";
import "./IHashima.sol";


contract Hashima is ERC721Hashima{
   

    constructor() ERC721("Hashima", "HASHIMA") {}

    
    struct Market{
        uint256 hashima_id;
        uint256 price;
        bool forSale;
    }

    mapping(uint256=>Market) marketList;

    function getMarket(uint256 _tokenId)public view returns(Market memory){
        return marketList[_tokenId];
    }
 
    function buyToken(uint256 _tokenId) public payable returns(bool){
        require(msg.sender != address(0));
        require(_exists(_tokenId));
        address tokenOwner = ownerOf(_tokenId);
        require(tokenOwner != address(0));
        // the one who wants to buy the token should not be the token's owner
        require(tokenOwner != msg.sender);
        // get that token from all hashimas mapping and create a memory of it defined as (struct => Hashi)
        Market memory marketState = marketList[_tokenId];

        Hashi memory hashima=_hashis[_tokenId];

        require(msg.value >= marketState.price,'price has to be high');
        
        require(marketState.forSale);
        // transfer the token from owner to the caller of the function (buyer)
        _transfer(tokenOwner, msg.sender, _tokenId);
        // get owner of the token
        address payable sendTo = hashima.currentOwner;
        // send token's worth of ethers to the owner
        (bool sent, ) = sendTo.call{value: msg.value}("");

        // update the token's previous owner
        hashima.previousOwner = hashima.currentOwner;
        // update the token's current owner
        hashima.currentOwner =payable(msg.sender);

        marketState.forSale=false;
        // set and update that token in the mapping
        _hashis[_tokenId] = hashima;
        marketList[_tokenId]=marketState;

        return sent;
    }



    function toggleForSale(uint256 _tokenId,uint256 _newPrice) public {
        require(msg.sender != address(0));
        require(_exists(_tokenId));
   
        address tokenOwner = ownerOf(_tokenId);
        require(tokenOwner == msg.sender,'only the hashima owner');

        // Hashi memory _hashima = _hashis[_tokenId];
        Market memory _market=marketList[_tokenId];

        if(_market.forSale) {
            _market.forSale = false;
        } else {
            _market.forSale = true;
            _market.price = _newPrice;
        }
        
        marketList[_tokenId] = _market;
    }


    function changeTokenPrice(uint256 _tokenId, uint256 _newPrice) public {

        require(msg.sender != address(0));
        require(_exists(_tokenId));
        
        address tokenOwner = ownerOf(_tokenId);
        // check that token's owner should be equal to the caller of the function
        require(tokenOwner == msg.sender);

        Market memory marketState = marketList[_tokenId];
        // update token's price with new price
        marketState.price = _newPrice;
        // set and update that token in the mapping
        marketList[_tokenId] = marketState;
    }

    


}