const mongoose = require("mongoose");
const system = require("../configs/system");

mongoose.connect(system.MongoURL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to DB");
});

mongoose.connection.on("error", () => {
  console.error("Connection Error!");
});
