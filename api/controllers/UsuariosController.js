const database = require("../models");
const { hash } = require("bcryptjs");

class UsuariosController {
  static async listaUsuarios(req, res) {
    try {
      const users = await database.usuarios.findAll({});

      res.json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async listaUsuario(req, res) {
    const { id } = req.params;
    try {
      const listaUsuario = await database.usuarios.findOne({
        where: { id: id },
      });
      res.status(200).send(listaUsuario);
    } catch (error) {
      res.status(500).send("Ocorreu um erro durante o chamado do usuário.");
    }
  }

  static async cadastraUsuario(req, res) {
    const { nome, email, senha } = req.body;
    try {
      // Verifique se o email já existe no banco de dados
      const usuarioExistente = await database.usuarios.findOne({
        where: { email: email },
      });

      // Se um usuário com o mesmo email já existe, retorne um erro
      if (usuarioExistente) {
        return res.status(400).send("O email já está em uso.");
      }

      // Se o email não existe, prossiga com o cadastro
      const senhaHash = await hash(senha, 8);
      const novoUsuario = await database.usuarios.create({
        nome: nome,
        email: email,
        senha: senhaHash,
      });

      res.status(200).send(novoUsuario);
    } catch (error) {
      console.error(error); // Registre o erro para depuração
      res.status(500).send("Ocorreu um erro durante o cadastro do usuário.");
    }
  }

  static async editaUsuario(req, res) {
    const { id } = req.params;
    const { nome, senha, email } = req.body;

    try {
      // Lembre-se de hash a nova senha, se necessário
      const senhaHash = senha ? await hash(senha, 8) : undefined;

      // Atualize o nome, a senha e o email diretamente no banco de dados
      await database.usuarios.update(
        { nome, senha: senhaHash, email },
        { where: { id: id } }
      );

      res.status(200).send("Dados do usuário atualizados com sucesso");
    } catch (error) {
      console.error(error);
      res.status(500).send("Ocorreu um erro durante a edição do usuário.");
    }
  }
  
  static async excluiUsuario(req,res) {
    const {id} = req.params
    try{
      const excluiUsuario = await database.usuarios.delete({
        where: { id: id },
      });
      res.status(200).send(excluiUsuario);
    }catch(error){

    }
  }
}

module.exports = UsuariosController;
