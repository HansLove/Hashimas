// const { expectRevert, time } = require('@openzeppelin/test-helpers');
// const { web3 } = require('@openzeppelin/test-helpers/src/setup');
// const Hashima=artifacts.require('Hashima')
// const StakingHashi=artifacts.require('Hashi')
// const OtherSide=artifacts.require('OtherSide')

// // var assert = require('chai').assert

// contract("Pruebas Creacion Hashima", ([minter, bob, carol, dev, alice])=>{

// before (async()=>{
//     hashima_classic=await Hashima.deployed()
//     staking=await StakingHashi.deployed()
//     otherSide=await OtherSide.deployed()
    
// })


// it('iniciando suscripcion al juego hashima:',async()=>{
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
//             // console.log('se logro <3')
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




// it('Staking approve Hashima: ',async()=>{
//     await hashima_classic.approve(staking.address,1)  
//     await staking.deposit(1)
//     await time.advanceBlock()
//     let reward=await staking.calculateReward(minter,1)
//     console.log('reward: ',reward.toString())

//     await staking.collect(hashima_classic.address,1)
//     let balance=await staking.balanceOf(minter)
//     let totalSupply1=await staking.totalSupply()
//     console.log(
//         'Balance: ',balance.toString(),
//         'total supply before: ',totalSupply1.toString())

// })




// it('Activar Other Side',async()=>{

//     await staking.approve(otherSide.address,600)  

//     var salida=true
//     var contador=0
//     var out
//     while (salida) {
//         contador++
        
//         try {
//             out=await otherSide.deposit(1)
//             // console.log('Hash generado ',out.logs[1])
//             // console.log('out_ ',out.logs[2].args[1])
//             salida=!out.logs[1].args[1]

            

//         } catch (error) {
//             console.log('error deposito other side: ',error)
//         }

//         // console.log('amount: ',out.logs[3].args[0].toString(),
//         // 'puzzle solve: ',out.logs[3].args[1].toString(),
//         // 'hash: ',out.logs[3].args[2].toString(),
//         // 'contador: ',contador)
       
        
//         // salida=false
        
//     }
    
//     let new_balance=await staking.balanceOf(minter)
//     let totalSupply2=await staking.totalSupply()

//     console.log(
//         'New Balance: ',new_balance.toString(),
//     'total supply after: ',totalSupply2.toString(),
//     'contador: ',contador, 
//     // 'hash resultado',out.logs[3].args[2].toString()
//     )


// })

// }) 