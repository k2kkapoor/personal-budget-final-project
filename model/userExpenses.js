const { ObjectID } = require("mongodb");
const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  id: {
    type: ObjectID,
  },
  username: {
    type: String,
    trim: true,
  },
  title: {
    type: String,
  },
  amount: {
    type: Number,
  },
  category: {
    type: String,
  },
  date: {
    type: String,
  },
  month: {
    type: String,
  },
  year: {
    type: String,
  },
});

module.exports = mongoose.model("expenses", expenseSchema);
