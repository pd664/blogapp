const express = require('express')
const app = express.Router()
const Posts = require('../schema/postSchema')

app.get("/getAllPost", (req, res) => {
    console.log("posts")
    Posts.find({})
    .then((data) => {
        console.log("data", data)
    })
    .catch((err) => {
       console.log("err", err)
       console.log("err")
    })
  });

module.exports = app
