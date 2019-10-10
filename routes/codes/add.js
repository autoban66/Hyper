const randToken = require('rand-token');

const Lottery = require('../../models/lottery');

module.exports = async (req, res, next) => {
  let start = new Date();
  const count = req.body.count;
  for (let index = 0; index < count; index++) {
    await Lottery.addLottery(
      randToken.generate(10, '0123456789abcdefghijklmnopqrstuvwxyz')
    );
  }
  var runTime = (new Date() - start) / 1000 + 's';
  res.json({ time: runTime });
  next();
};
