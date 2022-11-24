const mongoose = require('mongoose')

const UserSchema= mongoose.Schema({
login: {type: String,required: true,unique: true},
password: {type: String, required: true},

roles: [{type: String, ref: 'Role'}],
})
module.exports = mongoose.model('User',UserSchema)