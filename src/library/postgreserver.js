require('dotenv').config()
const { Pool } = require("pg");

const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DATABASE,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT,
    idleTimeoutMillis: 300
});

const poolPromise = pool
    .connect()
    .then(pool=>{
        console.log('Connected to Postgtresql')
        return pool
    })
    .catch(err => console.log('Connection failed! Bad config: ', err))

module.exports = {poolPromise};