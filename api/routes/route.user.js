const express=require('express')
const router=express.Router()
const control=require('../controller/control.users')

router.get('/:address',control.nfts)


router.post('/',control.guardarDatos)


module.exports=router;