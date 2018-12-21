var fs = require("fs");

module.exports.checkNatiionalCode = function(nationalCode) {
  if (nationalCode.length != 10) {
    return false;
  }
  var nationalIdInt = parseInt(nationalCode, 10);
  var sum = 0;
  var pos = 2;
  var controlDig = nationalIdInt % 10;
  nationalIdInt = parseInt(nationalIdInt / 10);
  while (nationalIdInt > 0) {
    sum += (nationalIdInt % 10) * pos;
    nationalIdInt = parseInt(nationalIdInt / 10);
    pos++;
  }
  if (sum % 11 < 2) {
    if (sum % 11 == controlDig) return true;
  } else {
    if (sum % 11 == 11 - controlDig) {
      return true;
    }
  }
  return false;
};

module.exports.checkMobileNumber = function(mobileNumber) {
  return /^([0-9]{10,11})$/.test(mobileNumber);
};
