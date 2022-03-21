// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './Hashima.sol';


contract Auction {
  
    // Allowed withdrawals of previous bids
    mapping(address => uint) pendingReturns;

    struct StructAuction {
        uint256 periodoSubasta; //periodo de subasta en numero de bloques
        uint256 minPrice;//en wei
        uint256 nftHighestBid;//la apuesta mas grande 
        address nftHighestBidder;
        address nftSeller;
        bool active;

    }

    mapping(uint256=>bool) hashimaOnAction;
    mapping(uint256=>StructAuction) auctions;

    // Events that will be emitted on changes.
    event HighestBidIncreased(address bidder, uint amount);
    event AuctionEnded(address winner, uint amount);


    Hashima private hashima;

    constructor(Hashima _hashima){
        hashima=_hashima;
    }

    modifier isHashimaOwner(uint256 tokenId){
        address _owner=hashima.ownerOf(tokenId);
        require(_owner==msg.sender,'Only the hashima owner can do it');
        _;
    }


    function NewAuction(uint256 tokenId,uint256 _tolerance,
        uint256 _minPrice)isHashimaOwner(tokenId) public{
        require (msg.sender == hashima.ownerOf(tokenId), 'Sender must be owner');
        require(!hashimaOnAction[tokenId],'this hashima is on bid');
        
        StructAuction memory _newAuction=StructAuction(
            block.number+_tolerance,
            _minPrice,
            0,
            address(0),
            msg.sender,
            true
            );

        auctions[tokenId]=_newAuction;
        hashimaOnAction[tokenId]=true;

        
        bool forSale=hashima.getHashima(tokenId).forSale;
        if(forSale){
            hashima.toggleForSale(tokenId,0);
        }
        hashima.transferFrom(msg.sender, address(this), tokenId);
        
    }


    function bid(uint256 tokenId) public payable {
        StructAuction memory _auction=auctions[tokenId];
        uint256 blockTime=_auction.periodoSubasta;
        uint256 _highestBid=_auction.nftHighestBid;
        address _high_bidder=_auction.nftHighestBidder;

        require(block.number <= blockTime,"Auction already ended");
        require(msg.value > _highestBid,"There already is a higher bid.");

        if (_highestBid != 0) {
            pendingReturns[_high_bidder] += _highestBid;
        }

        _auction.nftHighestBidder = msg.sender;
        _auction.nftHighestBid= msg.value;

        auctions[tokenId]=_auction;
        emit HighestBidIncreased(msg.sender, msg.value);
    }

    /// Withdraw a bid that was overbid.
    function withdraw() public returns (bool) {
        uint amount = pendingReturns[msg.sender];
        if (amount > 0) {    
            pendingReturns[msg.sender] = 0;
            (bool _answer,)=payable(msg.sender).call{value:amount}("");
            if (!_answer) {
                // No need to call throw here, just reset the amount owing
                pendingReturns[msg.sender] = amount;
                return false;
            }
        }
        return true;
    }

    //esta funciona la llama el usuario al termionar el tiempo de subasta
    function auctionEnd(uint256 tokenId) public returns(bool){
        StructAuction memory _auction=auctions[tokenId];
        address _highestBidder=_auction.nftHighestBidder;
        address _nftSeller=_auction.nftSeller;
        uint256 _high_bid=_auction.nftHighestBid;
        bool activo=_auction.active;
        uint256 block_time=_auction.periodoSubasta;

        require(block.timestamp >= block_time, "Auction not yet ended.");
        require(activo, "auctionEnd has already been called.");

        _auction.active=false;
        auctions[tokenId]=_auction;
        hashimaOnAction[tokenId]=false;
        
        emit AuctionEnded(_highestBidder, _high_bid);

        (bool sent, ) = _nftSeller.call{value: _high_bid}("");
        if(sent){
            hashima.transferFrom(address(this), _highestBidder, tokenId);
        }
        return sent;
    }
}