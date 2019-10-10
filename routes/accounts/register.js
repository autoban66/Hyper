const Account = require("../../models/account");

module.exports = async (req, res, next) => {
  account = await Account.addAccount(req.body);
  res.json({ account });
  next();
};
