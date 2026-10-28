const Entrega = require('../models/Entrega')

const cadastrar = async(req,res)=>{
    const valores = req.body

    if(!valores.cidade || !valores.status || !valores.data || !valores.hora){
        return res.status(404).json({message:'Preenhca todos os dados'})
    }

    try{
       await Entrega.create()
        return res.status(201).json({message:'cadastro concluído'})
    }catch(err){
        return res.status(500).json({message:'Não foi possível cadastrar'})
    }
}

module.exports = {cadastrar}