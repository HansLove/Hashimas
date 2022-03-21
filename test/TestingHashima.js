const { expectRevert, time } = require('@openzeppelin/test-helpers');
const { web3 } = require('@openzeppelin/test-helpers/src/setup');
const Hashima=artifacts.require('Hashima')


contract("Pruebas Hashimas", ([minter, bob, carol, dev, alice])=>{

before (async()=>{
    hashima=await Hashima.deployed()
    
})


it('iniciando suscripcion al juego:',async()=>{
    var _data=await hashima.initGame()
    // var _hashContrato=_data.logs[0].args['0']
    // console.log("data obtenida al iniciar juego",_hashContrato)

  


})

it('Creacion Hashima NFT:',async()=>{
    await hashima.check(1,'aaron','30','ja.com')
    

})
it('Cambiar estado de venta a "For sale" ',async()=>{
    await hashima.toggleForSale(1,25)

    let has=await hashima.getHashima(1)
    console.log("ForSale: ",has.forSale,'owner:',has.currentOwner)


})

it('Comprar Hashima con "buyToken" y verificar actualizacion dueños',async()=>{

    await hashima.buyToken(1,{from:alice,value:260})
    let has=await hashima.getHashima(1)
    console.log("currentowner: ",has.currentOwner,'forSale',has.forSale,
    'previus: ',has.previousOwner,'alice: ',alice)

    let owner=await hashima.ownerOf(1)
    console.log('owner: ',owner)
   

})

it('Transferir Hashima con "transferFrom" y verificar actualizacion dueños',async()=>{

    let owner=await hashima.ownerOf(1)
    console.log('owner: ',owner)
    let balance=await hashima.balanceOf(alice)
    let balance2=await hashima.balanceOf(minter)
    
    console.log('balance Hashimas Alice; ',balance.toString(),'minter: ',balance2.toString())
    

})
}) 
