const app =  require("./server");
const dotenv = require("dotenv");
const mongoose = require("mongoose")
const mongodb = require("mongodb")
const signinDAO = require("./dao/signin.dao")
dotenv.config()


const port = process.env.port || 8000

const Mongoclient = mongodb.MongoClient


Mongoclient.connect(
    process.env.DATABASE,
    {
        maxPoolSize: 50,
        wtimeoutMS: 2500,
        useNewUrlParser: true
    }
).catch(err => {
    console.log(err.stack)
    process.exit(1)
}).then(async client => {
    await signinDAO.injectDB(client)
    app.listen(port, () => {
        console.log(`listening on port ${port}`)
    })
}) 