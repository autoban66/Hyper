const randToken = require("rand-token");

const Lottery = require("../../models/lottery");
const config = require("config");

module.exports = async (req, res, next) => {
  let start = new Date();
  const count = req.body.count;
  let winners = [];
  for (let index = 0; index < count; index++) {
    winners.push(await Lottery.selectWinner());
  }
  let runTime = (new Date() - start) / 1000 + "s";
  res.json({ winners, time: runTime });
  next();
};
