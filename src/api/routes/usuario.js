const usuario = require('../services/usuario')

module.exports = function(app){

    app.get('/usuario/login/COD_CPF_USU/:cod_cpf_usu/COD_SENHA_USU/:cod_senha_usu', async(req, res)=>{
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

    app.delete('/usuario/SEQ_USU/:seq_usu', async(req, res)=>{
        await usuario('delete', req, res)
    })

    app.post('/usuario/conexao', async(req, res)=>{
        await usuario('insertConexao', req, res)
    })

    app.delete('/usuario/conexao', async(req, res)=>{
        await usuario('deleteConexao', req, res)
    })

    app.get('/usuario/pesquisador/SEQ_PES/:seq_pes', async(req, res)=>{
        await usuario('findPesquisadoresBySeq_Pes', req, res)
    })

    app.get('/usuario/pesquisador/SEQ_PRO/:seq_pro', async(req, res)=>{
        await usuario('findPesquisadoresBySeq_Pro', req, res)
    })

    app.get('/usuario/pesquisador/SEQ_USU/:seq_usu', async(req, res)=>{
        await usuario('findPesquisadorBySeq_Usu', req, res)
    })

    app.get('/usuario/conexao/SEQ_USU/:seq_usu', async(req, res)=>{
        await usuario('findConexaoBySeq_Usu', req, res)
    })
}