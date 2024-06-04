const {getAreaAcademica, getAreaAcademicaByNameAndDifferentSeqAre, insertArea, updateArea, deleteArea} = require("../../library/api/endpoint")
const { validateReq } = require('../../library/utils')

const options = {
    async find(req, res){
        try{
            const response = await getAreaAcademica()

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
        const validateReqs = validateReq("validateInsertArea", req.body)
        let validate = [validateReqs]
            .flat()
            .filter(item => item !== undefined)
        if (validate.length > 0) {
            return res.status(400).json({ Error: validate })
        }

        try{
            let response = await getAreaAcademicaByNameAndDifferentSeqAre(req.body)

            if(response.rows.length>0)
                res.status(400).json({ Message: 'Area with informed name allready exists!' })
            else{

                response = await insertArea(req.body)

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
        const validateReqs = validateReq("validateUpdateArea", req.body)
        let validate = [validateReqs]
            .flat()
            .filter(item => item !== undefined)
        if (validate.length > 0) {
            return res.status(400).json({ Error: validate })
        }

        try{
            let response = await getAreaAcademicaByNameAndDifferentSeqAre(req.body)

            if(response.rows.length>0)
                res.status(400).json({ Message: 'Area with informed name allready exists!' })
            else{

                response = await updateArea(req.body)

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
        const validateReqs = validateReq("validateDeleteArea", req.params)
        let validate = [validateReqs]
            .flat()
            .filter(item => item !== undefined)
        if (validate.length > 0) {
            return res.status(400).json({ Error: validate })
        }

        try{
            response = await deleteArea(req.params)

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