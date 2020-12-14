const { ObjectID } = require("mongodb");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  username: {
    type: String,
    trim: true,
  },
  expense: [
    {
      id: {
        type: ObjectID,
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
        type: Date,
      },
    },
  ],
});

module.exports = mongoose.model("users", userSchema);
