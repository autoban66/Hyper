const Lottery = require('../../models/lottery');

module.exports = async (req, res, next) => {
  let start = new Date();
  from = req.query.from;
  to = req.query.to;

  let count = await Lottery.getCount(from, to);
  var runTime = (new Date() - start) / 1000 + 's';
  res.json({ time: runTime, count });
  next();
};
