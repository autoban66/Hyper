const Log = require("./log");
const winston = require("winston");

module.exports = function(err, req, res, next) {
  winston.error({ message: err.message + " on " + req.originalUrl, stack: err.stack });
  if (err instanceof ReferenceError || err instanceof SyntaxError || err instanceof TypeError) {
    res.json({ success: false, msg: ("Server error occurred") });
  } else {
    res.json({ success: false, msg: (err.message) });
  }
};
