const {poolPromise} = require('../postgreserver')

exports.getInstituicao = async () => {
    let result
    const client = await poolPromise  

    result = await client.query('SELECT * FROM TB_INSTITUICAO');

    return result;
}

exports.getInstituicaoByCnpjAndDifferentSeqIns = async (filter = {}) => {
    let result
    const client = await poolPromise    

    const {COD_CNPJ_INS, SEQ_INS} = filter
    const values = [COD_CNPJ_INS];

    let filterQuery = ''

    if(SEQ_INS){
        filterQuery += 'AND SEQ_INS <> $2'
        values.push(SEQ_INS)
    }

    result = await client.query(`SELECT * FROM TB_INSTITUICAO
                                    WHERE COD_CNPJ_INS = $1
                                    ${filterQuery}`, values);

    return result;
}

exports.insertInstituicao = async (params = {}) => {
    const client = await poolPromise; 

    try {
        await client.query('BEGIN'); 
        
        const {COD_CNPJ_INS, NOM_INS, NOM_SIGLA_INS} = params

        const insertQuery = `
            INSERT INTO TB_INSTITUICAO (COD_CNPJ_INS, NOM_INS, NOM_SIGLA_INS)
            VALUES ($1, $2, $3)
        `;

        const values = [COD_CNPJ_INS, NOM_INS, NOM_SIGLA_INS];

        await client.query(insertQuery, values);

        await client.query('COMMIT');

        return 'Ok'
    } catch (err) {
        await client.query('ROLLBACK'); 
        return('Erro ao inserir usuário:', err.message);
    }
}

exports.updateInstituicao = async (params = {}) => {
    const client = await poolPromise; 

    try {
        await client.query('BEGIN'); 
        
        const {SEQ_INS, COD_CNPJ_INS, NOM_INS, NOM_SIGLA_INS} = params

        const updateQuery = `
            UPDATE TB_INSTITUICAO SET COD_CNPJ_INS = $1, 
                                        NOM_INS = $2,
                                        NOM_SIGLA_INS = $3
                WHERE SEQ_INS = $4
        `;

        const values = [COD_CNPJ_INS, NOM_INS, NOM_SIGLA_INS, SEQ_INS];

        await client.query(updateQuery, values);

        await client.query('COMMIT');

        return 'Ok'
    } catch (err) {
        await client.query('ROLLBACK'); 
        return('Erro ao inserir usuário:', err.message);
    }
}

exports.deleteInstituicao = async (params = {}) => {
    const client = await poolPromise; 

    try {
        await client.query('BEGIN'); 
        
        const {SEQ_INS} = params

        const deleteQuery = `DELETE FROM TB_INSTITUICAO WHERE SEQ_INS = $1`;

        const values = [SEQ_INS];

        await client.query(deleteQuery, values);

        await client.query('COMMIT');

        return 'Ok'
    } catch (err) {
        await client.query('ROLLBACK'); 
        return('Erro ao inserir usuário:', err.message);
    }
}

exports.getPesquisador = async () => {
    let result
    const client = await poolPromise    // Realizar uma consulta
    result = await client.query(`SELECT * FROM TB_USUARIO
                                    WHERE FLG_PES_USU = 1
                                `);

    return result;
}