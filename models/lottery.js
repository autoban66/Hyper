const mongoose = require("mongoose");

// Lottery Schema
const LotterySchema = mongoose.Schema({
  code: { type: String, required: true, unique: true, lowercase: true },
  firstName: { type: String },
  lastName: { type: String }
});

const Lottery = (module.exports = mongoose.model("Lottery", LotterySchema));

module.exports.getLotteryById = function(id, callback) {
  Lottery.findById(id, callback);
};

module.exports.getLotteryByIdAsync = async function(id) {
  lottery = await Lottery.findById(id);
  if (!lottery) {
    throw new Error("Lottery Code not found");
  }
  return lottery;
};

module.exports.getLotteryByStrId = async function(strId) {
  var id = mongoose.Types.ObjectId;
  if (id.isValid(strId)) {
    id = mongoose.Types.ObjectId(strId);
    lottery = await Lottery.findById(id);
    if (lottery) {
      return lottery;
    }
  }
  throw new Error("Lottery Code not found");
};

module.exports.updateLotteryByCode = async function(code, firstName, lastName) {
  const query = { code: code };
  lottery = await Lottery.findOne(query);

  if (!lottery) {
    throw new Error("Invalid Code");
  }

  if (lottery.firstName) {
    // throw new Error("Duplicate Code");
    return;
  }
  lottery.firstName = firstName;
  lottery.lastName = lastName;
  return await lottery.save();
};

module.exports.addLottery = async function(code) {
  var newLottery = new Lottery({
    code: code
  });

  return await newLottery.save();
};
