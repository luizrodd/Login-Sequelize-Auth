const express = require('express')
const routes = require('./api/routes')  
  const app = express()
  const port = 8000
  
  routes(app)


app.listen(port, () =>console.log('Graças a deus conectou'))

module.exports = app