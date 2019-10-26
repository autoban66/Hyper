const express = require("express");
const path = require("path");
const errors = require("./middlewares/errors");
const config = require("config");

let app = express();
require("./boot/logging")();
require("./boot/db");
require("./boot/i18n");
require("./boot/routes")(app);

const port = config.get("port");

process.env.NODE_CONFIG_DIR = path.join(__dirname, "./config");

app.use(errors);

app.listen(port, () => {
  console.log("Server started on " + port);
});
