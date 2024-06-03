const {poolPromise} = require('../postgreserver')

exports.getGrauAcademico = async () => {
    let result
    const client = await poolPromise    // Realizar uma consulta
    result = await client.query(`SELECT * FROM TB_GRAU`);

    return result;
}

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
        return(err.message);
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
        return(err.message);
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
        return(err.message);
    }
}

exports.getLoginUsuario = async (filter = {}) => {
    let result
    const client = await poolPromise    // Realizar uma consulta

    const {COD_CPF_USU, COD_SENHA_USU} = filter
    const values = [COD_CPF_USU, COD_SENHA_USU];

    result = await client.query(`SELECT * FROM TB_USUARIO 
                                WHERE COD_CPF_USU = $1
                                AND COD_SENHA_USU = $2`, values);
    return result;
}

exports.getUsuario = async () => {
    let result
    const client = await poolPromise    // Realizar uma consulta
    result = await client.query(`SELECT * FROM TB_USUARIO`);

    return result;
}

exports.getPesquisador = async () => {
    let result
    const client = await poolPromise    // Realizar uma consulta
    result = await client.query(`SELECT U.*, I.NOM_INS, I.NOM_SIGLA_INS FROM TB_USUARIO U
                                LEFT JOIN TB_INSTITUICAO I ON I.SEQ_INS = U.SEQ_INS
                                WHERE FLG_PES_USU = 1
                                `);

    return result;
}

exports.getUsuarioByCpfAndDifferentSeqUsu = async (filter = {}) => {
    let result
    const client = await poolPromise    

    const {COD_CPF_USU, SEQ_USU} = filter
    const values = [COD_CPF_USU];

    let filterQuery = ''

    if(SEQ_USU){
        filterQuery += 'AND SEQ_USU <> $2'
        values.push(SEQ_USU)
    }

    result = await client.query(`SELECT * FROM TB_USUARIO
                                    WHERE COD_CPF_USU = $1
                                    ${filterQuery}`, values);

    return result;
}

exports.insertUsuario = async (params = {}) => {
    const client = await poolPromise; 

    try {
        await client.query('BEGIN'); 
        
        const {COD_CPF_USU, NOM_COMPLETO_USU, COD_SENHA_USU, PESQUISADOR, SEQ_GRA, SEQ_INS} = params

        const insertQuery = `
            INSERT INTO TB_USUARIO (COD_CPF_USU, NOM_COMPLETO_USU, COD_SENHA_USU, FLG_PES_USU, SEQ_GRA, SEQ_INS)
            VALUES ($1, $2, $3, $4, $5, $6)
        `;

        const values = [COD_CPF_USU, NOM_COMPLETO_USU, COD_SENHA_USU, PESQUISADOR?1:0, SEQ_GRA, SEQ_INS];

        await client.query(insertQuery, values);

        await client.query('COMMIT');

        return 'Ok'
    } catch (err) {
        await client.query('ROLLBACK'); 
        return(err.message);
    }
}

exports.updateUsuario = async (params = {}) => {
    const client = await poolPromise; 

    try {
        await client.query('BEGIN'); 
        
        const {SEQ_USU, COD_CPF_USU, NOM_COMPLETO_USU, COD_SENHA_USU, PESQUISADOR, DES_FORMACAO_USU, SEQ_GRA, SEQ_INS} = params

        const updateQuery = `
            UPDATE TB_USUARIO SET COD_CPF_USU = $1,
                                    NOM_COMPLETO_USU = $2, 
                                    COD_SENHA_USU = $3, 
                                    FLG_PES_USU = $4,
                                    DES_FORMACAO_USU = $5,
                                    SEQ_GRA = $6,
                                    SEQ_INS = $7
                WHERE SEQ_USU = $8
        `;

        const values = [COD_CPF_USU, NOM_COMPLETO_USU, COD_SENHA_USU, PESQUISADOR?1:0, DES_FORMACAO_USU, SEQ_GRA, SEQ_INS, SEQ_USU];

        await client.query(updateQuery, values);

        await client.query('COMMIT');

        return 'Ok'
    } catch (err) {
        await client.query('ROLLBACK'); 
        return(err.message);
    }
}

exports.deleteUsuario = async (params = {}) => {
    const client = await poolPromise; 

    try {
        await client.query('BEGIN'); 
        
        const {SEQ_USU} = params

        const deleteQuery = `DELETE FROM TB_USUARIO WHERE SEQ_USU = $1`;

        const values = [SEQ_USU];

        await client.query(deleteQuery, values);

        await client.query('COMMIT');

        return 'Ok'
    } catch (err) {
        await client.query('ROLLBACK'); 
        return(err.message);
    }
}
