const passport = require("passport");
const router = require("express").Router();

const add = require("./add");
const register = require("./register");
const count = require("./count");

router.post(
  "/",
  [passport.authenticate("jwt", { session: false })],
  async (req, res, next) => {
    add(req, res, next);
  }
);

router.post("/register", async (req, res, next) => {
  register(req, res, next);
});

router.get(
  "/count",
  [passport.authenticate("jwt", { session: false })],
  async (req, res, next) => {
    count(req, res, next);
  }
);

module.exports = router;
