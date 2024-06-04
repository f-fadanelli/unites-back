const express = require('express')
const cors = require ('cors')
const cookieParser = require('cookie-parser')
const mainRoute = require('./api/routes/routes')
const prefix = '/api/'

class App{
    constructor(){
        this.app = express()
        this.middlewares()
        this.routes()
    }

    middlewares(){
        this.app.use(express.json({limit: '500mb'}))
        this.app.use(express.urlencoded({limit: '500mb', extended: true, parameterLimit: 500000}))

        this.app.use((req, res, next)=>{
            const origin = req.get('Origin') ? req.get('Origin') : '*'
            res.header('Access-Control-Allow-Origin', origin)

            // res.header('Access-Control-Allow-Origin', '*')
            res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH, OPTIONS')
            res.header('Access-Control-Allow-Headers', '*, access-control-allow-headers, x-authorization-method, accept-language, authentication, referer, cache-control, Access, Content-type, Authorization, Accept, Origin, X-Requested-With, x-api-key, x-ms-access-token, access-control-allow-origin')
            res.header('Access-Control-Allow-Credentials', 'true')
            
            this.app.use(cors())
            next()
        })


    }

    routes(){
        this.app.use(`${prefix}`, mainRoute)
    }
}

module.exports = new App().app;