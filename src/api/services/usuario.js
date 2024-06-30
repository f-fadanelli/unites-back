const {getPesquisador, getUsuario, getUsuarioByCpfAndDifferentSeqUsu, insertUsuario, updateUsuario, deleteUsuario, getLoginUsuario, insertConexaoUsuario, deleteConexaoUsuario, getPesquisadoresBySeq_Pes, getPesquisadorBySeq_Usu, getConexaoBySeq_Usu, getPesquisadoresBySeq_Pro, getConexaoIncluindoSeq_Usu} = require("../../library/api/endpoint")
const { validateReq } = require('../../library/utils')

const options = {
    async find(req, res){
        try{
            const response = await getUsuario()
            if (response.rows.length > 0)
                res.status(200).json({ Message: response.rows })
            else
                res.status(400).json({ Message: 'No documents were found' })
        }
        catch(err){
            res.status(400).json({Message: err.message})
        }
    },

    async findPesquisadores(req, res){
        try{
            const response = await getPesquisador()
            if (response.rows.length > 0)
                res.status(200).json({ Message: response.rows })
            else
                res.status(400).json({ Message: 'No documents were found' })
        }
        catch(err){
            res.status(400).json({Message: err.message})
        }
    },

    async findLogin(req, res){
        // Validate fields
        const validateReqs = validateReq("validateFindUsuarioLogin", req.params)
        let validate = [validateReqs]
            .flat()
            .filter(item => item !== undefined)
        if (validate.length > 0) {
            return res.status(400).json({ Error: validate })
        }

        try {
            const response = await getLoginUsuario(req.params)
            if (response.rows.length > 0)
                res.status(200).json({ Message: response.rows })
            else
                res.status(400).json({ Message: 'No documents were found' })
        }
        catch(err){
            res.status(400).json({Message: err.message})
        }
    },

    async insert(req, res){
        // Validate fields
        const validateReqs = validateReq("validateInsertUsuario", req.body)
        let validate = [validateReqs]
            .flat()
            .filter(item => item !== undefined)
        if (validate.length > 0) {
            return res.status(400).json({ Error: validate })
        }

        try{
            let response = await getUsuarioByCpfAndDifferentSeqUsu(req.body)

            if(response.rows.length>0)
                res.status(400).json({ Message: 'User with informed CPF allready exists!' })
            else{

                response = await insertUsuario(req.body)

                if (response === 'Ok')
                    res.status(200).json({ Message: 'All documents inserted!' })
                else
                    res.status(400).json({ Message: response })
            }
        }
        catch(err){
            res.status(400).json({Message: err.message})
        }
    },

    async update(req, res){
        // Validate fields
        const validateReqs = validateReq("validateUpdateUsuario", req.body)
        let validate = [validateReqs]
            .flat()
            .filter(item => item !== undefined)
        if (validate.length > 0) {
            return res.status(400).json({ Error: validate })
        }

        try{
            let response = await getUsuarioByCpfAndDifferentSeqUsu(req.body)

            if(response.rows.length>0)
                res.status(400).json({ Message: 'User with informed CPF allready exists!' })
            else{

                response = await updateUsuario(req.body)

                if (response === 'Ok')
                    res.status(200).json({ Message: 'All documents updated!' })
                else
                    res.status(400).json({ Message: response })
            }
        }
        catch(err){
            res.status(400).json({Message: err.message})
        }
    },

    async delete(req, res){
        // Validate fields
        const validateReqs = validateReq("validateDeleteUsuario", req.params)
        let validate = [validateReqs]
            .flat()
            .filter(item => item !== undefined)
        if (validate.length > 0) {
            return res.status(400).json({ Error: validate })
        }

        try{
            response = await deleteUsuario(req.params)

            if (response === 'Ok')
                res.status(200).json({ Message: 'All documents deleted!' })
            else
                res.status(400).json({ Message: response })

        }
        catch(err){
            res.status(400).json({Message: err.message})
        }
    },

    async insertConexao(req, res){
        // Validate fields
        const validateReqs = validateReq("validateConexaoUsuario", req.body)
        let validate = [validateReqs]
            .flat()
            .filter(item => item !== undefined)
        if (validate.length > 0) {
            return res.status(400).json({ Error: validate })
        }

        try{
                response = await insertConexaoUsuario(req.body)

                if (response === 'Ok')
                    res.status(200).json({ Message: 'All documents inserted!' })
                else
                    res.status(400).json({ Message: response })
        }
        catch(err){
            res.status(400).json({Message: err.message})
        }
    },

    async deleteConexao(req, res){
        // Validate fields
        const validateReqs = validateReq("validateConexaoUsuario", req.body)
        let validate = [validateReqs]
            .flat()
            .filter(item => item !== undefined)
        if (validate.length > 0) {
            return res.status(400).json({ Error: validate })
        }

        try{
                response = await deleteConexaoUsuario(req.body)

                if (response === 'Ok')
                    res.status(200).json({ Message: 'All documents deleted!' })
                else
                    res.status(400).json({ Message: response })
        }
        catch(err){
            res.status(400).json({Message: err.message})
        }
    },

    async findPesquisadoresBySeq_Pes(req, res){
        // Validate fields
        const validateReqs = validateReq("validateFindPesquisadoresBySeq_Pes", req.params)
        let validate = [validateReqs]
            .flat()
            .filter(item => item !== undefined)
        if (validate.length > 0) {
            return res.status(400).json({ Error: validate })
        }

        try{
            const response = await getPesquisadoresBySeq_Pes(req.params)
            if (response.rows.length > 0)
                res.status(200).json({ Message: response.rows })
            else
                res.status(400).json({ Message: 'No documents were found' })
        }
        catch(err){
            res.status(400).json({Message: err.message})
        }
    },

    async findPesquisadoresBySeq_Pro(req, res){
        // Validate fields
        const validateReqs = validateReq("validateFindPesquisadorBySeq_Pro", req.params)
        let validate = [validateReqs]
            .flat()
            .filter(item => item !== undefined)
        if (validate.length > 0) {
            return res.status(400).json({ Error: validate })
        }

        try{
            const response = await getPesquisadoresBySeq_Pro(req.params)
            if (response.rows.length > 0)
                res.status(200).json({ Message: response.rows })
            else
                res.status(400).json({ Message: 'No documents were found' })
        }
        catch(err){
            res.status(400).json({Message: err.message})
        }
    },

    async findPesquisadorBySeq_Usu(req, res){
        // Validate fields
        const validateReqs = validateReq("validateFindPesquisadorBySeq_Usu", req.params)
        let validate = [validateReqs]
            .flat()
            .filter(item => item !== undefined)
        if (validate.length > 0) {
            return res.status(400).json({ Error: validate })
        }

        try{
            const response = await getPesquisadorBySeq_Usu(req.params)
            if (response.rows.length > 0)
                res.status(200).json({ Message: response.rows })
            else
                res.status(400).json({ Message: 'No documents were found' })
        }
        catch(err){
            res.status(400).json({Message: err.message})
        }
    },

    async findConexaoBySeq_Usu(req, res){
        // Validate fields
        const validateReqs = validateReq("validateFindPesquisadorBySeq_Usu", req.params)
        let validate = [validateReqs]
            .flat()
            .filter(item => item !== undefined)
        if (validate.length > 0) {
            return res.status(400).json({ Error: validate })
        }

        try{
            const response = await getConexaoBySeq_Usu(req.params)
            if (response.rows.length > 0)
                res.status(200).json({ Message: response.rows })
            else
                res.status(400).json({ Message: 'No documents were found' })
        }
        catch(err){
            res.status(400).json({Message: err.message})
        }
    },

    async findConexaoIncluindoSeq_Usu(req, res){
        // Validate fields
        const validateReqs = validateReq("validateFindPesquisadorBySeq_Usu", req.params)
        let validate = [validateReqs]
            .flat()
            .filter(item => item !== undefined)
        if (validate.length > 0) {
            return res.status(400).json({ Error: validate })
        }

        try{
            const response = await getConexaoIncluindoSeq_Usu(req.params)
            if (response.rows.length > 0)
                res.status(200).json({ Message: response.rows })
            else
                res.status(400).json({ Message: 'No documents were found' })
        }
        catch(err){
            res.status(400).json({Message: err.message})
        }
    }
}
module.exports = async function main(option, req, res){
    await options[option](req, res)
}