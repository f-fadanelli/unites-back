

const options = {
    async find(req, res){
        res.status(200).json({Message: 'API de consulta de pesquisadores'})
    }
}
module.exports = async function main(option, req, res){
    await options[option](req, res)
}