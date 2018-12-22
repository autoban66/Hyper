const winston = require("winston");

module.exports = function(err, req, res, next) {
  winston.error({ message: err.message + " on " + req.originalUrl, stack: err.stack });
  if (err instanceof ReferenceError || err instanceof SyntaxError || err instanceof TypeError) {
    res.json({ success: false, msg: __("Server error occurred") });
  } else {
    res.json({ success: false, msg: __(err.message) });
  }
};
