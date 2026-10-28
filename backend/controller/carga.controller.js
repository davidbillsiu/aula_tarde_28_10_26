const Carga = require('../models/Carga')

const cadastrar = async(req,res)=>{
    const valores = req.body

    if(!valores.descricao || !valores.peso || !valores.volume || !valores.codRastreio){
        return res.status(404).json({message:'Preenhca todos os dados'})
    }

    try{
       await Carga.create()
        return res.status(201).json({message:'cadastro concluído'})
    }catch(err){
        return res.status(500).json({message:'Não foi possível cadastrar'})
    }
}

module.exports = {cadastrar}