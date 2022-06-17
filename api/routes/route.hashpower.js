const express=require('express')
const router=express.Router()
const control=require('../controller/control.hashpower')

router.get('/:diff/:hash/:tolerance',control.hashPower)





module.exports=router;