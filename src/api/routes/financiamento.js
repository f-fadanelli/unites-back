const financiamento = require('../services/financiamento')

module.exports = function(app){

    app.get('/financiamento/SEQ_PRO/:seq_pro', async(req, res)=>{
        await financiamento('findBySeq_Pro', req, res)
    })
}