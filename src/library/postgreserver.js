require('dotenv').config()
const { Pool } = require("pg");

const user = process.env.POSTGRES_USER
const host = process.env.POSTGRES_HOST
const database = process.env.POSTGRES_DATABASE
const password = process.env.POSTGRES_PASSWORD

const pool = new Pool({
    connectionString: `postgres://${user}:${password}@${host}/${database}?sslmode=require`,
    idleTimeoutMillis: 3000
});

const poolPromise = pool
    .connect()
    .then(pool=>{
        console.log('Connected to Postgtresql')
        return pool
    })
    .catch(err => console.log('Connection failed! Bad config: ', err))

module.exports = {poolPromise};