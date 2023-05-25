//imports
const express = require('express')
const cors = require('cors')
const signin = require('./routes/signin.route')
//app
const app = express()

//middleware
app.use(cors())
app.use(express.json())
app.use("/api/signin",signin)

// app.post('/api/signin', (req, res) => {
//     console.log(req.body)
//     res.json({status: 'ok'})
// })

module.exports = app

