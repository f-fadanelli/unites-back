const pesquisador = require('../services/usuario')

module.exports = function(app){
    app.get('/usuario', async(req, res)=>{
        await pesquisador('find', req, res)
    })

    app.get('/usuario/pesquisador', async(req, res)=>{
        await pesquisador('findPesquisadores', req, res)
    })

    app.post('/usuario', async(req, res)=>{
        await pesquisador('insert', req, res)
    })

    app.patch('/usuario', async(req, res)=>{
        await pesquisador('update', req, res)
    })

    app.delete('/usuario/SEQ_USU/:SEQ_USU', async(req, res)=>{
        await pesquisador('delete', req, res)
    })
}