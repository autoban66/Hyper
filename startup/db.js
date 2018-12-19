const config = require("config");
const Lottery = require("../models/lottery");
const randToken = require("rand-token");
var fs = require("fs");

const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

mongoose.connect(
  config.get("database"),
  { useCreateIndex: true, useNewUrlParser: true }
);

mongoose.connection.on("connected", async () => {
  console.log("Connetcted to DataBase");
  // var stream = fs.createWriteStream("codes.txt");
  // stream.once("open", async function(fd) {
  var lotteryCodes = await Lottery.find().limit(1000);
  console.time("insert");
  for (let index = 0; index < lotteryCodes.length; index++) {
    await Lottery.updateLotteryByCode(lotteryCodes[index].code, "s", "s");
    // stream.write(lotteryCodes[index].code + "\n");
  }
  // stream.end();
  // });

  // for (let index = 0; index < 10000; index++) {
  //   await Lottery.updateLotteryByCode("wjzlnnqmjc", "s", "s");
  //   //   await Lottery.addLottery(randToken.generate(10));
  // }
  console.timeEnd("insert");
});
