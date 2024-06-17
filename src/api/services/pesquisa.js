const { getPesquisa, insertPesquisa, updatePesquisa, deletePesquisa, getPesquisaBySeq_Usu, getPesquisaBySeq_Pes, getPesquisaBySeq_Pro } = require("../../library/api/endpoint")
const { validateReq } = require('../../library/utils')

const options = {
    async find(req, res){
        try{
            const response = await getPesquisa()

            if (response.rows.length > 0)
                res.status(200).json({ Message: response.rows })
            else
                res.status(400).json({ Message: 'No documents were found!' })
        }
        catch(err){
            res.status(400).json({Message: err.message})
        }
    },

    async insert(req, res){
        // Validate fields
        const validateReqs = validateReq("validateInsertPesquisa", req.body)
        let validate = [validateReqs]
            .flat()
            .filter(item => item !== undefined)
        if (validate.length > 0) {
            return res.status(400).json({ Error: validate })
        }

        try {

            let response = await insertPesquisa(req.body)

            if (response === 'Ok')
                res.status(200).json({ Message: 'All documents inserted!' })
            else
                res.status(400).json({ Message: response })

        }
        catch(err){
            res.status(400).json({Message: err.message})
        }
    },

    async update(req, res){
        // Validate fields
        const validateReqs = validateReq("validateUpdatePesquisa", req.body)
        let validate = [validateReqs]
            .flat()
            .filter(item => item !== undefined)
        if (validate.length > 0) {
            return res.status(400).json({ Error: validate })
        }

        try {

            let response = await updatePesquisa(req.body)

            if (response === 'Ok')
                res.status(200).json({ Message: 'All documents updated!' })
            else
                res.status(400).json({ Message: response })

        }
        catch (err) {
            res.status(400).json({ Message: err.message })
        }
    },

    async delete(req, res){
        // Validate fields
        const validateReqs = validateReq("validateDeletePesquisa", req.params)
        let validate = [validateReqs]
            .flat()
            .filter(item => item !== undefined)
        if (validate.length > 0) {
            return res.status(400).json({ Error: validate })
        }

        try{
            response = await deletePesquisa(req.params)

            if (response === 'Ok')
                res.status(200).json({ Message: 'All documents deleted!' })
            else
                res.status(400).json({ Message: response })

        }
        catch(err){
            res.status(400).json({Message: err.message})
        }
    },

    async findBySeq_Usu(req, res){
        // Validate fields
        const validateReqs = validateReq("validateFindPesquisadorBySeq_Usu", req.params)
        let validate = [validateReqs]
            .flat()
            .filter(item => item !== undefined)
        if (validate.length > 0) {
            return res.status(400).json({ Error: validate })
        }

        try{
            const response = await getPesquisaBySeq_Usu(req.params)

            if (response.rows.length > 0)
                res.status(200).json({ Message: response.rows })
            else
                res.status(400).json({ Message: 'No documents were found!' })
        }
        catch(err){
            res.status(400).json({Message: err.message})
        }
    },

    async findBySeq_Pes(req, res){
        // Validate fields
        const validateReqs = validateReq("validateFindPesquisadoresBySeq_Pes", req.params)
        let validate = [validateReqs]
            .flat()
            .filter(item => item !== undefined)
        if (validate.length > 0) {
            return res.status(400).json({ Error: validate })
        }

        try{
            const response = await getPesquisaBySeq_Pes(req.params)

            if (response.rows.length > 0)
                res.status(200).json({ Message: response.rows })
            else
                res.status(400).json({ Message: 'No documents were found!' })
        }
        catch(err){
            res.status(400).json({Message: err.message})
        }
    },

    async findBySeq_Pro(req, res){
        // Validate fields
        const validateReqs = validateReq("validateFindPesquisadorBySeq_Pro", req.params)
        let validate = [validateReqs]
            .flat()
            .filter(item => item !== undefined)
        if (validate.length > 0) {
            return res.status(400).json({ Error: validate })
        }

        try{
            const response = await getPesquisaBySeq_Pro(req.params)

            if (response.rows.length > 0)
                res.status(200).json({ Message: response.rows })
            else
                res.status(400).json({ Message: 'No documents were found!' })
        }
        catch(err){
            res.status(400).json({Message: err.message})
        }
    }
}

module.exports = async function main(option, req, res){
    await options[option](req, res)
}