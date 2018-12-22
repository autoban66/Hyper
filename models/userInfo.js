const Joi = require("joi");

const userInfoSchema = Joi.object().keys({
  firstName: Joi.string()
    .min(3)
    .max(30)
    .required()
    .error(new Error("Invalid first name")),
  lastName: Joi.string()
    .min(3)
    .max(30)
    .required()
    .error(new Error("Invalid last name")),
  nationalCode: Joi.string()
    .required()
    .regex(/^[0-9]{10,10}$/)
    .error(new Error("Invalid national code")),
  mobileNumber: Joi.string()
    .required()
    .regex(/^0?9[0-9]{9,9}$/)
    .error(new Error("Invalid mobile number")),
  gender: Joi.string()
    .required()
    .valid("Male", "Female")
    .error(new Error("Invalid gender")),
  birthDate: Joi.date()
    .required()
    .error(new Error("Invalid birthdate")),
  address: Joi.string()
    .required()
    .min(3)
    .max(100)
    .error(new Error("Invalid address")),
  codes: Joi.array()
    .required()
    .items(
      Joi.string()
        .regex(/^[A-Za-z0-9]{10,10}$/)
        .error(new Error("Invalid lottery code"))
    )
});

module.exports = userInfoSchema;
