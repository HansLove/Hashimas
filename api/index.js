const express=require('express')
const app=express()
const bodyParser=require('body-parser')
const morgan=require('morgan')
var cors = require('cors')


// const{mongoose}=require('./database')
require('./database')

app.use(morgan('dev'))
app.use(cors())

app.set('port',5001)

const ruta1=require('./routes/route.hashpower')
const ruta2=require('./routes/routes.hashimas')
const ruta3=require('./routes/route.user')


// app.use(bodyParser.urlencoded({ extended: true, limit: '10000000mb'})); 
app.use(bodyParser.urlencoded({ extended: true, limit: '10000000mb'})); 

app.use(express.static('./lib/views/'));
app.use(express.json())

app.use('/hashima',ruta1)
app.use('/data',ruta2)
app.use('/user',ruta3)




app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-Headers','Origin,X-Requested-With, Content-Type, Accept,Authorization')

    if(req.method==='OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET')
        return res.status(200).json({})
    }
    next()
})

app.listen(app.get('port'),()=>{
    console.log("Servidor en puerto: ",app.get('port'))
})