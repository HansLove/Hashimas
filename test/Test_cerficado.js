const { expectRevert, time } = require('@openzeppelin/test-helpers');
const Hashima=artifacts.require('Hashima')
const Certificado=artifacts.require('Certificado')


contract("Pruebas Certificado", ([minter, bob, carol, dev, alice])=>{

before (async()=>{
    certificado=await Certificado.deployed()
    // certi=await Certificado.deployed()
    
})


it('Creacion Hashima Certificado:',async()=>{


    for (let index = 0; index < 300; index++) {
        if(index==0) await certificado.initGame()
        if(index==90)await certificado.initGame()
        if(index==180)await certificado.initGame()
        if(index==260)await certificado.initGame()
        let res=await certificado.check(1,'aaron',index.toString(),'ja.com')
        // console.log('res ==>',res.logs[0].args[0])
        
        if(res.logs[0].args[0]){
            // console.log('res certi: ',res.logs[0]) 
            console.log('index: ',index)
            let hashi=await certificado.getHashima(1)
            console.log('hashi: ',hashi)
            break
        }
    }
    

})

}) 
