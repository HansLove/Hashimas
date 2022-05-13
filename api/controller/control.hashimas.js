const sha256=require('crypto-js/sha256')
const Web3=require('web3')
const JsonHashima=require('../build/Hashima.json')

const web3 = new Web3("http://localhost:8545"||Web3.givenProvider)



control={}


control.dameTotal=async(req,res)=>{
    let _contrato=await loadHashima()
    var _res=await _contrato.methods.dameTotal().call()
    console.log('res res : ',_contrato)
    res.status(200).json({
        status:true,
        respuesta:_res
    }) 
}

async function loadHashima(){
    const id=await web3.eth.net.getId()
    const deployedNetwork=JsonHashima.networks[id]
    
    try {
      const contrato=new web3.eth.Contract(
        JsonHashima.abi,
        deployedNetwork.address
        )
      
        return contrato  
    } catch (error) {
      console.log("error en conexion con JHashima: ",error)
      return {}
    }
  
  
  }



control.calcularDatos=async(req,res)=>{
    var _nonce=req.params.nonce
    var _hash=req.params.hash
     
    var hash_resultado=sha256(_hash+_nonce).toString()


    var cont=0
    for (let index = 0; index < hash_resultado.length; index++) {
        if(hash_resultado[index]=='0'){
            cont+=1
        }else{
            break
        }
        
        
    }

    var _objeto=DeterminarFuerza(hash_resultado)

    res.status(200).json({
        status:true,
        originalHash:hash_resultado,
        stars:cont,
        object:_objeto
        
        })
   
}

const DeterminarFuerza=(_hash)=>{

    
    var hash_resultado=''
    hash_resultado=sha256(_hash).toString()
    
    const Ciclo=(_num)=>{
        var new_hash_resultado=sha256(hash_resultado+_num).toString()
        console.log('hash guardado: ',new_hash_resultado)
        var _int2=new_hash_resultado.substring(0,2)
        var _input=parseInt(_int2)
        console.log('input generado: ',_input)
        while (_input.toString()=='NaN') {
            console.log('ya paso')
            hash_resultado=sha256(hash_resultado).toString()
            var _integer=hash_resultado.substring(0,2)
            _input=parseInt(_integer,10)
    
        }
        return _input

    }


    var _attack=100-Ciclo(1)
    var _defense=100-Ciclo(2)
    var _specialDefense=100-Ciclo(3)
    var _specialAttack=100-Ciclo(4)
    var _hp=100-Ciclo(5)
    var _speed=100-Ciclo(6)


    return {attack:_attack,specialAttack:_specialAttack,
        speed:_speed,hp:_hp,
        defense:_defense,
        specialDefense:_specialDefense}

}

module.exports=control;