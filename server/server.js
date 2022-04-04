const express = require("express");
const res = require("express/lib/response");
const mongoose = require("mongoose");
const connectDB = require("./mondbConnection");
const { User } = require("./databaseSchema");
const bcrypt = require("bcrypt");
const cors = require("cors");
const joi = require("@hapi/joi");

const PORT = 5000;

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
        firstname: joi.string().required(),
        lastname: joi.string().required(),
        email: joi.string().trim().required().email(),
        password: joi.string().min(8).required(),
      });

      const result = schema.validate(req.body);
      if (result.error) {
        res.send(result.error.details[0].message);
      } else {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const email = result.value.email;
        const firstname = result.value.firstname;
        const lastname = result.value.lastname;
        const newUser = new User({
          firstname: firstname,
          lastname: lastname,
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

app.listen(PORT, () => {
  console.log(`server is runing on port ${PORT}...`);
});
