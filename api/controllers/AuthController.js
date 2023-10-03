const database = require("../models");
const { Op } = require("sequelize");
const {compare } = require("bcryptjs")
const {sign} = require("jsonwebtoken")

class AuthController{
    static async Login(req, res) {
        const { email, senha } = req.body;
    
        try {
            // Verifique se o email existe no banco de dados
            const usuario = await database.usuarios.findOne({
                attributes: ['id', 'email', 'senha'],
                where: { email: email }
            });
    
            if (!usuario) {
                return res.status(404).send("Usuário não encontrado.");
            }
    
            // Compare a senha fornecida com a senha armazenada no banco de dados
            const senhasIguais = await compare(senha, usuario.senha);
    
            if (!senhasIguais) {
                return res.status(401).send("Senha incorreta.");
            }
            const accessToken = sign({
                id:usuario.id,
                email:usuario.email,

            },)
            // Login bem-sucedido
            res.status(200).send("Login bem-sucedido.");
        } catch (error) {
            console.error(error);
            res.status(500).send("Ocorreu um erro durante o login.");
        }
    }
    
}

module.exports = AuthController