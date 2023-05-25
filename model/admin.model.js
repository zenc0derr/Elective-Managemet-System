const mongoose = require('mongoose')

const admin = new mongoose.Schema({
    name: {type: String, required: true},
    admin_id: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    email:  {type: String, required: true, unique: true},
},
{collection: 'admin_info'}
)

const model = mongoose.model('admin_info', admin)

module.exports = model