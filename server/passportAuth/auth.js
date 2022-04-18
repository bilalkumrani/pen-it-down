const passport = require("passport");
const { User } = require("../database/databaseSchema");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const dotenv = require("dotenv").config();
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "secret_key";
passport.use(
  new JwtStrategy(opts, function (jwt_payload, done) {
    // console.log(jwt_payload);
    User.findById(jwt_payload.id, (err, user) => {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  })
);
