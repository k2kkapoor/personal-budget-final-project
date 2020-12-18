const express = require("express");
const cors = require("cors");

const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const User = require("../model/userData");

const Expenses = require("../model/userExpenses");
const { ObjectId } = require("mongodb");
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

app.post("/expenses", function (req, res) {
  //console.log("post body: " + req.body.username);
  Expenses.find({ username: req.body.username })
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

//Get user data
// app.get("/expenses/:username", (req, res) => {
//   Expenses.find({ username: req.params.username })
//     .then((userFound) => {
//       if (!userFound) {
//         return res.status(404).json("Something went wrong");
//       }
//       return res.status(200).json(userFound);
//     })
//     .catch((mongooseErr) => {
//       res.status("200").send(mongooseErr);
//     });
// });

//Add new user to database
app.post("/addUser", function (req, res) {
  let addData = {
    name: req.body.name,
    username: req.body.username,
  };

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

//Add new expense data
app.post("/addNewData", function (req, res) {
  console.log(req.body.month);
  let addData = {
    username: req.body.username,
    title: req.body.title,
    amount: req.body.amount,
    category: req.body.category,
    date: req.body.date,
    month: req.body.month,
    year: req.body.year,
  };

  Expenses.create(addData)
    .then((data) => {
      data = data.save();
      res.json(data);
      //mongoose.connection.close();
    })
    .catch((mongooseErr) => {
      res.status("200").send(mongooseErr);
    });
});

//Update expense data
app.post("/updateData", function (req, res) {
  let addData = {
    $set: {
      username: req.body.username,
      title: req.body.title,
      amount: req.body.amount,
      category: req.body.category,
      date: req.body.date,
    },
  };

  Expenses.findByIdAndUpdate(
    req.body.id,
    addData,
    { useFindAndModify: false },
    function (err) {
      if (err) {
        res.send(err);
      }
    }
  );
});

//Delete
app.post("/deleteData", function (req, res) {
  console.log("id: " + req.body.id);
  Expenses.findByIdAndDelete(
    req.body.id,
    { useFindAndModify: false },
    function (err) {
      if (err) {
        res.send(err);
      }
    }
  );
});

//get data by month and year
app.post("/chartData", function (req, res) {
  console.log(
    "username: " +
      req.body.username +
      " month: " +
      req.body.month +
      " month: " +
      req.body.year
  );
  Expenses.find({
    username: req.body.username,
    month: req.body.month,
    year: req.body.year,
  })
    .then((userFound) => {
      if (!userFound) {
        return res.status(404).json("Something went wrong");
      }
      console.log("found data " + userFound);
      return res.status(200).json(userFound);
    })
    .catch((mongooseErr) => {
      res.status("200").send(mongooseErr);
    });
});

//Get aggregate of Category
app.post("/groupData", function (req, res) {
  console.log(
    "username: " +
      req.body.username +
      " month: " +
      req.body.month +
      " year: " +
      req.body.year
  );
  var pipeline = [
    {
      $match: {
        username: req.body.username,
        month: req.body.month,
        year: req.body.year,
      },
    },

    {
      $group: {
        _id: "$category",
        total: {
          $sum: "$amount",
        },
      },
    },
  ];

  Expenses.aggregate(pipeline).exec(function (err, result) {
    if (err) {
      res.status("500").send(err);
      return;
    }
    console.log(result);
    res.json(result);
  });
});

app.listen(3050, () => console.log("Server Started"));
