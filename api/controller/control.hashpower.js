const User=require('../models/model.user')
const sha256=require('crypto-js/sha256')
const Web3=require('web3')


control={}

control.hashPower=async(req,res)=>{
    var dificultad=req.params.diff
    var _hash=req.params.hash
    var tolerance=req.params.tolerance
     
    var hash_resultado=sha256(_hash)
    

    var hash_resultado_original=sha256(_hash)

    var contador=0
    var dificultadHashimas=''

   for (let index = 0; index < dificultad; index++) {
        dificultadHashimas+='0'
       
   }
    console.log('tolerance:' ,tolerance.toString())
    while (!hash_resultado.toString().startsWith(dificultadHashimas)) {
        contador++
        var hash_resultado=sha256(_hash+contador.toString()+tolerance)
    }
    console.log('HASH final: ',hash_resultado.toString())
    

    res.status(200).json({
        status:true,
        estrellas:dificultad,
        originalHash:hash_resultado_original.toString(),
        hash:hash_resultado.toString(),
        nonce: contador.toString()
        })
   
}

// const CheckContractId=async(_id)=>{
//     var _contrato=await loadHashLockContract()
//     var _resultado=_contrato.methods.getContract(_id).call()
//     console.log('resultado del contrato: ',_resultado)
// }

// const loadHashLockContract=async() =>{
//     const id=await web3.eth.net.getId()
//     const deployedNetwork2=ContractHashJSON.networks[id]

//     const hash_time_contrato=new web3.eth.Contract(
//         ContractHashJSON.abi,
//         deployedNetwork2.address
//     )

//     return  hash_time_contrato


// }

control.guardarDatos=async(req,res)=>{
    const nuevo=new User(req.body)
    await nuevo.save()
    .then(docs=>{
        
        res.status(200).json({
            data:docs
        })
    })
}

 
module.exports=control;