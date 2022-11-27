const mongoose = require('mongoose')

const commentSchema  = mongoose.Schema({
text: String,
user: {type: mongoose.SchemaTypes.ObjectId,ref: 'User'},
post: {type: mongoose.SchemaTypes.ObjectId, ref: 'News'}


})
module.exports = mongoose.model('Comment',commentSchema)