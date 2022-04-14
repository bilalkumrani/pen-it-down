const express = require("express");
const router = express.Router();
const passport = require("passport");
const controller = require("../controllers/Maincontrollers");

require("../passportAuth/auth");

router.post("/register", controller.register);
router.post("/login", controller.login);
router.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  controller.protected
);

module.exports = router;
