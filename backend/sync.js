const {Motorista, Funcionario, Carga, Entrega} = require('./models/rel')
const conn = require('./db/conn')

async function syncDataBase(){
    try{
        await conn.sync({force:true})
        console.log('Banco sincronizando')
    }catch(err){
        console.error('Erro ao sincronizar o banco  ', err)
    }finally{
        await conn.close()
        console.log('Banco fechando')
    }
}

syncDataBase()