const { Router } = require("express");
const UsuariosController = require("../controllers/UsuariosController");
const router = Router();

router
  .get("/usuarios", UsuariosController.listaUsuarios)
  .get("/usuarios/:id", UsuariosController.listaUsuario)
  .put("/usuarios/:id", UsuariosController.editaUsuario)
  .post("/usuarios", UsuariosController.cadastraUsuario)
  .delete("/usuarios/id/:id");

module.exports = router;
