const {getInstituicao} = require("../../library/api/endpoint")

const options = {
    async find(req, res){
        const response = await getInstituicao()
        res.status(200).json({Message: response})
    }
}
module.exports = async function main(option, req, res){
    await options[option](req, res)
}