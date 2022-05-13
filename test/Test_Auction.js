// const Hashima=artifacts.require('Hashima')
// const Auction=artifacts.require('Auction')

// const {
//     time,
//     BN,           // Big Number support
//     constants,    // Common constants, like the zero address and largest integers
//     expectEvent,  // Assertions for emitted events
//     expectRevert, // Assertions for transactions that should fail
//   } = require('@openzeppelin/test-helpers');



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
//     await auction.NewAuction(
//         1,//token ID
//         101,//numero de bloques que dura la Auction(min 100)
//         1//precio minimo
//         )
// })

// it('Obtener tiempo restante antes',async()=>{    
//     let bloquesRestantes=await auction.period(1)
//     console.log('bloques restantes: ',bloquesRestantes.toString())
// })

// it('Ingresar Bid de Alice:',async()=>{    
//     await auction.bid(1,{from:alice,value:200000000})

// })

// it('Checar si esta en subasta',async()=>{    
//     let res=await auction.onAuction(1)
//     console.log('en subasta: ',res)

// })

// it('Ingresar Bid de Bob:',async()=>{    
//     await auction.bid(1,{from:bob,value:210000000})

// })

// it('Finalizar Subasta antes de tiempo:',async()=>{    

//      try {
//         await expectRevert(auction.auctionEnd(1),'no finish yet')

//      } catch (error) {
//          console.log('expect revert: ',error.message)
//      }

// })


// it('Finalizar Subasta en el tiempo indicado:',async()=>{    
//     let ultimoBloque=await time.latestBlock()
//     let old_number=parseInt(ultimoBloque.toString())+101
    
//     await time.advanceBlockTo(old_number)
//     let res=await auction.auctionEnd(1)
//     console.log('minter:',minter,'alice: ',alice,'bob', bob)
//     console.log('resultado Final Bid : ',res.logs[0].args.winner)
// })

// it('Finalizar por segunda vez:',async()=>{    
//     let ultimoBloque=await time.latestBlock()
//     let old_number=parseInt(ultimoBloque.toString())+101
    
//     // await time.advanceBlockTo(old_number)
//     let res=await auction.auctionEnd(1)
//     // console.log('minter:',minter,'alice: ',alice,'bob', bob)
//     console.log('resultado Final Bid : ',res.logs[0].args.winner)
// })

// it('Esta en subasta?:',async()=>{    
//     let ultimoBloque=await time.latestBlock()
//     let old_number=parseInt(ultimoBloque.toString())+101
    
//     await time.advanceBlockTo(old_number)

//     let res=await auction.onAuction(1)
//     console.log('en subasta: ',res)
   
// })

// it('Obtener tiempo restante despues',async()=>{    
//     let bloquesRestantes=await auction.period(1)
//     console.log('bloques restantes: ',bloquesRestantes.toString())
// })

// it('Nadie puso nada, el dueno toma su dinero:',async()=>{    
//     let ultimoBloque=await time.latestBlock()
//     let old_number=parseInt(ultimoBloque.toString())+101
    
//     await time.advanceBlockTo(old_number)
//     let res=await auction.auctionEnd(1)
    
// })

//}) 
