const sha256=require('crypto-js/sha256')
const Web3=require('web3')
const JsonHashima=require('../build/Hashima.json')
const JSONServer=require('../build/Server.json')
const ListHashimas=require('../metodos/Hashimas.json')

const Provider = require('@truffle/hdwallet-provider');

control={}

let modoGanache=false
let local_net="http://localhost:8545"
let binance_test_net='https://data-seed-prebsc-1-s1.binance.org:8545/'


//////////////
const iniciarContratoHashima=async(req,res)=>{

    const pk = process.env.privateKey

    //Networks
    const address_binance_hashima_test='0x86228118158D0EFEc336eB1a6f24dBC7C5b7218A'
        
   
    let provider = new Provider(
        pk, 
        modoGanache?local_net:binance_test_net
        );



    try {
        const web3 = new Web3(provider);
        const id=await web3.eth.net.getId()
        const deployedNetwork=JsonHashima.networks[id]  

        const contrato=new web3.eth.Contract(
            JsonHashima.abi,
            modoGanache?deployedNetwork.address:address_binance_hashima_test
            )
        return contrato
        
    } catch (error) {
        console.log("Error en proveedor nuevo contrato hash: ",error)
        return {}
    }
        
    
}

const iniciarContratoServidor=async(req,res)=>{

    const pk = process.env.privateKey    
    
    let address_binance_server_test='0x1EDb3D109306d322bbB97D0a80A0B77b710e1eF9'

    let provider = new Provider(
        pk, 
        modoGanache?local_net:binance_test_net
        );



    try {
        const web3 = new Web3(provider);
        const id=await web3.eth.net.getId()
        const deployedNetwork=JSONServer.networks[id]
        
        const contrato=new web3.eth.Contract(
            JSONServer.abi,
            modoGanache?deployedNetwork.address:address_binance_server_test
            )
            
        return contrato
        
    } catch (error) {
        console.log("Error en Servidor smart contract backend nuevo contrato hash: ",error)
        return {}
    }
        
    
}

////////////////////////

control.verificarPago=async(req,res)=>{
    var address_user=req.params.address
    // var uri_elegido=req.params.uri

    const public_key='0x63710f05aDEa06dE5100F2721Ddeed4cF2C697BC'

    const serverSmartContract = await iniciarContratoServidor()
    
  
    const HASHIMA_URI=ListHashimas[Math.floor(Math.random() * ListHashimas.length)].img

    const receipt = await serverSmartContract.methods.checkPayment(address_user).call()

    //Verifico que el usuario si pago
    if(receipt[0]){
        //Si el usuario pago, generar Hashima desde el servidor

        var tolerance
        var nonce
        let contratoHashima=await iniciarContratoHashima()
        let dificultad=receipt[1]*2
        let fecha=new Date().toLocaleTimeString()
        var resultado
        var Hashima_ID

        
        let initBackend=await contratoHashima.methods.Init().send({from:public_key})
        tolerance=initBackend.events.GameStart.returnValues[0]
        nonce=await calcularHashimaPower(dificultad,fecha,tolerance)

        

        //1. Genera el Hashima
        try {
            resultado=await contratoHashima.methods.Mint(
                receipt[1],//numero estrellas
                fecha,
                nonce,
                HASHIMA_URI,
                '100000000000000000',
                false
                ).send({from:public_key}) 


            Hashima_ID=resultado.events.Minted.returnValues[2]

            await contratoHashima.methods.approve(serverSmartContract._address,Hashima_ID).send({from:public_key})
            
            //3. Enviar al Contrato Server
            await serverSmartContract.methods.depositHashima(Hashima_ID,address_user).send({from:public_key})
            
                
            res.status(200).json({
                "result":resultado.events.Minted.returnValues[0],
                "id":resultado.events.Minted.returnValues[2],
                "hash":resultado.events.Minted.returnValues[1],
                "paid":receipt[0],
                "stars":receipt[1],
                "uri":receipt[2],
            })

        } catch (error) {
            console.log('error 2: ',error)
        }

  

}


  }







const calcularHashimaPower=async(dificultad,_hash,tolerance)=>{
        var hash_resultado=sha256(_hash)
        var contador=0
        var dificultadHashimas=''
    
       for (let index = 0; index < dificultad; index++) {
            dificultadHashimas+='0'
       }

        while (!hash_resultado.toString().startsWith(dificultadHashimas)) {
            contador++
            var hash_resultado=sha256(_hash+contador.toString()+tolerance)
        }

        return contador.toString()
        

       
    }

module.exports=control;