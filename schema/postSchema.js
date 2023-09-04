const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    authourid: { type: String, required: true },
    authourname: { type: String, required: true },
    postbody: { type: String, required: true },
    posttitle: { type: String }
})

module.exports = mongoose.model("Posts", postSchema)