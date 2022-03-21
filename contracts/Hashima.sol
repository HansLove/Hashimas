// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract Hashima is ERC721URIStorage,Ownable{

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    uint256 BLOCK_TOLERANCE=100;

    mapping(address=>uint256) private tolerance;
    //check the string use by the user is not repeat
    mapping(string=>bool)public _names;

  constructor() ERC721("Hashima", "HASHIMA") {}

   struct Hashi {
      uint256 tokenId;
      string tokenName;
      string tokenURI;
      address payable currentOwner;
      address payable previousOwner;
      uint256 price;
      bool forSale;
      uint256 stars;
      uint256 blockNumber;
      string nonce;
      bool sign;
  }
    
  mapping(uint256=>Hashi) _hashis ;

  function createHashimaItem(
    string memory tokenURI,
    string memory _data,
    string memory _nonce,
    uint256 _estrellas) private returns (uint256){

    _tokenIds.increment();

    uint256 newItemId = _tokenIds.current();
    _mint(msg.sender, newItemId);
    _setTokenURI(newItemId, tokenURI);

    bool sign=false;
    if(owner()==msg.sender){
      sign=true;
    }
    Hashi memory newHashima= Hashi(
    _tokenIds.current(),//token id of hashima
    _data,//string pick by the miner
    tokenURI,
    payable(msg.sender),
    payable(address(0)),
    0,
    false,//for sale
    _estrellas,
    block.number,
    _nonce,
    sign
    );

    _hashis[_tokenIds.current()] = newHashima;

    return newItemId;

  }

  function getHashima(uint256 _index)public view returns(Hashi memory){
        return _hashis[_index];
  }

  function _beforeTokenTransfer(address from,address to,uint256 tokenId)internal override{
          Hashi memory _hashima = _hashis[tokenId];
          // update the token's previous owner
          _hashima.previousOwner = payable(from);
          // update the token's current owner
          _hashima.currentOwner =payable(to);
          _hashis[tokenId] = _hashima;

    }
  

  
  
  event GameStart(uint256 _blocknumber);
 

  function initGame()public{
        uint256 _block=block.number;
        tolerance[msg.sender]=_block;
        emit GameStart(_block);
  }


  function check(
        uint256 _estrellas,
        string memory _hashID,
        string memory _nonce,
        string memory _uri)public returns(bool,bytes32,uint256) {

        uint256 _id=0;
        require(tolerance[msg.sender]+BLOCK_TOLERANCE>block.number,"tolerance is expire");
        require(_names[_hashID]==false,"name is busy");
        require(tolerance[msg.sender]!=0);
        require(msg.sender != address(0));

        bool respuesta=true;

        bytes32 _hashFinal=sha256(abi.encodePacked(_hashID,_nonce));
        for (uint256 index = 0; index < _estrellas; index++) {
           if (_hashFinal[index]!=0x00) {
                respuesta=false;  
            
            }
        
        }
        if (respuesta) {
            //convierto la string utilizada a true para que no pueda ser utilizada.    
            _names[_hashID]=true; 
            
            _id=createHashimaItem(
                _uri,
                _hashID,
                _nonce,
                _estrellas);
         
        }
        return(respuesta,_hashFinal,_id);
        
    }

  function checkGame()public view returns(uint256){
        return tolerance[msg.sender];
    }
  
  function setBlockTolerance(uint256 _newtolerance)public onlyOwner{
        BLOCK_TOLERANCE=_newtolerance;

    }

  function buyToken(uint256 _tokenId) public payable returns(bool){
    // check if the function caller is not an zero account address
    require(msg.sender != address(0));
    // check if the token id of the token being bought exists or not
    require(_exists(_tokenId));
    // get the token's owner
    address tokenOwner = ownerOf(_tokenId);
    // token's owner should not be an zero address account
    require(tokenOwner != address(0));
    // the one who wants to buy the token should not be the token's owner
    require(tokenOwner != msg.sender);
    // get that token from all hashimas mapping and create a memory of it defined as (struct => Hashi)
    Hashi memory _hashima = _hashis[_tokenId];
    require(msg.value >= _hashima.price,'price has to be high');
    // hashima should be for sale
    require(_hashima.forSale);
    // transfer the token from owner to the caller of the function (buyer)
    _transfer(tokenOwner, msg.sender, _tokenId);
    // get owner of the token
    address payable sendTo = _hashima.currentOwner;
    // send token's worth of ethers to the owner
    (bool sent, ) = sendTo.call{value: msg.value}("");

    // update the token's previous owner
    _hashima.previousOwner = _hashima.currentOwner;
    // update the token's current owner
    _hashima.currentOwner =payable(msg.sender);

    _hashima.forSale=false;
    // set and update that token in the mapping
    _hashis[_tokenId] = _hashima;

    return sent;
  }


  function changeTokenPrice(uint256 _tokenId, uint256 _newPrice) public {
    // require caller of the function is not an empty address
    require(msg.sender != address(0));
    // require that token should exist
    require(_exists(_tokenId));
    // get the token's owner
    address tokenOwner = ownerOf(_tokenId);
    // check that token's owner should be equal to the caller of the function
    require(tokenOwner == msg.sender);

    Hashi memory _hashima = _hashis[_tokenId];
    // update token's price with new price
    _hashima.price = _newPrice;
    // set and update that token in the mapping
    _hashis[_tokenId] = _hashima;
  }

  // switch between set for sale and set not for sale
  function toggleForSale(uint256 _tokenId,uint256 _newPrice) public {
    // require caller of the function is not an empty address
    require(msg.sender != address(0));
    // require that token should exist
    require(_exists(_tokenId));
    // get the token's owner
    address tokenOwner = ownerOf(_tokenId);
    // check that token's owner should be equal to the caller of the function
    require(tokenOwner == msg.sender,'only the hashima owner');
    // get that token from all crypto boys mapping and create a memory of it defined as (struct => CryptoBoy)
    Hashi memory _hashima = _hashis[_tokenId];

    // if token's forSale is false make it true and vice versa
    if(_hashima.forSale) {
      _hashima.forSale = false;
    } else {
      _hashima.forSale = true;
      _hashima.price = _newPrice;
    }
    // set and update that token in the mapping
    _hashis[_tokenId] = _hashima;
  }

  function dameTotal()public view returns(uint256){
      return(_tokenIds.current());
  }

  function original(uint256 _tokenId)public view returns(bool){
    return _hashis[_tokenId].sign;
  }

  function checkingHash(string memory _input,string memory _nonce)public pure returns(bytes32){
      bytes32 _hashFinal=sha256(abi.encodePacked(_input,_nonce));
      return _hashFinal;

  }

}
