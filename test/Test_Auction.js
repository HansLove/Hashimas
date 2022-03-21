// const { expectRevert, time } = require('@openzeppelin/test-helpers');
// const Hashima=artifacts.require('Hashima')
// const Auction=artifacts.require('Auction')



// contract("Pruebas Auction", ([minter, bob, carol, dev, alice])=>{

// before (async()=>{
//     hashima=await Hashima.deployed()
//     auction=await Auction.deployed()
    
// })


// it('Creacion Hashima NFT:',async()=>{
//     await hashima.initGame()
//     await hashima.check(1,'aaron','30','ja.com')
    

// })



// it('Generacion subasta',async()=>{
//     await hashima.approve(auction.address,1)
//     await auction.NewAuction(1,
//         4,//numero de bloques que dura la Auction
//         1)
// })


// // it('Dueños:',async()=>{    
// //     let owner=await hashima.getHashima(1)
// //     console.log('dueño actual hashima 1:',owner)
// //     console.log('address contrato auction: ',auction.address)

// // })

// it('Ingresar Bid de Alice:',async()=>{    
//     await auction.bid(1,{from:alice,value:200000000})

// })

// it('Ingresar Bid de Bob:',async()=>{    
//     await auction.bid(1,{from:bob,value:210000000})

// })


// // it('Ingresar Bid de Carol menor a la anterior:',async()=>{    
// //     await auction.bid(1,{from:carol,value:20000000})

// // })


// it('Finalizar Bid:',async()=>{    
//     await time.advanceBlock()

//     let res=await auction.auctionEnd(1)
//     // console.log('address auction contract: ',auction.address)
//     console.log('resultado Final Bid : ',res.logs[0].args.winner)
//     console.log('cuenta alice: ',alice,
//     'cuenta bob: ',bob)


// })


// it('Dueño final:',async()=>{    
//     let owner=await hashima.getHashima(1)
//     console.log('dueño actual hashima 1:',owner)
//     console.log('address contrato auction: ',auction.address)

// })
// }) 
