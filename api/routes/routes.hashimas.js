const express=require('express')
const router=express.Router()
const control=require('../controller/control.hashimas')

// router.get('/:nonce/:hash',control.calcularDatos)

router.get('/:address/:uri',control.verificarPago)
router.get('/',control.dameRandom)





module.exports=router;