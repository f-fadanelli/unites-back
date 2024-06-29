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

exports.getEmpresa = async () => {
    let result
    const client = await poolPromise  

    result = await client.query('SELECT * FROM TB_EMPRESA');

    return result;
}

exports.getEmpresaByCnpjAndDifferentSeqEmp = async (filter = {}) => {
    let result
    const client = await poolPromise    

    const {cod_cnpj_emp, seq_emp} = filter
    const values = [cod_cnpj_emp];

    let filterQuery = ''

    if(seq_emp){
        filterQuery += 'AND SEQ_EMP <> $2'
        values.push(seq_emp)
    }

    result = await client.query(`SELECT * FROM TB_EMPRESA
                                    WHERE COD_CNPJ_EMP = $1
                                    ${filterQuery}`, values);

    return result;
}

exports.insertEmpresa = async (params = {}) => {
    const client = await poolPromise; 

    try {
        await client.query('BEGIN'); 
        
        const {cod_cnpj_emp, nom_emp} = params

        const insertQuery = `
            INSERT INTO TB_EMPRESA (COD_CNPJ_EMP, NOM_EMP)
            VALUES ($1, $2)
        `;

        const values = [cod_cnpj_emp, nom_emp];

        await client.query(insertQuery, values);

        await client.query('COMMIT');

        return 'Ok'
    } catch (err) {
        await client.query('ROLLBACK'); 
        return(err.message);
    }
}

exports.updateEmpresa = async (params = {}) => {
    const client = await poolPromise; 

    try {
        await client.query('BEGIN'); 
        
        const {seq_emp, cod_cnpj_emp, nom_emp} = params

        const updateQuery = `
            UPDATE TB_EMPRESA SET COD_CNPJ_EMP = $1, 
                                        NOM_EMP = $2
                WHERE SEQ_EMP = $3
        `;

        const values = [cod_cnpj_emp, nom_emp, seq_emp];

        await client.query(updateQuery, values);

        await client.query('COMMIT');

        return 'Ok'
    } catch (err) {
        await client.query('ROLLBACK'); 
        return(err.message);
    }
}

exports.deleteEmpresa = async (params = {}) => {
    const client = await poolPromise; 

    try {
        await client.query('BEGIN'); 
        
        const {seq_emp} = params
        const values = [seq_emp];

        deleteQuery = `DELETE FROM TB_FINANCIAMENTO 
                                    WHERE SEQ_EMP = $1;`;

        await client.query(deleteQuery, values);

        deleteQuery = `DELETE FROM TB_EMPRESA
                            WHERE SEQ_EMP = $1`;

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

exports.insertConexaoUsuario = async (params = {}) => {
    const client = await poolPromise; 

    try {
        await client.query('BEGIN'); 
        
        const {seq_usu_envia, seq_usu_recebe} = params

        const insertQuery = `
            INSERT INTO TB_CONEXAO_USUARIO (SEQ_USU_ENVIA, SEQ_USU_RECEBE)
            VALUES ($1, $2)
        `;

        const values = [seq_usu_envia, seq_usu_recebe];

        await client.query(insertQuery, values);

        await client.query('COMMIT');

        return 'Ok'
    } catch (err) {
        await client.query('ROLLBACK'); 
        return(err.message);
    }
}

exports.deleteConexaoUsuario = async (params = {}) => {
    const client = await poolPromise; 

    try {
        await client.query('BEGIN'); 
        
        const {seq_usu_envia, seq_usu_recebe} = params

        const insertQuery = `
            DELETE FROM TB_CONEXAO_USUARIO 
            WHERE (SEQ_USU_ENVIA = $1 AND SEQ_USU_RECEBE = $2)
                OR (SEQ_USU_ENVIA = $2 AND SEQ_USU_RECEBE = $1)
        `;

        const values = [seq_usu_envia, seq_usu_recebe];

        await client.query(insertQuery, values);

        await client.query('COMMIT');

        return 'Ok'
    } catch (err) {
        await client.query('ROLLBACK'); 
        return(err.message);
    }
}

exports.getProjeto = async () => {
    let result
    const client = await poolPromise  

    result = await client.query(`SELECT P.*, U.NOM_COMPLETO_USU 
                                FROM TB_PROJETO P
                                LEFT JOIN TB_USUARIO U ON U.SEQ_USU = P.SEQ_USU_RESPONSAVEL`);

    return result;
}

exports.insertProjeto = async (params = {}) => {
    const client = await poolPromise; 

    try {
        await client.query('BEGIN'); 
        
        const {nom_pro, des_pro, dth_inicio_pro, dth_final_pro, flg_status_pro, seq_usu_responsavel, seq_emp_list} = params

        const insertQuery = `
            INSERT INTO TB_PROJETO (NOM_PRO, DES_PRO, DTH_INICIO_PRO, DTH_FINAL_PRO, FLG_STATUS_PRO, SEQ_USU_RESPONSAVEL)
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING SEQ_PRO
        `;

        const values = [nom_pro, des_pro, dth_inicio_pro, dth_final_pro, flg_status_pro, seq_usu_responsavel];

        let result = await client.query(insertQuery, values);

        const {seq_pro} = result.rows[0]

        for(const seq_emp of seq_emp_list){
            await client.query(`INSERT INTO TB_FINANCIAMENTO(SEQ_EMP, SEQ_PRO) VALUES($1, $2)`, [seq_emp, seq_pro])
        }

        await client.query('COMMIT');

        return 'Ok'
    } catch (err) {
        await client.query('ROLLBACK'); 
        return(err.message);
    }
}

exports.updateProjeto = async (params = {}) => {
    const client = await poolPromise; 

    try {
        await client.query('BEGIN'); 
        
        const {seq_pro, nom_pro, des_pro, dth_inicio_pro, dth_final_pro, flg_status_pro, seq_usu_responsavel, seq_emp_list} = params

        const financiamentos = await this.getFinanciamentoBySeq_Pro({seq_pro: seq_pro})
        let current_seq_emp_list = []

        for(const financiamento of financiamentos.rows){
            current_seq_emp_list.push(financiamento['seq_emp'])
        }

        let newList = seq_emp_list.filter(emp => !current_seq_emp_list.includes(emp))
        let deletedList = current_seq_emp_list.filter(emp => !seq_emp_list.includes(emp))

        for(const seq_emp of newList){
            await client.query(`INSERT INTO TB_FINANCIAMENTO(SEQ_EMP, SEQ_PRO) VALUES($1, $2)`, [seq_emp, seq_pro])
        }

        for(const seq_emp of deletedList){
            await client.query(`DELETE FROM TB_FINANCIAMENTO WHERE SEQ_EMP = $1 AND SEQ_PRO = $2`, [seq_emp, seq_pro])
        }

        const updateQuery = `
            UPDATE TB_PROJETO SET NOM_PRO = $1, 
                                DES_PRO = $2, 
                                DTH_INICIO_PRO = $3, 
                                DTH_FINAL_PRO = $4, 
                                FLG_STATUS_PRO = $5, 
                                SEQ_USU_RESPONSAVEL = $6
                WHERE SEQ_PRO = $7
        `;

        const values = [nom_pro, des_pro, dth_inicio_pro, dth_final_pro, flg_status_pro, seq_usu_responsavel, seq_pro];

        await client.query(updateQuery, values);

        await client.query('COMMIT');

        return 'Ok'
    } catch (err) {
        await client.query('ROLLBACK'); 
        return(err.message);
    }
}

exports.deleteProjeto = async (params = {}) => {
    const client = await poolPromise; 

    try {
        await client.query('BEGIN'); 
        
        const {seq_pro} = params
        const values = [seq_pro];

        deleteQuery = `DELETE FROM TB_FINANCIAMENTO 
                                    WHERE SEQ_PRO = $1;`;

        await client.query(deleteQuery, values);

        deleteQuery = `DELETE FROM TB_PESQUISA  
                                    WHERE SEQ_PRO = $1;`;

        await client.query(deleteQuery, values);

        deleteQuery = `DELETE FROM TB_PROJETO
                            WHERE SEQ_PRO = $1`;

        await client.query(deleteQuery, values);

        await client.query('COMMIT');

        return 'Ok'
    } catch (err) {
        await client.query('ROLLBACK'); 
        return(err.message);
    }
}

exports.getFinanciamentoBySeq_Pro = async (params = {}) => {
    let result
    const client = await poolPromise  

    const {seq_pro} = params
    const values = [seq_pro];

    result = await client.query(`SELECT F.*, P.NOM_PRO, E.NOM_EMP FROM TB_FINANCIAMENTO F
                                LEFT JOIN TB_PROJETO P ON P.SEQ_PRO = F.SEQ_PRO
                                LEFT JOIN TB_EMPRESA E ON E.SEQ_EMP = F.SEQ_EMP 
                                WHERE F.SEQ_PRO = $1`, values);

    return result;
}

exports.getPesquisa = async () => {
    let result
    const client = await poolPromise  

    result = await client.query(`SELECT P.*, PRO.NOM_PRO, A.NOM_ARE, I.NOM_INS 
                                FROM TB_PESQUISA P
                                LEFT JOIN TB_PROJETO PRO ON PRO.SEQ_PRO = P.SEQ_PRO
                                LEFT JOIN TB_AREA A ON A.SEQ_ARE = P.SEQ_ARE
                                LEFT JOIN TB_INSTITUICAO I ON I.SEQ_INS = P.SEQ_INS`);

    return result;
}

exports.insertPesquisa = async (params = {}) => {
    const client = await poolPromise; 

    try {
        await client.query('BEGIN'); 
        
        const {nom_pes, des_pes, dth_publicacao_pes, seq_are, seq_pro, seq_ins, seq_usu_list} = params

        const insertQuery = `
            INSERT INTO TB_PESQUISA (NOM_PES, DES_PES, DTH_PUBLICACAO_PES, SEQ_ARE, SEQ_PRO, SEQ_INS)
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING SEQ_PES
        `;

        const values = [nom_pes, des_pes, dth_publicacao_pes, seq_are, seq_pro, seq_ins];

        let result = await client.query(insertQuery, values);

        const {seq_pes} = result.rows[0]

        for(const seq_usu of seq_usu_list){
            await client.query(`INSERT INTO TB_PESQUISA_USUARIO(SEQ_PES, SEQ_USU) VALUES($1, $2)`, [seq_pes, seq_usu])
        }

        await client.query('COMMIT');

        return 'Ok'
    } catch (err) {
        await client.query('ROLLBACK'); 
        return(err.message);
    }
}

exports.updatePesquisa = async (params = {}) => {
    const client = await poolPromise; 

    try {
        await client.query('BEGIN'); 
        
        const {seq_pes, nom_pes, des_pes, dth_publicacao_pes, seq_are, seq_pro, seq_ins, seq_usu_list} = params

        const pesquisadores = await this.getPesquisadoresBySeq_Pes({seq_pes: seq_pes})
        let current_seq_usu_list = []

        for(const pesquisador of pesquisadores.rows){
            current_seq_usu_list.push(pesquisador['seq_usu'])
        }

        let newList = seq_usu_list.filter(usu => !current_seq_usu_list.includes(usu))
        let deletedList = current_seq_usu_list.filter(usu => !seq_usu_list.includes(usu))

        for(const seq_usu of newList){
            await client.query(`INSERT INTO TB_PESQUISA_USUARIO(SEQ_PES, SEQ_USU) VALUES($1, $2)`, [seq_pes, seq_usu])
        }

        for(const seq_usu of deletedList){
            await client.query(`DELETE FROM TB_PESQUISA_USUARIO WHERE SEQ_PES = $1 AND SEQ_USU = $2`, [seq_pes, seq_usu])
        }

        const updateQuery = `
            UPDATE TB_PESQUISA SET NOM_PES = $1, 
                                DES_PES = $2, 
                                DTH_PUBLICACAO_PES = $3, 
                                SEQ_ARE = $4, 
                                SEQ_PRO = $5, 
                                SEQ_INS = $6
                WHERE SEQ_PES = $7
        `;

        const values = [ nom_pes, des_pes, dth_publicacao_pes, seq_are, seq_pro, seq_ins, seq_pes];

        await client.query(updateQuery, values);

        await client.query('COMMIT');

        return 'Ok'
    } catch (err) {
        await client.query('ROLLBACK'); 
        return(err.message);
    }
}

exports.deletePesquisa = async (params = {}) => {
    const client = await poolPromise; 

    try {
        await client.query('BEGIN'); 
        
        const {seq_pes} = params
        const values = [seq_pes];

        deleteQuery = `DELETE FROM TB_PESQUISA_USUARIO
                                    WHERE SEQ_PES = $1;`;

        await client.query(deleteQuery, values);

        deleteQuery = `DELETE FROM TB_PESQUISA
                            WHERE SEQ_PES = $1`;

        await client.query(deleteQuery, values);

        await client.query('COMMIT');

        return 'Ok'
    } catch (err) {
        await client.query('ROLLBACK'); 
        return(err.message);
    }
}

exports.getPesquisadoresBySeq_Pro = async (params = {}) => {
    let result
    const client = await poolPromise  

    const {seq_pro} = params
    const values = [seq_pro];

    result = await client.query(`SELECT U.SEQ_USU, U.NOM_COMPLETO_USU, PRO.SEQ_PRO, PRO.NOM_PRO  
                                FROM TB_PESQUISA_USUARIO PU
                                LEFT JOIN TB_USUARIO U ON U.SEQ_USU = PU.SEQ_USU
                                LEFT JOIN TB_PESQUISA P ON P.SEQ_PES = PU.SEQ_PES  
                                LEFT JOIN TB_PROJETO PRO ON PRO.SEQ_PRO = P.SEQ_PRO
                                WHERE PRO.SEQ_PRO = $1`, values);

    return result;
}

exports.getPesquisadoresBySeq_Pes = async (params = {}) => {
    let result
    const client = await poolPromise  

    const {seq_pes} = params
    const values = [seq_pes];

    result = await client.query(`SELECT PU.*, P.NOM_PES, U.NOM_COMPLETO_USU FROM TB_PESQUISA_USUARIO PU
                                LEFT JOIN TB_PESQUISA P ON P.SEQ_PES = PU.SEQ_PES  
                                LEFT JOIN TB_USUARIO U ON U.SEQ_USU = PU.SEQ_USU
                                WHERE PU.SEQ_PES = $1`, values);

    return result;
}

exports.getPesquisadorBySeq_Usu = async (params = {}) => {
    let result
    
    const {seq_usu} = params
    const values = [seq_usu];

    const client = await poolPromise    // Realizar uma consulta
    result = await client.query(`SELECT U.*, I.NOM_INS, I.NOM_SIGLA_INS, G.NOM_GRA FROM TB_USUARIO U
                                LEFT JOIN TB_INSTITUICAO I ON I.SEQ_INS = U.SEQ_INS
                                LEFT JOIN TB_GRAU G ON G.SEQ_GRA = U.SEQ_GRA
                                WHERE U.SEQ_USU = $1
                                `, values);

    return result
}

exports.getConexaoBySeq_Usu = async (params = {}) => {
    let result
    
    const {seq_usu} = params
    const values = [seq_usu];

    const client = await poolPromise    // Realizar uma consulta


    result = await client.query(`(SELECT U.SEQ_USU, U.NOM_COMPLETO_USU FROM TB_CONEXAO_USUARIO C
                                                    LEFT JOIN TB_USUARIO U ON U.SEQ_USU = C.SEQ_USU_RECEBE
                                                    WHERE C.SEQ_USU_ENVIA = $1)
                                                UNION
                                                (SELECT U.SEQ_USU, U.NOM_COMPLETO_USU FROM TB_CONEXAO_USUARIO C
                                                    LEFT JOIN TB_USUARIO U ON U.SEQ_USU = C.SEQ_USU_ENVIA
                                                    WHERE C.SEQ_USU_RECEBE = $1)`, values);

    return result
}

exports.getPesquisaBySeq_Usu = async (params = {}) => {
    let result
    
    const {seq_usu} = params
    const values = [seq_usu];

    const client = await poolPromise    // Realizar uma consulta

    result = await client.query(`SELECT P.*, PRO.NOM_PRO, A.NOM_ARE, I.NOM_INS 
                                FROM TB_PESQUISA_USUARIO PU
                                LEFT JOIN TB_PESQUISA P ON P.SEQ_PES = PU.SEQ_PES
                                LEFT JOIN TB_PROJETO PRO ON PRO.SEQ_PRO = P.SEQ_PRO
                                LEFT JOIN TB_AREA A ON A.SEQ_ARE = P.SEQ_ARE
                                LEFT JOIN TB_INSTITUICAO I ON I.SEQ_INS = P.SEQ_INS
                                WHERE PU.SEQ_USU = $1`, values);

    return result
}

exports.getPesquisaBySeq_Pes = async (params = {}) => {
    let result
    
    const {seq_pes} = params
    const values = [seq_pes];

    const client = await poolPromise    // Realizar uma consulta

    result = await client.query(`SELECT P.*, PRO.NOM_PRO, A.NOM_ARE, I.NOM_INS 
                                FROM TB_PESQUISA P
                                LEFT JOIN TB_PROJETO PRO ON PRO.SEQ_PRO = P.SEQ_PRO
                                LEFT JOIN TB_AREA A ON A.SEQ_ARE = P.SEQ_ARE
                                LEFT JOIN TB_INSTITUICAO I ON I.SEQ_INS = P.SEQ_INS
                                WHERE P.SEQ_PES = $1`, values);

    return result
}

exports.getPesquisaBySeq_Pro = async (params = {}) => {
    let result
    
    const {seq_pro} = params
    const values = [seq_pro];

    const client = await poolPromise    // Realizar uma consulta

    result = await client.query(`SELECT P.*, PRO.NOM_PRO, A.NOM_ARE, I.NOM_INS 
                                FROM TB_PESQUISA P
                                LEFT JOIN TB_PROJETO PRO ON PRO.SEQ_PRO = P.SEQ_PRO
                                LEFT JOIN TB_AREA A ON A.SEQ_ARE = P.SEQ_ARE
                                LEFT JOIN TB_INSTITUICAO I ON I.SEQ_INS = P.SEQ_INS
                                WHERE P.SEQ_PRO = $1`, values);

    return result
}

exports.getProjetoBySeq_Usu = async (params = {}) => {
    let result
    
    const {seq_usu} = params
    const values = [seq_usu];

    const client = await poolPromise    // Realizar uma consulta

    result = await client.query(`SELECT PRO.SEQ_PRO, PRO.NOM_PRO, PRO.FLG_STATUS_PRO, U.NOM_COMPLETO_USU AS NOM_COMPLETO_USU_RESPONSAVEL, PRO.DES_PRO, PRO.DTH_INICIO_PRO, PRO.DTH_FINAL_PRO, PRO.SEQ_USU_RESPONSAVEL
                                    FROM TB_PESQUISA_USUARIO PU
                                    LEFT JOIN TB_PESQUISA P ON P.SEQ_PES = PU.SEQ_PES
                                    LEFT JOIN TB_PROJETO PRO ON PRO.SEQ_PRO = P.SEQ_PRO
                                    LEFT JOIN TB_USUARIO U ON U.SEQ_USU = PRO.SEQ_USU_RESPONSAVEL
                                    WHERE PU.SEQ_USU = $1
                                    GROUP BY PRO.SEQ_PRO, PRO.NOM_PRO, PRO.FLG_STATUS_PRO, U.NOM_COMPLETO_USU `, values);

    return result
}

exports.getProjetoBySeq_Pes = async (params = {}) => {
    let result
    
    const {seq_pes} = params
    const values = [seq_pes];

    const client = await poolPromise    // Realizar uma consulta

    result = await client.query(`SELECT PRO.SEQ_PRO, PRO.NOM_PRO, PRO.FLG_STATUS_PRO, U.NOM_COMPLETO_USU AS NOM_COMPLETO_USU_RESPONSAVEL
                                    FROM TB_PESQUISA_USUARIO PU
                                    LEFT JOIN TB_PESQUISA P ON P.SEQ_PES = PU.SEQ_PES
                                    LEFT JOIN TB_PROJETO PRO ON PRO.SEQ_PRO = P.SEQ_PRO
                                    LEFT JOIN TB_USUARIO U ON U.SEQ_USU = PRO.SEQ_USU_RESPONSAVEL
                                    WHERE PU.SEQ_PES = $1
                                    GROUP BY PRO.SEQ_PRO, PRO.NOM_PRO, PRO.FLG_STATUS_PRO, U.NOM_COMPLETO_USU `, values);

    return result
}

exports.getProjetoBySeq_Pro = async (params = {}) => {
    let result
    
    const {seq_pro} = params
    const values = [seq_pro];

    const client = await poolPromise    // Realizar uma consulta

    result = await client.query(`SELECT P.*, U.NOM_COMPLETO_USU 
                                FROM TB_PROJETO P
                                LEFT JOIN TB_USUARIO U ON U.SEQ_USU = P.SEQ_USU_RESPONSAVEL
                                WHERE SEQ_PRO = $1`, values);

    return result
}
