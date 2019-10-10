const Account = require('../../models/account');

module.exports = async (req, res, next) => {
  const email = req.account.email;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;
  let account = await Account.getAccountByEmail(email);
  let isMatch = await Account.comparePassword(oldPassword, account.password);
  if (!isMatch) {
    throw new Error('Wrong Old Password');
  }
  account = await Account.changePassword(account, newPassword);
  res.json({ msg: __('Password changed successfuly') });
  next();
};
