const Joi = require('joi');

const Lottery = require('../../models/lottery');
const Util = require('../../middlewares/Util');
const UserInfoSchema = require('../../models/userInfo');

module.exports = async (req, res, next) => {
  let start = new Date();
  const joiResult = Joi.validate(req.body, UserInfoSchema);
  if (joiResult.error) {
    throw joiResult.error;
  }

  const nationalCode = req.body.nationalCode;
  const codes = req.body.codes;
  if (!Util.checkNatiionalCode(nationalCode)) {
    throw new Error('Invalid national code');
  }

  let result = [];
  for (let index = 0; index < codes.length; index++) {
    result[index] = await Lottery.updateLotteryByCode(codes[index], req.body);
  }
  let runTime = (new Date() - start) / 1000 + 's';
  res.json({ time: runTime, result });
  next();
};
