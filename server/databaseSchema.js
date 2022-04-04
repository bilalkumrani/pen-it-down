const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const User = mongoose.model("user", userSchema);

module.exports = { User };
