const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Joi = require("joi");

// Account Schema
const AccountSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  enabled: { type: Boolean, required: true, default: false },
  registeredDate: { type: Date, default: Date.now() }
});

const userSchema = Joi.object().keys({
  email: Joi.string()
    .required()
    .email({ minDomainAtoms: 2 })
    .error(new Error("Invalid email")),
  password: Joi.string()
    .min(6)
    .max(30)
    .required()
    .error(new Error("Invalid password"))
});

const Account = (module.exports = mongoose.model("Account", AccountSchema));

module.exports.getAccountById = function(id, callback) {
  Account.findById(id, callback);
};

module.exports.getAccountByIdAsync = async function(id) {
  account = await Account.findById(id);
  if (!account) {
    throw new Error("Account not found");
  }
  return account;
};

module.exports.getAccountByStrId = async function(strId) {
  var id = mongoose.Types.ObjectId;
  if (id.isValid(strId)) {
    id = mongoose.Types.ObjectId(strId);
    account = await Account.findById(id);
    if (account) {
      return account;
    }
  }
  throw new Error("Account not found");
};

module.exports.getAccountByEmail = async function(email) {
  const query = { email: email };
  account = await Account.findOne(query, { __v: 0 });

  if (!account) {
    throw new Error("Email not registered");
  }
  return account;
};

module.exports.addAccount = async function(newAccount) {
  const joiResult = Joi.validate(newAccount, userSchema);
  if (joiResult.error) {
    throw joiResult.error;
  }
  account = new Account({
    email: newAccount.email,
    password: newAccount.password
  });
  salt = await bcrypt.genSalt(10);
  hash = await bcrypt.hash(account.password, salt);
  account.password = hash;
  try {
    return await account.save();
  } catch (ex) {
    if (ex.code == 11000) {
      throw new Error("Email registered before");
    } else {
      throw ex;
    }
  }
};

module.exports.comparePassword = async function(candidatePassword, hash) {
  return await bcrypt.compare(candidatePassword, hash);
};

module.exports.changePassword = async function(account, newPassword) {
  salt = await bcrypt.genSalt(10);
  hash = await bcrypt.hash(newPassword, salt);
  account.password = hash;
  return await account.save();
};
