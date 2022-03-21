const User=require('../models/model.user')
// const sha256=require('crypto-js/sha256')

control={}

control.nfts=async(req,res)=>{
    const respuesta=await User.find()
    res.status(200).json({
        data:respuesta
    })

control.dameUnInsumo=async(req,res)=>{
    const respuesta=await Insumo.find({hash:req.params.hash})
    res.status(200).json({
        data:respuesta
    })
}

control.editarInsumo=async(req,res)=>{
    
    var _obj=Object.assign(req.body, {hash:_hash});
    await Insumo.findByIdAndUpdate(req.params.hash,_obj).then(result=>{
        res.status(200).json({
            new:result,
            status:true
        })
    })
    //await Producto.updateOne(filter,req.body)
    
    
    
}

   
}


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