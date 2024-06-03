const {getAreaAcademica, getAreaAcademicaByNameAndDifferentSeqAre, insertArea, updateArea, deleteArea} = require("../../library/api/endpoint")

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