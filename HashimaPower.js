const sha256=require('crypto-js/sha256')

function hashimaPower(dificultad,_hash){

    var hash_resultado=sha256(_hash)

    var contador=0
    var dificultadHashimas=''

   for (let index = 0; index < dificultad; index++) {
        dificultadHashimas+='0'
       
   }
  

    while (!hash_resultado.toString().startsWith(dificultadHashimas)) {
        contador++
        console.log('Try out #',contador)
        hash_resultado=sha256(_hash+contador.toString())
    }
    console.log(hash_resultado.toString())
 


   
}

hashimaPower(5,'hashima structure')