const express = require("express");

const router = express.Router();

const Users = require("../model/userData");

//Getting all
// router.get("", async (req, res) => {
//   try {
//     const users = await Users.find();
//     res.json(users);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

//Getting One user data
router.get("/:id", (req, res) => {
  res.send(res.user);
});

//Creating one
//router.post("/", (req, res) => {});

//Updating info
//router.patch("/:id", (req, res) => {});

//Delete Info
//router.delete("/:id", (req, res) => {});

async function getUser(req, res, next) {
  let user;
  try {
    user = await Users.find(req.params._id);
    if (user == null) {
      return res.status(404).json({ message: "Cannot find subscriber" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.user = user;
  next();
}

module.exports = router;
