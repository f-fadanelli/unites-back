const instituicao = require('../services/instituicao')

module.exports = function(app){

    app.get('/instituicao', async(req, res)=>{
        await instituicao('find', req, res)
    })

    app.post('/instituicao', async(req, res)=>{
        await instituicao('insert', req, res)
    })

    app.patch('/instituicao', async(req, res)=>{
        await instituicao('update', req, res)
    })

    app.delete('/instituicao/SEQ_INS/:SEQ_INS', async(req, res)=>{
        await instituicao('delete', req, res)
    })

}