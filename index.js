//imports
const express = require('express')
const cors = require('cors')
//app
const app = express()

//middleware
app.use(cors())

app.listen(8000, () => {
    console.log('Server started on 8000')
})

