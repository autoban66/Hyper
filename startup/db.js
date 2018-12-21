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
  // var stream = fs.createWriteStream("codes3.txt");
  // stream.once("open", async function(fd) {
  //   // var lotteryCodes = await Lottery.find().limit(1000);
  //   console.time("insert");
  //   for (let index = 0; index < 6000000; index++) {
  //     // await Lottery.updateLotteryByCode(lotteryCodes[index].code, "s", "s");
  //     stream.write(randToken.generate(10).toLowerCase() + "\n");
  //     if (index % 10000 == 0) {
  //       console.log(index);
  //     }
  //   }
  //   stream.end();
  //   console.timeEnd("insert");
  // });

  // for (let index = 0; index < 10000; index++) {
  //   await Lottery.updateLotteryByCode("wjzlnnqmjc", "s", "s");
  //   //   await Lottery.addLottery(randToken.generate(10));
  // }
});
