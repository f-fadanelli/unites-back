const {poolPromise} = require('../postgreserver')

exports.getGrauAcademico = async () => {
    let result
    const client = await poolPromise    // Realizar uma consulta
    result = await client.query(`SELECT * FROM TB_GRAU`);

    return result;
}

exports.getAreaAcademica = async () => {
    let result
    const client = await poolPromise  

    result = await client.query('SELECT * FROM TB_AREA');

    return result;
}

exports.getAreaAcademicaByNameAndDifferentSeqAre = async (filter = {}) => {
    let result
    const client = await poolPromise    

    const {nom_are, seq_are} = filter
    const values = [nom_are];

    let filterQuery = ''

    if(seq_are){
        filterQuery += 'AND SEQ_ARE <> $2'
        values.push(seq_are)
    }

    result = await client.query(`SELECT * FROM TB_AREA
                                    WHERE NOM_ARE = $1
                                    ${filterQuery}`, values);

    return result;
}

exports.insertArea = async (params = {}) => {
    const client = await poolPromise; 

    try {
        await client.query('BEGIN'); 
        
        const {nom_are} = params

        const insertQuery = `
            INSERT INTO TB_AREA (NOM_ARE)
            VALUES ($1)
        `;

        const values = [nom_are];

        await client.query(insertQuery, values);

        await client.query('COMMIT');

        return 'Ok'
    } catch (err) {
        await client.query('ROLLBACK'); 
        return(err.message);
    }
}

exports.updateArea = async (params = {}) => {
    const client = await poolPromise; 

    try {
        await client.query('BEGIN'); 
        
        const {seq_are, nom_are} = params

        const updateQuery = `
            UPDATE TB_AREA SET NOM_ARE = $1
                WHERE SEQ_ARE = $2
        `;

        const values = [nom_are, seq_are];

        await client.query(updateQuery, values);

        await client.query('COMMIT');

        return 'Ok'
    } catch (err) {
        await client.query('ROLLBACK'); 
        return(err.message);
    }
}

exports.deleteArea = async (params = {}) => {
    const client = await poolPromise; 

    try {
        await client.query('BEGIN'); 
        
        const {seq_are} = params
        const values = [seq_are];

        let deleteQuery = `UPDATE TB_PESQUISA SET SEQ_ARE = NULL 
                                    WHERE SEQ_ARE = $1;`;

        await client.query(deleteQuery, values);

        deleteQuery = `DELETE FROM TB_AREA 
                        WHERE SEQ_ARE = $1;`

        await client.query(deleteQuery, values);

        await client.query('COMMIT');

        return 'Ok'
    } catch (err) {
        await client.query('ROLLBACK'); 
        return(err.message);
    }
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

    const {cod_cnpj_ins, seq_ins} = filter
    const values = [cod_cnpj_ins];

    let filterQuery = ''

    if(seq_ins){
        filterQuery += 'AND SEQ_INS <> $2'
        values.push(seq_ins)
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
        
        const {cod_cnpj_ins, nom_ins, nom_sigla_ins} = params

        const insertQuery = `
            INSERT INTO TB_INSTITUICAO (COD_CNPJ_INS, NOM_INS, NOM_SIGLA_INS)
            VALUES ($1, $2, $3)
        `;

        const values = [cod_cnpj_ins, nom_ins, nom_sigla_ins];

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
        
        const {seq_ins, cod_cnpj_ins, nom_ins, nom_sigla_ins} = params

        const updateQuery = `
            UPDATE TB_INSTITUICAO SET COD_CNPJ_INS = $1, 
                                        NOM_INS = $2,
                                        NOM_SIGLA_INS = $3
                WHERE SEQ_INS = $4
        `;

        const values = [cod_cnpj_ins, nom_ins, nom_sigla_ins, seq_ins];

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
        
        const {seq_ins} = params
        const values = [seq_ins];

        let deleteQuery = `UPDATE TB_PESQUISA SET SEQ_INS = NULL 
                                    WHERE SEQ_INS = $1;`;

        await client.query(deleteQuery, values);

        deleteQuery = `UPDATE TB_USUARIO SET SEQ_INS = NULL 
                                    WHERE SEQ_INS = $1;`;

        await client.query(deleteQuery, values);

        deleteQuery = `DELETE FROM TB_INSTITUICAO 
                            WHERE SEQ_INS = $1`;

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

    const {cod_cpf_usu, cod_senha_usu} = filter
    const values = [cod_cpf_usu, cod_senha_usu];

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
    result = await client.query(`SELECT U.*, I.NOM_INS, I.NOM_SIGLA_INS, G.NOM_GRA FROM TB_USUARIO U
                                LEFT JOIN TB_INSTITUICAO I ON I.SEQ_INS = U.SEQ_INS
                                LEFT JOIN TB_GRAU G ON G.SEQ_GRA = U.SEQ_GRA
                                WHERE FLG_PES_USU = 1
                                `);

    return result;
}

exports.getUsuarioByCpfAndDifferentSeqUsu = async (filter = {}) => {
    let result
    const client = await poolPromise    

    const {cod_cpf_usu, seq_usu} = filter
    const values = [cod_cpf_usu];

    let filterQuery = ''

    if(seq_usu){
        filterQuery += 'AND SEQ_USU <> $2'
        values.push(seq_usu)
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
        
        const {cod_cpf_usu, nom_completo_usu, cod_senha_usu, pesquisador, seq_gra, seq_ins} = params

        const insertQuery = `
            INSERT INTO TB_USUARIO (COD_CPF_USU, NOM_COMPLETO_USU, COD_SENHA_USU, FLG_PES_USU, SEQ_GRA, SEQ_INS)
            VALUES ($1, $2, $3, $4, $5, $6)
        `;

        const values = [cod_cpf_usu, nom_completo_usu, cod_senha_usu, pesquisador?1:0, seq_gra, seq_ins];

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
        
        const {seq_usu, cod_cpf_usu, nom_completo_usu, cod_senha_usu, pesquisador, des_formacao_usu, seq_gra, seq_ins} = params

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

        const values = [cod_cpf_usu, nom_completo_usu, cod_senha_usu, pesquisador?1:0, des_formacao_usu, seq_gra, seq_ins, seq_usu];

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
        
        const {seq_usu} = params
        const values = [seq_usu];

        let deleteQuery = `DELETE FROM TB_CONEXAO_USUARIO
                            WHERE SEQ_USU_ENVIA = $1 OR SEQ_USU_RECEBE = $1`

        await client.query(deleteQuery, values);

        deleteQuery = `DELETE FROM TB_PESQUISA_USUARIO
                            WHERE SEQ_USU = $1 `

        await client.query(deleteQuery, values);

        deleteQuery = `DELETE FROM TB_USUARIO 
                        WHERE SEQ_USU = $1`;

        await client.query(deleteQuery, values);

        await client.query('COMMIT');

        return 'Ok'
    } catch (err) {
        await client.query('ROLLBACK'); 
        return(err.message);
    }
}
