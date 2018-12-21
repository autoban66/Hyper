const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const config = require("config");
const randToken = require("rand-token");

const Lottery = require("../models/lottery");
const Util = require("../middlewares/Util");

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

// Add Random Code to DB
router.post("/register", async (req, res, next) => {
  var start = new Date();
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const nationalCode = req.body.nationalCode;
  const mobileNumber = req.body.mobileNumber;
  const gender = req.body.gender;
  const birthDate = req.body.birthDate;
  const address = req.body.address;
  const codes = req.body.codes;
  if (!Util.checkNatiionalCode(nationalCode)) {
    throw new Error("Invalid national code");
  }
  if (!Util.checkMobileNumber(mobileNumber)) {
    throw new Error("Invalid mobile number");
  }
  var userInfo = {
    firstName: firstName,
    lastName: lastName,
    nationalCode: nationalCode,
    mobileNumber: mobileNumber,
    gender: gender,
    birthDate: birthDate,
    address: address
  };
  var result = [];
  for (let index = 0; index < codes.length; index++) {
    result[index] = await Lottery.updateLotteryByCode(codes[index], userInfo);
  }
  var runTime = (new Date() - start) / 1000 + "s";
  return res.json({ success: true, time: runTime, result: result });
});

module.exports = router;
