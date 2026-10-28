const Funcionario = require('../models/Funcionario')
const cryptoJs = require('crypto-js')
const CHAVE_SECRETA ='segredo'

const login = async(req,res)=>{
    const valores = req.body

    if(!valores.email || !valores.senha){
        return res.status(404).json({message:'Preencha todos os dados'})
    }
    
    try{
        const funcionario = await Funcionario.findOne({where:{email:valores.email}})

        if(!funcionario){
            return res.status(404).json({message:'Email não foi encontrado'})
        }

        const bytes = cryptoJs.AES.decrypt(valores.senha,CHAVE_SECRETA)
        const senhaDescriptografada = bytes.toString(cryptoJs.enc.Utf8)

        if(valores.senha !== senhaDescriptografada){
            return res.status(401).json({message:'Senha incorreta'})
        }

        const tresHorasEmMs = 3 * 60 * 60 * 1000
        const tempoExpiracao = Date.now() + tresHorasEmMs


        const payload = {
            idFuncionario:funcionario.idFuncionario,
            nome:funcionario.nome,
            expiraEm:tempoExpiracao
        }

        const token = cryptoJs.AES.encrypt(JSON.toString(payload),CHAVE_SECRETA).toString()

        return res.status(200).json({
            message:'Cliente cadastrado',
            token:token,
            nome:funcionario.nome
        })
    }catch(err){
        return res.status(500).json({message:'Erro ao login'})
    }
}

module.exports = {login}