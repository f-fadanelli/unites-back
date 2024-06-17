const {Router} = require('express')
const routes = new Router()

require('../routes/usuario')(routes)
require('../routes/instituicao')(routes)
require('../routes/grau')(routes)
require('../routes/area')(routes)
require('../routes/empresa')(routes)
require('../routes/projeto')(routes)
require('../routes/financiamento')(routes)
require('../routes/pesquisa')(routes)

module.exports = routes;