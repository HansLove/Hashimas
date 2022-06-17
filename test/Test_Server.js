// const { expectRevert, time } = require('@openzeppelin/test-helpers');
// const Hashima=artifacts.require('Hashima')
// const Server=artifacts.require('Server')



// contract("Pruebas Creacion Hashima", ([minter, bob, carol, dev, alice])=>{

// before (async()=>{
//     hashima_classic=await Hashima.deployed()
//     server=await Server.deployed()
    
// })


// it('El usuario paga el servicio: ',async()=>{
//     await server.payServer(2,'www.ji.com',{from:alice,value:210000090000000000})
// })

// it('El servidor genera el Hashima:',async()=>{
//     let res=await hashima_classic.Init()
//     let ciclo=true
//     var contador=0

//     let altura=res.logs[0].args[0].toString()

//     while (ciclo) {
//         contador++
//         let res=await hashima_classic.checkHash(
//             'aaron',
//             contador.toString(),//nonce ,
//             altura,
//             1//numero estrellas
//             )
        
 
//         if(res[0]){
//             console.log('se logro <3',res[1])
//             ciclo=false
//         }     
//     }
 
//     await hashima_classic.Mint(
//         1,//estrellas
//         'aaron',//hash id(has to be unique)
//         contador.toString(),//nonce,
//         'www.aarondatameta.com',
//         120,
//         false
//         )
   
// })

// it('Servidor verifica el deposito',async()=>{
//     let respuesta_bool=await server.checkPayment(alice)
//     console.log('bool verificacion: ',respuesta_bool[0])
// })


// it('Servidor deposita Hashima en contrato',async()=>{
//     await hashima_classic.approve(server.address,1)
//     await server.depositHashima(1,alice,{from:minter})

// })

// it('Alicia verifica su Hashima',async()=>{
//     let own=await hashima_classic.ownerOf(1)
//     console.log(own,'alice: ',alice)
// })

// it('Alicia reclama su Hashima',async()=>{
//     let hashimaOwner=await hashima_classic.ownerOf(1)
//     console.log(hashimaOwner,'alice: ',alice,'minter: ',minter)
// })


// }) 