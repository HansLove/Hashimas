const mongoose=require('mongoose')

const clienteSchema=mongoose.Schema({
    address:{type:String,required:true,unique:true},
    coleccion:[]
})

module.exports=mongoose.model('Address',clienteSchema)