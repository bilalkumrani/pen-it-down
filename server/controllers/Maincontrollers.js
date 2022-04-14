const { User } = require("../database/databaseSchema");
const bcrypt = require("bcrypt");
const joi = require("@hapi/joi");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

exports.register = (req, res) => {
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
        return;
      }
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
  });
};

exports.login = (req, res) => {
  User.findOne({ email: req.body.email }).then((user) => {
    if (!user) {
      return res.status(401).send({ message: "User Not Found" });
    }
    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(401).send({ message: "Incorrect Password" });
    }

    const payload = {
      id: user._id,
      name: user.firstname,
    };

    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    return res.status(200).json({
      message: "Logged in",
      token: "Bearer " + token,
    });
  });
};

exports.protected = (req, res) => {
  res.status(200).json({
    user: {
      id: req.user.id,
      Name: req.user.firstname,
    },
  });
};
