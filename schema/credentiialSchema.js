// import mongoose, { Schema } from "mongoose";
const mongoose = require('mongoose');
// const Schema = mongoose

const credentilasSchema = mongoose.Schema({
    // id : {
    //     type: mongoose.Schema.Types.ObjectId,
    //     index: true,
    //     required: true,
    //     auto: true,
    // },
  name: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
});



module.exports = mongoose.model("Credentials", credentilasSchema)

// var model2 = mongoose.model("post", postSchema)

// module.exports.credentilasSchema = credentilasSchema;
// module.exports. postSchema = postSchema