const Motorista = require('../models/Motorista')

const cryptoJs = require('crypto-js')
const CHAVE_SECRETA = 'segredo'


const cadastrar = async(req,res)=>{
    const valores = req.body

    if(!valores.nome || !valores.cnh || !valores.cpf || !valores.telefone){
        return res.status(404).json({message:'Preenhca todos os dados'})
    }

    try{
        const cpfCriptografado = cryptoJs.AES.encrypt(valores.cpf,CHAVE_SECRETA).toString()
        const cnhCriptografado = cryptoJs.AES.encrypt(valores.cnh,CHAVE_SECRETA).toString()

        await Motorista.create({
            nome:valores.nome,
            cnh:cnhCriptografado,
            cpf:cpfCriptografado
        })
        return res.status(201).json({message:'cadastro concluído'})
    }catch(err){
        return res.status(500).json({message:'Não foi possível cadastrar'})
    }
}

module.exports = {cadastrar}