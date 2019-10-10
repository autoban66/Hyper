const Account = require('../../models/account');

module.exports = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  let account = await Account.getAccountByEmail(email);
  if (!account.enabled) {
    throw new Error(
      'Your Account not enabled yet by admin, please contact to admin'
    );
  }
  let isMatch = await Account.comparePassword(password, account.password);
  if (!isMatch) {
    throw new Error('Wrong Password');
  }
  const token = jwt.sign(account.toJSON(), config.get('JWTsecret'), {
    expiresIn: 604800 // 1 week in sec
  });
  account['password'] = '***';
  res.json({ token: 'JWT ' + token, account });
  next();
};
