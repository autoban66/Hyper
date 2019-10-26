const mongoose = require("mongoose");
const randToken = require("rand-token");

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
  registerDate: { type: Date },
  win: { type: Boolean, default: false }
});

// const Lottery
let Lottery = [];
for (let index = 48; index < 58; index++) {
  char = String.fromCharCode(index);
  Lottery[char] = mongoose.model("Lottery_" + char, LotterySchema);
}
for (let index = 97; index < 123; index++) {
  char = String.fromCharCode(index);
  Lottery[char] = mongoose.model("Lottery_" + char, LotterySchema);
}

module.exports.updateLotteryByCode = async function(code, userInfo) {
  const query = { code };
  lottery = await Lottery[code.charAt(0)].findOne(query);

  if (!lottery) {
    return { success: false, message: __("Invalid lottery code") };
  }

  if (lottery.registerDate) {
    return { success: false, message: __("Code registered before") };
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
  return { success: true, message: __("Code registered successfuly") };
};

module.exports.addLottery = async function(code) {
  let newLottery = new Lottery[code.charAt(0)]({
    code: code
  });

  return await newLottery.save();
};

module.exports.getCount = async function(from, to) {
  let query = {};
  query["registerDate"] = { $gte: "1900-01-01" };
  if (from) {
    query["registerDate"]["$gte"] = from;
  }
  if (to) {
    query["registerDate"]["$lte"] = to;
  }
  let sum = 0;
  for (let index = 48; index < 58; index++) {
    char = String.fromCharCode(index);
    let count = await Lottery[char].find(query).countDocuments();
    sum = sum + count;
  }
  for (let index = 97; index < 123; index++) {
    char = String.fromCharCode(index);
    let count = await Lottery[char].find(query).countDocuments();
    sum = sum + count;
  }
  return sum;
};

module.exports.selectWinner = async function() {
  let num = randToken.generate(1, "0123456789abcdefghijklmnopqrstuvwxyz");
  let lotteryCode = await Lottery[num].aggregate([
    { $match: { win: false, registerDate: { $exists: true } } },
    { $sample: { size: 1 } }
  ]);
  lotteryCode.win = true;
  lotteryCode.save();
  return lotteryCode;
};
