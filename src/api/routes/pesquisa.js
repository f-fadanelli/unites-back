const pesquisa = require('../services/pesquisa')

module.exports = function(app){

    app.get('/pesquisa', async(req, res)=>{
        await pesquisa('find', req, res)
    })

    app.post('/pesquisa', async(req, res)=>{
        await pesquisa('insert', req, res)
    })

    app.patch('/pesquisa', async(req, res)=>{
        await pesquisa('update', req, res)
    })

    app.delete('/pesquisa/SEQ_PES/:seq_pes', async(req, res)=>{
        await pesquisa('delete', req, res)
    })

    app.get('/pesquisa/SEQ_PES/:seq_pes', async(req, res)=>{
        await pesquisa('findBySeq_Pes', req, res)
    })

    app.get('/pesquisa/SEQ_USU/:seq_usu', async(req, res)=>{
        await pesquisa('findBySeq_Usu', req, res)
    })

    app.get('/pesquisa/SEQ_PRO/:seq_pro', async(req, res)=>{
        await pesquisa('findBySeq_Pro', req, res)
    })
}