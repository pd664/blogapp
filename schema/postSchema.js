const mongoose = require('mongoose');

const postSchema  = mongoose.Schema({
    // id : {
    //     type: mongoose.Schema.Types.ObjectId,
    //     index: true,
    //     required: true,
    //     auto: true,
    // },
  authourid: { type: String, required: true },
  authourname: { type: String, required: true },
  postbody: { type: String, required: true },
  posttitle: { type: String },
});

module.exports = mongoose.model("Posts", postSchema)