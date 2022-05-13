// const { expectRevert, time } = require('@openzeppelin/test-helpers');
// const { web3 } = require('@openzeppelin/test-helpers/src/setup');
// const Hashima=artifacts.require('Hashima')
// const NewHashima=artifacts.require('NewHashima')

// var assert = require('chai').assert

// contract("Pruebas Hashimas", ([minter, bob, carol, dev, alice])=>{

// before (async()=>{
//     hashima=await Hashima.deployed()
//     new_hashima=await NewHashima.deployed()
    
// })


// it('iniciando suscripcion al juego:',async()=>{
//     await hashima.initGame()
//     await new_hashima.initGame()
// })


// it('Creacion Hashima NFT con numero de estrellas negativo:',async()=>{
//     try{
//         await expectRevert(
//             hashima.check(
//                -1,//estrellas
//                'aaron',//hash id(has to be unique)
//                '30',//nonce
//                'ja.com'//uri attaching data
//                ),'no pueden ser estrellas negativas')

        
//     } catch (error) {
//         console.log(error.message)
//     }


// })

// it('Creacion Hashima NFT con nonce equivocado:',async()=>{
//     try {

//         await expectRevert(
//             hashima.check(
//                1,//estrellas
//                'aaron',//hash id(has to be unique)
//                '29',//nonce
//                'ja.com'//uri attaching data
//                ),'nonce incorrecto')

        
//     } catch (error) {
//         console.log(error.message)
//     }

    

// })

// it('Creacion Hashima NFT exitoso: ',async()=>{
//         hashima.check(
//         1,//estrellas
//         'aaron',//hash id(has to be unique)
//         '30',//nonce
//         'ja.com'//uri attaching data
//         )

//         new_hashima.check(
//             1,//estrellas
//             'aaron',//hash id(has to be unique)
//             '30',//nonce
//             'ja.com'//uri attaching data
//             )
        

// })

// it('Cambiar estado de venta a "For sale" ',async()=>{
//     let has=await hashima.getHashima(1)
//     console.log("ForSale antes: ",has.forSale)

//     await hashima.toggleForSale(1,25)

//     let has2=await hashima.getHashima(1)
//     console.log("ForSale despues: ",has2.forSale)


// })


// it('Comprar Hashima con "buyToken" (Alice) y verificar actualizacion dueños',async()=>{

//     await hashima.buyToken(1,{from:alice,value:260})
//     // let has=await hashima.getHashima(1)

//     // assert.equal(has.currentOwner, alice, 'Its not Alice');  

// })

// it('Checar cantidades Alice y Minter',async()=>{

//     let balance=await hashima.balanceOf(alice)
//     let balance2=await hashima.balanceOf(minter)
    
//     console.log('balance Alice; ',balance.toString(),
//     'Balance Minter: ',balance2.toString())

// })

// it('Trasferir de Alice a Bob',async()=>{

//     await hashima.safeTransferFrom(alice,bob,1,{from:alice})
//     let has=await hashima.getHashima(1)
 
    
//     try {
//         assert.equal(has.currentOwner, alice, 'Its not bob');  

//     } catch (error) {
//         console.log(error.message)
//     }
// })


// }) 
