const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const config = require("config");
const randToken = require("rand-token");
const Joi = require("joi");

const Lottery = require("../models/lottery");
const Util = require("../middlewares/Util");
const UserInfoSchema = require("../models/userInfo");

// Add Random Code to DB
router.post("/add", async (req, res, next) => {
  var start = new Date();
  const count = req.body.count;
  for (let index = 0; index < count; index++) {
    await Lottery.addLottery(randToken.generate(10, "0123456789abcdefghijklmnopqrstuvwxyz"));
  }
  var runTime = (new Date() - start) / 1000 + "s";
  return res.json({ success: true, time: runTime });
});

// Register Code to DB
router.post("/register", async (req, res, next) => {
  var start = new Date();
  const joiResult = Joi.validate(req.body, UserInfoSchema);
  if (joiResult.error) {
    throw joiResult.error;
  }

  const nationalCode = req.body.nationalCode;
  const codes = req.body.codes;
  if (!Util.checkNatiionalCode(nationalCode)) {
    throw new Error("Invalid national code");
  }

  var result = [];
  for (let index = 0; index < codes.length; index++) {
    result[index] = await Lottery.updateLotteryByCode(codes[index], req.body);
  }
  var runTime = (new Date() - start) / 1000 + "s";
  return res.json({ success: true, time: runTime, result: result });
});

// code counts
router.post("/counts", [passport.authenticate("jwt", { session: false })], async (req, res, next) => {
  var start = new Date();
  from = req.body.from;
  to = req.body.to;

  count = await Lottery.getCount(from, to);
  var runTime = (new Date() - start) / 1000 + "s";
  return res.json({ success: true, time: runTime, count: count });
});

module.exports = router;
