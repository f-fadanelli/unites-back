require('dotenv')
const assert = require('assert')
const { describe, it } = require('mocha')
const { Pool } = require("pg");

describe('Conexão com bando de dados', function() {
    it('A aplicação deve se conectar ao banco de dados', async function () {
        try {
            const pool = new Pool({
                user: process.env.POSTGRES_USER,
                host: process.env.POSTGRES_HOST,
                database: process.env.POSTGRES_DATABASE,
                password: process.env.POSTGRES_PASSWORD,
                port: process.env.POSTGRES_PORT,
                idleTimeoutMillis: 300
            });
            assert(pool.connect(), 'A conexão com o banco de dados ocorreu com sucesso.');
        }catch(error){
            throw(error)
        }
    })
})

describe('Verificação de resposta de API', function() {
    it('A aplicação deve receber API com status 200', async function () {
        try {
            const url = "http://localhost:3000/api/usuario/pesquisador";
            const response = await fetch(url);
            
            assert(response.status===200, 'A aplicação recebeu status 200 da API.');
        }catch(error){
            throw(error)
        }
    })
})