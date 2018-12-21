const mongoose = require("mongoose");

// Lottery Schema
const LotterySchema = mongoose.Schema({
  code: { type: String, required: true, unique: true, lowercase: true },
  firstName: { type: String },
  lastName: { type: String },
  nationalCode: { type: String },
  mobileNumber: { type: String },
  gender: { type: String, enum: ["Male", "Female"] },
  birthDate: { type: Date },
  address: { type: String },
  registerDate: { type: Date }
});

// const Lottery
var Lottery = [];
for (let index = 48; index < 58; index++) {
  char = String.fromCharCode(index);
  Lottery[char] = module.exports = mongoose.model("Lottery_" + char, LotterySchema);
}
for (let index = 97; index < 123; index++) {
  char = String.fromCharCode(index);
  Lottery[char] = module.exports = mongoose.model("Lottery_" + char, LotterySchema);
}

module.exports.updateLotteryByCode = async function(code, userInfo) {
  const query = { code: code };
  lottery = await Lottery[code.charAt(0)].findOne(query);

  if (!lottery) {
    return { success: false, message: "Invalid code" };
  }

  if (lottery.registerDate) {
    return { success: false, message: "Code registered before" };
  }
  lottery.firstName = userInfo.firstName;
  lottery.lastName = userInfo.lastName;
  lottery.nationalCode = userInfo.nationalCode;
  lottery.mobileNumber = userInfo.mobileNumber;
  lottery.gender = userInfo.gender;
  lottery.birthDate = userInfo.birthDate;
  lottery.address = userInfo.address;
  lottery.registerDate = new Date();
  await lottery.save();
  return { success: true, message: "Code registered" };
};

module.exports.addLottery = async function(code) {
  var newLottery = new Lottery[(code.charAt(0))]({
    code: code
  });

  return await newLottery.save();
};
