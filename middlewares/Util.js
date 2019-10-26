module.exports.checkNatiionalCode = function(nationalCode) {
  if (nationalCode.length != 10) {
    return false;
  }
  let nationalIdInt = parseInt(nationalCode, 10);
  let sum = 0;
  let pos = 2;
  let controlDig = nationalIdInt % 10;
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
