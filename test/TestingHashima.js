const { expectRevert, time } = require('@openzeppelin/test-helpers');
const { web3 } = require('@openzeppelin/test-helpers/src/setup');
const Hashima=artifacts.require('Hashima')

var assert = require('chai').assert

contract("Pruebas Hashimas", ([minter, bob, carol, dev, alice])=>{

before (async()=>{
    hashima=await Hashima.deployed()
    
})


it('iniciando suscripcion al juego:',async()=>{
    await hashima.Init()
 
})



it('Generar el Hashima:',async()=>{
    let res=await hashima.Init()
    let ciclo=true
    var contador=0

    let altura=res.logs[0].args[0].toString()

    while (ciclo) {
        contador++
        let res=await hashima.checkHash(
            'aaron',
            contador.toString(),//nonce ,
            altura,
            1//numero estrellas
            )
        
 
        if(res[0]){
            console.log('se logro <3',res[1])
            ciclo=false
        }     
    }
 
    await hashima.Mint(
        1,//estrellas
        'aaron',//hash id(has to be unique)
        contador.toString(),//nonce,
        'www.aarondatameta.com',
        120,
        false
        )
   
})



it('Cambiar estado de venta a "For sale" ',async()=>{
    let has=await hashima.getHashima(1)
    console.log("ForSale antes: ",has.forSale)

    await hashima.toggleForSale(1)

    let has2=await hashima.getHashima(1)
    console.log("ForSale despues: ",has2.forSale)


})


it('Comprar Hashima con "buyToken" (Alice) y verificar actualizacion dueños',async()=>{

    await hashima.buyToken(1,{from:alice,value:260})
 
})

it('Checar cantidades Alice y Minter',async()=>{

    let balance=await hashima.balanceOf(alice)
    let balance2=await hashima.balanceOf(minter)
    
    console.log('balance Alice; ',balance.toString(),
    'Balance Minter: ',balance2.toString())

})

it('Trasferir de Alice a Bob',async()=>{

    await hashima.safeTransferFrom(alice,bob,1,{from:alice})
    let has=await hashima.getHashima(1)
 
    
    try {
        assert.equal(has.currentOwner, alice, 'Its not bob');  

    } catch (error) {
        console.log(error.message)
    }
})


}) 
