const config = require("config");

const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

mongoose.connect(
  config.get("database"),
  { useCreateIndex: true, useNewUrlParser: true }
);

mongoose.connection.on("connected", async () => {
  console.log("Connetcted to DataBase");
});
