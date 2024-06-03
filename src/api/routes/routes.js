const {Router} = require('express')
const routes = new Router()

require('../routes/usuario')(routes)
require('../routes/instituicao')(routes)
require('../routes/grau')(routes)
require('../routes/area')(routes)

module.exports = routes;