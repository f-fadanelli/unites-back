const { getFinanciamentoBySeq_Pro } = require("../../library/api/endpoint")
const { validateReq } = require('../../library/utils')

const options = {

    async findBySeq_Pro(req, res){
        // Validate fields
        const validateReqs = validateReq("validateGetFinanciamentoBySeq_Pro", req.params)
        let validate = [validateReqs]
            .flat()
            .filter(item => item !== undefined)
        if (validate.length > 0) {
            return res.status(400).json({ Error: validate })
        }

        try{
            const response = await getFinanciamentoBySeq_Pro(req.params)

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