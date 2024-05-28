const pesquisador = require('../services/pesquisador')

module.exports = function(app){
    app.get('/pesquisador', async(req, res)=>{
        await pesquisador('find', req, res)
    })
}