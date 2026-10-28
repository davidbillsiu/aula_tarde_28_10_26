const express = require('express')
const app = express()
const cors = require('cors')

const hostname = 'localhost'
const PORT = 3000

const conn = require('./db/conn')

require('./models/rel')

const authController = require('./controller/auth.controller')
const cargaController = require('./controller/carga.controller')
const entregaController = require('./controller/entrega.controller')
const funcionarioController = require('./controller/funcionario.controller')
const motoristaController = require('./controller/motorista.controller')
const authMiddleware = require('./middleware/auth.midleware')

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

app.post('/funcionario', funcionarioController.cadastrar)
app.post('/login', authController.login)


app.get('/', (req,res)=>{
    res.status(200).json({message:'Aplicação rodando'})
})

app.use(authMiddleware)

app.post('/motorista', motoristaController.cadastrar)
app.post('/entrega',entregaController.cadastrar)
app.post('/carga',cargaController.cadastrar)

conn.sync()
.then(()=>{
    app.listen(hostname,PORT,()=>{
        console.log(`Servidor Rodando em http://${hostname}:${PORT}`)
    })
}).catch((err)=>{
    console.error('Erro ao rodar o servidor', err)
})