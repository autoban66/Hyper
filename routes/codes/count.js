const Lottery = require("../../models/lottery");

module.exports = async (req, res, next) => {
  let start = new Date();
  const from = req.query.from;
  const to = req.query.to;

  let count = await Lottery.getCount(from, to);
  let runTime = (new Date() - start) / 1000 + "s";
  res.json({ time: runTime, count });
  next();
};
