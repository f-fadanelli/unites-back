const {Router} = require('express')
const routes = new Router()

require('../routes/pesquisador')(routes)
require('../routes/instituicao')(routes)

module.exports = routes;