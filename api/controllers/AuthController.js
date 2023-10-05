const { sign } = require("jsonwebtoken");
const database = require("../models");
const { compare } = require("bcryptjs");
const jsonSecret = require("../config/jsonSecret");

class authController {
  static async Login(req, res) {
    const { email, senha } = req.body;
    try {
      const login = await database.usuarios.findOne({
        attributes: ["email", "senha"],
        where: { email: email },
      });

      if (!login) {
        throw new Error("Couldn't find login"); // Corrigido aqui
      }

      const senhasIguais = await compare(senha, login.senha); // Corrigido aqui

      if (!senhasIguais) {
        throw new Error("Couldn't find senha"); // Corrigido aqui
      }

      const accessToken = sign(
        {
          email: login.email,
        },
        jsonSecret.secret,
        {
          expiresIn: 86400,
        }
      );
      return res.status(200).json({ accessToken }); // Corrigido aqui

    } catch (e) {
      return res.status(400).json({ error: e.message });
    }
  }
}

module.exports = authController;
