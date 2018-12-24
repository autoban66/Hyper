const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
require("express-async-errors");

const codes = require("../routes/codes");
const accounts = require("../routes/accounts");

module.exports = async function(app) {
  // CORS Middleware
  app.use(cors());

  // Body Parser Middleware
  app.use(bodyParser.json());

  // Passport Middleware
  app.use(passport.initialize());
  app.use(passport.session());

  require("../middlewares/passport")(passport);

  app.use("/codes", codes);
  app.use("/accounts", accounts);
};
