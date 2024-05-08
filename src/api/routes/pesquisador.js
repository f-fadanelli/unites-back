const { authorize } = require('../../library/authorization')
const pesquisador = require('../services/pesquisador')

module.exports = function(app){
    app.get('/pesquisador', authorize('find', 'pesquisador'), async(req, res)=>{
        await pesquisador('find', req, res)
    })
}