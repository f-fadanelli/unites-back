const BaseJoi = require('joi')
const JoiDate = require('@joi/date')
const Joi = BaseJoi.extend(JoiDate)
let schema

module.exports = {

    validateInsertArea: function (params) {
        try {
            schema = Joi.object({
                nom_are: Joi.string().required()
            }).options({ abortEarly: false })

            return schema.validate(params)
        }
        catch (e) {
            console.log(e);
        }
    },

    validateUpdateArea: function (params) {
        try {
            schema = Joi.object({
                nom_are: Joi.string().required(),
                seq_are: Joi.number().required()
            }).options({ abortEarly: false })

            return schema.validate(params)
        }
        catch (e) {
            console.log(e);
        }
    },

    validateDeleteArea: function (params) {
        try {
            schema = Joi.object({
                seq_are: Joi.number().required()
            }).options({ abortEarly: false })

            return schema.validate(params)
        }
        catch (e) {
            console.log(e);
        }
    },

    validateInsertInstituicao: function (params) {
        try {
            schema = Joi.object({
                cod_cnpj_ins:Joi.string().required(),
                nom_sigla_ins: Joi.string().required(),
                nom_ins: Joi.string().required()            
            }).options({ abortEarly: false })

            return schema.validate(params)
        }
        catch (e) {
            console.log(e);
        }
    },

    validateUpdateInstituicao: function (params) {
        try {
            schema = Joi.object({
                cod_cnpj_ins:Joi.string().required(),
                nom_sigla_ins: Joi.string().required(),
                nom_ins: Joi.string().required(),
                seq_ins: Joi.number().required()
            }).options({ abortEarly: false })

            return schema.validate(params)
        }
        catch (e) {
            console.log(e);
        }
    },

    validateDeleteInstituicao: function (params) {
        try {
            schema = Joi.object({
                seq_ins: Joi.number().required()
            }).options({ abortEarly: false })

            return schema.validate(params)
        }
        catch (e) {
            console.log(e);
        }
    },

    validateFindUsuarioLogin: function (params) {
        try {
            schema = Joi.object({
                cod_senha_usu: Joi.string().required(),
                cod_cpf_usu: Joi.string().required()
            }).options({ abortEarly: false })

            return schema.validate(params)
        }
        catch (e) {
            console.log(e);
        }
    },

    validateInsertUsuario: function (params) {
        try {
            schema = Joi.object({
                cod_cpf_usu:Joi.string().required(),
                nom_completo_usu: Joi.string().required(),
                cod_senha_usu: Joi.string().required(),
                pesquisador: Joi.boolean().required(),
                seq_gra: Joi.number().optional().allow(null),
                seq_ins: Joi.number().optional().allow(null)          
            }).options({ abortEarly: false })

            return schema.validate(params)
        }
        catch (e) {
            console.log(e);
        }
    },

    validateUpdateUsuario: function (params) {
        try {
            schema = Joi.object({
                seq_usu: Joi.number().required(),
                cod_cpf_usu:Joi.string().required(),
                nom_completo_usu: Joi.string().required(),
                cod_senha_usu: Joi.string().required(),
                pesquisador: Joi.boolean().required(),
                des_formacao_usu: Joi.string().optional().allow(''),
                seq_gra: Joi.number().optional().allow(null),
                seq_ins: Joi.number().optional().allow(null) 
            }).options({ abortEarly: false })

            return schema.validate(params)
        }
        catch (e) {
            console.log(e);
        }
    },

    validateDeleteUsuario: function (params) {
        try {
            schema = Joi.object({
                seq_usu: Joi.number().required()
            }).options({ abortEarly: false })

            return schema.validate(params)
        }
        catch (e) {
            console.log(e);
        }
    },
}
