const empresa = require('../services/empresa')

module.exports = function(app){

    app.get('/empresa', async(req, res)=>{
        await empresa('find', req, res)
    })

    app.post('/empresa', async(req, res)=>{
        await empresa('insert', req, res)
    })

    app.patch('/empresa', async(req, res)=>{
        await empresa('update', req, res)
    })

    app.delete('/empresa/SEQ_EMP/:seq_emp', async(req, res)=>{
        await empresa('delete', req, res)
    })

}