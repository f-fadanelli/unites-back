const {poolPromise} = require('../postgreserver')

exports.getInstituicao = async () => {
    let result
    const client = await poolPromise    // Realizar uma consulta
    result = await client.query('SELECT * FROM TB_INSTITUICAO');

    return result;
}