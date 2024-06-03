const area = require('../services/area')

module.exports = function(app){

    app.get('/areaAcademica', async(req, res)=>{
        await area('find', req, res)
    })

    app.post('/areaAcademica', async(req, res)=>{
        await area('insert', req, res)
    })

    app.patch('/areaAcademica', async(req, res)=>{
        await area('update', req, res)
    })

    app.delete('/areaAcademica/SEQ_ARE/:SEQ_ARE', async(req, res)=>{
        await area('delete', req, res)
    })

}