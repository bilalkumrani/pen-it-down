const express = require("express");
const res = require("express/lib/response");
const mongoose = require("mongoose");
const connectDB = require("./mondbConnection");
const { User } = require("./databaseSchema");
const bcrypt = require("bcrypt");
const joi = require("@hapi/joi");

connectDB();

const app = express();

app.use(express.json());

app.post("/login", (req, res) => {
  res.send("this is nice");
});

app.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }, async (err, doc) => {
    if (err) throw err;
    if (doc) res.send("User already exists");
    if (!doc) {
      const schema = joi.object({
        email: joi.string().trim().required().email(),
        password: joi.string().min(8).required(),
      });

      const result = schema.validate(req.body);
      if (result.error) {
        res.send(result.error.details[0].message);
      } else {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const email = result.value.email;
        const newUser = new User({
          email: email,
          password: hashedPassword,
        });
        await newUser.save();
        res.send("User created successfully");
      }
    }
  });
});

app.post("/login", (req, res) => {
  res.send("this is nice");
});

app.listen(8080, () => {
  console.log("server is runing...");
});
