const usuario = require('../services/usuario')

module.exports = function(app){

    app.get('/usuario/login/COD_CPF_USU/:COD_CPF_USU/COD_SENHA_USU/:COD_SENHA_USU', async(req, res)=>{
        await usuario('findLogin', req, res)
    })

    app.get('/usuario', async(req, res)=>{
        await usuario('find', req, res)
    })

    app.get('/usuario/pesquisador', async(req, res)=>{
        await usuario('findPesquisadores', req, res)
    })

    app.post('/usuario', async(req, res)=>{
        await usuario('insert', req, res)
    })

    app.patch('/usuario', async(req, res)=>{
        await usuario('update', req, res)
    })

    app.delete('/usuario/SEQ_USU/:SEQ_USU', async(req, res)=>{
        await usuario('delete', req, res)
    })
}