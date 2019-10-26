const randToken = require("rand-token");

const Lottery = require("../../models/lottery");
const config = require("config");

module.exports = async (req, res, next) => {
  let start = new Date();
  const count = req.body.count;
  for (let index = 0; index < count; index++) {
    await Lottery.addLottery(
      randToken.generate(
        config.get("lotteryCodeLength"),
        "0123456789abcdefghijklmnopqrstuvwxyz"
      )
    );
  }
  let runTime = (new Date() - start) / 1000 + "s";
  res.json({ time: runTime });
  next();
};
