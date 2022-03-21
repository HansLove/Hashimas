const express=require('express')
const router=express.Router()
const control=require('../controller/control.hashpower')

router.get('/:diff/:hash',control.hashPower)


router.post('/',control.guardarDatos)


module.exports=router;