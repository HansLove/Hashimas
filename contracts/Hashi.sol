// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol';
import "./Hashima.sol";
import "./IHashima.sol";
import "./ERC721Hashima.sol";

contract Hashi is ERC20Burnable{
    mapping(address => mapping(address=>mapping(uint256=>uint256))) public checkpoints;
    mapping(address => mapping(uint256=>bool)) public has_deposited;
    mapping(address=>mapping(uint256 => address)) public staking_accounts;

    constructor() ERC20("Hashi", "HASHI"){

    }

    function aprovar(address hashima_contract,uint256 tokenId)external{
        IHashima(hashima_contract).approve(address(this), tokenId);
        
    }

    function deposit(address hashima_contract,uint256 tokenId) external{
        require (msg.sender ==  ERC721Hashima(hashima_contract).ownerOf(tokenId), 'Sender must be owner');
        require (!has_deposited[hashima_contract][tokenId], 'Sender already deposited');
        
   
        (string memory _data,
        uint256 _stars,
        string memory _nonce,
        uint256 _tolerance)=ERC721Hashima(hashima_contract).getProofOfWorkData(tokenId);

        bool coolProofOfWork=checkingHash(_data, _nonce, _tolerance, _stars);

        require(coolProofOfWork,'Not valid PoW');
        
        //La altura del bloque de partida
        checkpoints[hashima_contract][msg.sender][tokenId] = block.number;

        staking_accounts[hashima_contract][tokenId]=msg.sender;
        has_deposited[hashima_contract][tokenId]=true;
        
        //El hashima es transferido a este contrato
        IHashima(hashima_contract).transferFrom(msg.sender, address(this), tokenId);

   }

    function withdraw(address hashima_contract,uint256 tokenId) external{
        require(has_deposited[hashima_contract][tokenId], 'No tokens to withdarw');
        require(staking_accounts[hashima_contract][tokenId]==msg.sender,'Only the Staker');
        
        collect(hashima_contract,msg.sender,tokenId);
        ERC721Hashima(hashima_contract).transferFrom(address(this), msg.sender, tokenId);
        
        has_deposited[hashima_contract][tokenId]=false;
    }

    function collect(address hashima_contract,address beneficiary,uint256 tokenId) public{
        uint256 reward = calculateReward(hashima_contract,beneficiary,tokenId);
        checkpoints[hashima_contract][beneficiary][tokenId] = block.number;      
        _mint(msg.sender, reward);
    }

    function hashimaOnStaking(address hashima_contract,uint256 tokenId)public view returns(bool){
        return has_deposited[hashima_contract][tokenId];
    }

    function calculateReward(
        address hashima_contract,
        address beneficiary,uint256 tokenId) 
        public view returns(uint256){

        if(!has_deposited[hashima_contract][tokenId])return 0;
        
        uint256 _stars= ERC721Hashima(hashima_contract).getStars(tokenId);
        uint256 pesoEstrella=_stars*_stars*_stars*10**20/64-_stars;
        uint256 checkpoint = checkpoints[hashima_contract][beneficiary][tokenId];
        return pesoEstrella*(block.number-checkpoint);
    }


    function checkingHash(
    string memory _data,
    string memory _nonce,
    uint256 _tolerance,
    uint256 _stars)private pure returns(bool){
      bytes32 _hashFinal=sha256(abi.encodePacked(_data,_nonce,Strings.toString(_tolerance)));
      bool respuesta=true;

      for (uint256 index = 0; index < _stars; index++) {
      if (_hashFinal[index]!=0x00) {
              respuesta=false;  
          }
      
      }
      return respuesta;

  }

  
}