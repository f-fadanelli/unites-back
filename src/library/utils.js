const schema = require('../../schemas/schemas')

module.exports = {

    //Validar com JOI
    validateReq: function (p_schema, p_param) {
        (Object.entries(p_param)).forEach(item => {
            if (item[1] === undefined) { delete p_param[item[0]] }
        })

        if (Object.keys(p_param).length !== 0) {
            const { value, error } = schema[p_schema](p_param)
            if (error != undefined) {
                const errorResponses = error.details.map(item => item.message)
                return errorResponses
            }
        } else if (Object.keys(p_param).length === 0) {
            return "At least one parameter must be informed!"
        }
    }
}
