const express = require("express");
const cors = require("cors");

const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const User = require("../model/userData");
app.use(cors());
mongoose.connect("mongodb://localhost:27017/pb-project", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const db = mongoose.connection;

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // to enable calls from every domain
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  ); // allowed actiosn
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200); // to deal with chrome sending an extra options request
  }

  next(); // call next middlewer in line
});

db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Database connected"));

app.use(bodyParser.json());

// app.get("/user", function (req, res) {
//   User.find({}, function (err, users) {
//     if (err) {
//       res.send("Something went wrong");
//     }
//     res.json(users);
//   });
// });

app.get("/user/:username", function (req, res) {
  User.findOne({ username: req.params.username })
    .then((userFound) => {
      if (!userFound) {
        return res.status(404).json("Something went wrong");
      }
      return res.status(200).json(userFound);
    })
    .catch((mongooseErr) => {
      res.status("200").send(mongooseErr);
    });
});

app.post("/add", function (req, res) {
  let addData = {
    name: req.body.name,
    username: req.body.username,
  };
  console.log("Server js data: " + addData);

  User.create(addData)
    .then((data) => {
      data = data.save();
      res.json(data);
      //mongoose.connection.close();
    })
    .catch((mongooseErr) => {
      res.status("200").send(mongooseErr);
    });
});

app.listen(3050, () => console.log("Server Started"));
