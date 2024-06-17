const { deleteEmpresa, updateEmpresa, getEmpresaByCnpjAndDifferentSeqEmp, insertEmpresa, getEmpresa } = require("../../library/api/endpoint")
const { validateReq } = require('../../library/utils')

const options = {
    async find(req, res){
        try{
            const response = await getEmpresa()

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
        const validateReqs = validateReq("validateInsertEmpresa", req.body)
        let validate = [validateReqs]
            .flat()
            .filter(item => item !== undefined)
        if (validate.length > 0) {
            return res.status(400).json({ Error: validate })
        }

        try{
            let response = await getEmpresaByCnpjAndDifferentSeqEmp(req.body)

            if(response.rows.length>0)
                res.status(400).json({ Message: 'Company with informed CNPJ allready exists!' })
            else{

                response = await insertEmpresa(req.body)

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
        const validateReqs = validateReq("validateUpdateEmpresa", req.body)
        let validate = [validateReqs]
            .flat()
            .filter(item => item !== undefined)
        if (validate.length > 0) {
            return res.status(400).json({ Error: validate })
        }

        try{
            let response = await getEmpresaByCnpjAndDifferentSeqEmp(req.body)

            if(response.rows.length>0)
                res.status(400).json({ Message: 'Company with informed CNPJ allready exists!' })
            else{

                response = await updateEmpresa(req.body)

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
        const validateReqs = validateReq("validateDeleteEmpresa", req.params)
        let validate = [validateReqs]
            .flat()
            .filter(item => item !== undefined)
        if (validate.length > 0) {
            return res.status(400).json({ Error: validate })
        }

        try{
            response = await deleteEmpresa(req.params)

            if (response === 'Ok')
                res.status(200).json({ Message: 'All documents deleted!' })
            else
                res.status(400).json({ Message: response })

        }
        catch(err){
            res.status(400).json({Message: err.message})
        }
    }
}

module.exports = async function main(option, req, res){
    await options[option](req, res)
}