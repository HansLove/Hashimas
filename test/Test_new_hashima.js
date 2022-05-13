const { expectRevert, time } = require('@openzeppelin/test-helpers');
// const { web3 } = require('@openzeppelin/test-helpers/src/setup');
const NewHashima=artifacts.require('NewHashima')
const Hashima=artifacts.require('Hashima')
const NoHashima=artifacts.require('NoHashima')
const StakingHashi=artifacts.require('Hashi')

// var assert = require('chai').assert

contract("Pruebas new new_hashimas", ([minter, bob, carol, dev, alice])=>{

before (async()=>{
    new_hashima=await NewHashima.deployed()
    no_hashima=await NoHashima.deployed()
    hashima_classic=await Hashima.deployed()
    staking=await StakingHashi.deployed()
    
})


it('iniciando suscripcion al juego hashima 1:',async()=>{
    let res=await hashima_classic.Init()
    let ciclo=true
    var contador=0

    let altura=res.logs[0].args[0].toString()

    while (ciclo) {
        contador++
        let res=await hashima_classic.checkingHash(
            'aaron',
            contador.toString(),//nonce ,
            altura,
            1//numero estrellas
            )
        
 
        if(res[0]){
            console.log('se logro <3',res[1])
            // console.log('se logro <3')
            ciclo=false
        }     
    }
 
    let res2=await hashima_classic.Mint(
        1,//estrellas
        'aaron',//hash id(has to be unique)
        contador.toString(),//nonce
        )
    // console.log('respuesta Mint: ',res2.logs[0].args)
})


it('Staking approve Hashima: ',async()=>{
    await hashima_classic.approve(staking.address,1)  
    await staking.deposit(hashima_classic.address,1)
    await time.advanceBlock()
    let reward=await staking.calculateReward(hashima_classic.address,minter,1)
    console.log('reward: ',reward.toString())
})




}) 