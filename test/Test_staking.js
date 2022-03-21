// const { expectRevert, time } = require('@openzeppelin/test-helpers');
// const Hashima=artifacts.require('Hashima')
// const StakingHashi=artifacts.require('Hashi')


// contract("Pruebas Hashimas Staking", ([minter, bob, carol, dev, alice])=>{

// before (async()=>{
//     hashima=await Hashima.deployed()
//     staking=await StakingHashi.deployed()
    
// })

// it('Creacion Hashima NFT:',async()=>{
//     // await auction.NewAuction()
//     await hashima.initGame()
//     await hashima.check(1,'aaron','30','ja.com')
    

// })


// it('Aprovamos el Hashima NFT a favor del Staking contract:',async()=>{
//     var _data=await hashima.approve(staking.address,1)
// })

// it('Deposito del NFT en el contrato',async()=>{
//     var _data=await staking.deposit(1)
// })

// it('Preguntamos al contrato si el Hashima esta en Staking',async()=>{
//     var _data=await staking.hashimaOnStaking(1)
//     console.log("Salida Hashima on Staking: ",_data)
// })

// it('Preguntamos al contrato si el Hashima esta en Staking',async()=>{
//     var _data=await staking.calculateReward(minter,1)
//     console.log("Reward obtenido: ",_data.toString())
// })

// it('Avanzado 1 bloque y calculamos new reward',async()=>{
//     await time.advanceBlock()

//     var _data=await staking.calculateReward(minter,1)
//     console.log("Reward obtenido: ",_data.toString())
// })

// it('Avanzado 1 bloque y calculamos new reward',async()=>{
//     await time.advanceBlock()

//     var _data=await staking.calculateReward(minter,1)
//     console.log("Reward obtenido: ",_data.toString())
// })


// it('tomamos lo generado',async()=>{
//     await staking.collect(bob,1)
// })

// it('Balance del dueño',async()=>{
//     var _data=await staking.balanceOf(bob)
//     console.log("Balance usuario: ",_data.toString())
// })

// it('New reward',async()=>{
//     var _data=await staking.calculateReward(minter,1)
//     console.log("Reward obtenido: ",_data.toString())
// })


// it('Retirar Hashima',async()=>{
//     // await staking.withdraw(1,{from:alice})
//     await staking.withdraw(1)
    
// })

// it('Preguntamos al contrato si el Hashima esta en Staking',async()=>{
//     var _data=await staking.hashimaOnStaking(1)
//     console.log("Salida Hashima on Staking: ",_data)
// })

// it('nuevo dueño: ',async()=>{
//     var _data=await hashima.ownerOf(1)
//     console.log("dueño del hashima",_data,
//     "Alice: ",alice)
// })

// }) 