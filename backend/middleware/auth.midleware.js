const cryptoJs = require('crypto-js')
const CHAVE_SECRETA = 'segredo'

function authMiddleware(req,res,next){
    const token = req.headers['authorization']

    if(!token){
        return res.status(404).json({message:'token inexistente'})
    }

    try{
        const bytes = cryptoJs.AES.decrypt(token,CHAVE_SECRETA)
        const dadosDescriptografados = bytes.toString(cryptoJs.enc.Utf8)

        if(!dadosDescriptografados){
            return res.status(401).json({message:'acesso negado sem token'})
        }

        const payload = JSON.parse(dadosDescriptografados)

        if(Date.now > payload.expiraEm){
            return res.status(401).json({message:'Tempo expirado faça login novamente'})
        }

        req.usuario = payload
        next()
    }catch(err){
        return res.status(500).json({message:'Não foi possível o token'})
    }
}

module.exports = authMiddleware