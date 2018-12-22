const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const config = require("config");

const Account = require("../models/account");

// Register
router.post("/register", async (req, res, next) => {
  account = await Account.addAccount(req.body);
  return res.json({
    success: true,
    account: account
  });
});

// Authenticate
router.post("/authenticate", async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  account = await Account.getAccountByEmail(email);
  if (!account.enabled) {
    throw new Error("Your Account not enabled yet by admin, please contact to admin");
  }
  isMatch = await Account.comparePassword(password, account.password);
  if (isMatch) {
    const token = jwt.sign(account.toJSON(), config.get("JWTsecret"), {
      expiresIn: 604800 // 1 week in sec
    });
    account["password"] = "***";
    return res.json({
      success: true,
      token: "JWT " + token,
      account: account
    });
  } else {
    throw new Error("Wrong Password");
  }
});

// Change Password
router.post("/changepassword", [passport.authenticate("jwt", { session: false })], async (req, res, next) => {
  const email = req.account.email;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;
  account = await Account.getAccountByEmail(email);

  isMatch = await Account.comparePassword(oldPassword, account.password);
  if (isMatch) {
    account = await Account.changePassword(account, newPassword);
    return res.json({
      success: true,
      msg: __("Password changed successfuly")
    });
  } else {
    throw new Error("Wrong Old Password");
  }
});

module.exports = router;
