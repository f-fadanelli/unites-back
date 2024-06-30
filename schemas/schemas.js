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
    validateInsertEmpresa: function (params) {
        try {
            schema = Joi.object({
                des_emp:Joi.string().required(),
                nom_emp: Joi.string().required()            
            }).options({ abortEarly: false })

            return schema.validate(params)
        }
        catch (e) {
            console.log(e);
        }
    },

    validateUpdateEmpresa: function (params) {
        try {
            schema = Joi.object({
                des_emp:Joi.string().required(),
                nom_emp: Joi.string().required(),
                seq_emp: Joi.number().required()
            }).options({ abortEarly: false })

            return schema.validate(params)
        }
        catch (e) {
            console.log(e);
        }
    },

    validateDeleteEmpresa: function (params) {
        try {
            schema = Joi.object({
                seq_emp: Joi.number().required()
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

    validateConexaoUsuario: function (params) {
        try {
            schema = Joi.object({
                seq_usu_envia: Joi.number().required(),
                seq_usu_recebe: Joi.number().required()
            }).options({ abortEarly: false })

            return schema.validate(params)
        }
        catch (e) {
            console.log(e);
        }
    },

    validateInsertProjeto: function (params) {
        try {
            schema = Joi.object({
                nom_pro: Joi.string().required(), 
                des_pro: Joi.string().required(), 
                dth_inicio_pro: Joi.date().iso().required(), 
                dth_final_pro: Joi.date().iso().optional().allow(null), 
                flg_status_pro: Joi.number().required(), 
                seq_usu_responsavel: Joi.number().required(),
                seq_emp_list: Joi.array().items(Joi.number()).required()          
            }).options({ abortEarly: false })

            return schema.validate(params)
        }
        catch (e) {
            console.log(e);
        }
    },

    validateUpdateProjeto: function (params) {
        try {
            schema = Joi.object({
                seq_pro: Joi.number().required(),
                nom_pro: Joi.string().required(), 
                des_pro: Joi.string().required(), 
                dth_inicio_pro: Joi.date().iso().required(), 
                dth_final_pro: Joi.date().iso().optional().allow(null), 
                flg_status_pro: Joi.number().required(), 
                seq_usu_responsavel: Joi.number().required(),
                seq_emp_list: Joi.array().items(Joi.number()).required()          
            }).options({ abortEarly: false })

            return schema.validate(params)
        }
        catch (e) {
            console.log(e);
        }
    },

    validateDeleteProjeto: function (params) {
        try {
            schema = Joi.object({
                seq_pro: Joi.number().required()
            }).options({ abortEarly: false })

            return schema.validate(params)
        }
        catch (e) {
            console.log(e);
        }
    },

    validateGetFinanciamentoBySeq_Pro: function (params) {
        try {
            schema = Joi.object({
                seq_pro: Joi.number().required()
            }).options({ abortEarly: false })

            return schema.validate(params)
        }
        catch (e) {
            console.log(e);
        }
    },

    validateInsertPesquisa: function (params) {
        try {
            schema = Joi.object({
                nom_pes: Joi.string().required(), 
                des_pes: Joi.string().required(), 
                dth_publicacao_pes: Joi.date().iso().required(), 
                seq_are: Joi.number().required(), 
                seq_pro: Joi.number().required(),
                seq_ins: Joi.number().required(),
                seq_usu_list: Joi.array().items(Joi.number()).required()          
            }).options({ abortEarly: false })

            return schema.validate(params)
        }
        catch (e) {
            console.log(e);
        }
    },

    validateUpdatePesquisa: function (params) {
        try {
            schema = Joi.object({
                seq_pes: Joi.number().required(),
                nom_pes: Joi.string().required(), 
                des_pes: Joi.string().required(), 
                dth_publicacao_pes: Joi.date().iso().required(), 
                seq_are: Joi.number().required(), 
                seq_pro: Joi.number().required(),
                seq_ins: Joi.number().required(),
                seq_usu_list: Joi.array().items(Joi.number()).required()          
            }).options({ abortEarly: false })

            return schema.validate(params)
        }
        catch (e) {
            console.log(e);
        }
    },

    validateDeletePesquisa: function (params) {
        try {
            schema = Joi.object({
                seq_pes: Joi.number().required()
            }).options({ abortEarly: false })

            return schema.validate(params)
        }
        catch (e) {
            console.log(e);
        }
    },

    validateFindPesquisadoresBySeq_Pes: function (params) {
        try {
            schema = Joi.object({
                seq_pes: Joi.number().required()
            }).options({ abortEarly: false })

            return schema.validate(params)
        }
        catch (e) {
            console.log(e);
        }
    },

    validateFindPesquisadorBySeq_Usu: function (params) {
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

    validateFindPesquisadorBySeq_Pro: function (params) {
        try {
            schema = Joi.object({
                seq_pro: Joi.number().required()
            }).options({ abortEarly: false })

            return schema.validate(params)
        }
        catch (e) {
            console.log(e);
        }
    },
}
