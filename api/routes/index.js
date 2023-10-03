const bodyParser = require('body-parser');
const usuarios = require('./usuariosRoutes')
const auth = require('./authRoutes')
module.exports = app => {
    app.use(bodyParser.json());
    app.use(auth)
    app.use(usuarios)

}