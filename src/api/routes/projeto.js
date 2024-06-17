const projeto = require('../services/projeto')

module.exports = function(app){

    app.get('/projeto', async(req, res)=>{
        await projeto('find', req, res)
    })

    app.post('/projeto', async(req, res)=>{
        await projeto('insert', req, res)
    })

    app.patch('/projeto', async(req, res)=>{
        await projeto('update', req, res)
    })

    app.delete('/projeto/SEQ_PRO/:seq_pro', async(req, res)=>{
        await projeto('delete', req, res)
    })

    app.get('/projeto/SEQ_USU/:seq_usu', async(req, res)=>{
        await projeto('findBySeq_Usu', req, res)
    })

    app.get('/projeto/SEQ_PES/:seq_pes', async(req, res)=>{
        await projeto('findBySeq_Pes', req, res)
    })

    app.get('/projeto/SEQ_PRO/:seq_pro', async(req, res)=>{
        await projeto('findBySeq_Pro', req, res)
    })

}