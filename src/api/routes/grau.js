const grau = require('../services/grau')

module.exports = function(app){

    app.get('/grauAcademico', async(req, res)=>{
        await grau('find', req, res)
    })

}