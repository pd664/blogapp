require("dotenv").config();
var bcrypt = require("bcryptjs");
const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const utils = require("./utils");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 4000
const Credentials = require("./schema/credentiialSchema");
const Posts = require("./schema/postSchema");
const db1 = "mongodb+srv://pd664:parteek123@cluster0.ftmdt.mongodb.net/blog?retryWrites=true&w=majority";
mongoose
  .connect(db1 || `mongodb://localhost/blogdemoappreact`, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log(`connection successfull`);
  })
  .catch((err) => console.log(err));


app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  var token = req.headers["authorization"];
  if (!token) return next(); //if no token, continue

  token = token.replace("Bearer ", "");
  jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
    if (err) {
      return res.status(401).json({
        error: true,
        message: "Invalid user.",
      });
    } else {
      req.user = user;
      next();
    }
  });
});

app.post("/users/signup", (req, res) => {
  const name = req.body.name;
  const user = req.body.username;
  const pwd = req.body.password;
  if (!name || !user || !pwd) {
    return res.status(400).json({
      error: true,
      message: "Please enter all details",
    });
  }

  const signup = new Credentials({
    name: name,
    username: user,
    password: pwd,
  });
  Credentials.find({ username: user }, (err, result) => {
    if (err) {
      return res.status(400).json({
        error: true,
        message: err,
      });
    } else if (result.length < 1) {
      signup.save();

      return res.status(200).json({
        error: false,
        message: "Account created successfully",
      });
    } else if (result.length >= 1) {
      return res.status(400).json({
        error: true,
        message: "Username already taken",
      });
    }
  });
});

app.post("/users/signin", function (req, res) {
  const user = req.body.username;
  const pwd = req.body.password;
  if (!user || !pwd) {
    return res.status(400).json({
      error: true,
      message: "Username or Password is required.",
    });
  }


  Credentials.find({ username: user }, (err, data) => {
    if (err) {
      return res.status(400).json({
        error: true,
        message: err,
      });
    } else if (data.length > 0) {
      data.map((row) => {
        if (user == row.username) {
          let a = bcrypt.compareSync(pwd, row.password);

          if (a == true) {
            const token = utils.generateToken(row);

            const userObj = utils.getCleanUser(row);

            return res.status(200).json({ user: userObj, token });
          }
        } else {
          return res.status(401).json({
            error: true,
            message: "Username or Password is Wrong.",
          });
        }
      });
    } else {
      return res.status(401).json({
        error: true,
        message: "No user found.",
      });
    }
  });
});

app.get("/verifyToken", function (req, res) {
  var token = req.query.token;
  if (!token) {
    return res.status(400).json({
      error: true,
      message: "Token is required.",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
    if (err)
      return res.status(401).json({
        error: true,
        message: "Invalid token.",
      });

    Credentials.find({ username: user.username }, (error, data) => {
      if (error) {
        return res.status(401).json({
          error: true,
          message: error,
        });
      } else if (data) {
        data.forEach((row) => {
          if (user.userId !== row.id) {
            return res.status(401).json({
              error: true,
              message: "Invalid user.",
            });
          }
          var userObj = utils.getCleanUser(row);
          return res.json({ user: userObj, token });
        });
      }
    });
  });
});

app.post("/addpost", (req, res) => {
  let authourid = req.body.userid;
  let authourname = req.body.username;
  let body = req.body.body;
  let title = req.body.title;

  const post = new Posts({
    authourid: authourid,
    authourname: authourname,
    postbody: body,
    posttitle: title,
  });

  post
    .save()
    .then((result) => {
      return res.status(200).json({
        message: "YOUR POSTS HAS PUBLISHED",
      });
    })
    .catch((err) => {
      return res.status(406).json({
        error: true,
        message: err.message,
      });
    });
});

app.post("/user/posts", (req, res) => {
  let token = req.body.token;
  jwt.verify(token, "1234abcd", function (error, user) {
    Posts.find({ authourid: user.userId }, (err, data) => {
      if (err) {
        res.status(404).json({
          error: true,
          message: err.message,
        });
      } else {
        if (data !== []) {
          res.status(200).json({
            message: data,
          });
        }
      }
    });
  });
});

app.post("/deletepost", (req, res) => {
  let id = req.body.id;
  let authourid = req.body.authourid;

  Posts.deleteOne({ _id: id }, { authourid: authourid })
    .then(() => {
      res.status(200).json({
        message: "Are you sure you want to delete that post?",
      });
    })
    .catch((err) => {
      res.status(404).json({
        message: "post not found",
      });
    });
});

app.get("/getall/posts", (req, res) => {
  Posts.find({}, (err, data) => {
    if (err) {
      res.status(404).json({
        message: "Something went wrong",
      });
    } else {
      if (data) {
        res.status(200).json({
          message: data,
        });
      }
    }
  });
});

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('blog/build'))
}

app.listen(port, () => {
  console.log("Server started on: " + PORT);
});
