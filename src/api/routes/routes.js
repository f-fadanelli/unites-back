const {Router} = require('express')
const routes = new Router()

require('../routes/pesquisador')(routes)

module.exports = routes;