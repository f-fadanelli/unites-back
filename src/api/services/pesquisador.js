const {getPesquisador} = require("../../library/api/endpoint")

const options = {
    async find(req, res){
        try{
            const response = await getPesquisador()
            if (response.rows.lenght > 0)
                res.status(200).json({ Result: response.rows })
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