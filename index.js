const express = require("express");
const mongoose = require("mongoose");
const app = require("./api/index.js");
const config = require("./config");

const boot = async () => {
  await mongoose
    .connect(await mongoose.connect(config.mongoUri, config.mongoOptions))
    .then(() => app.listen(8080))
    .then(() =>
      console.log("Connected TO Database and Listening TO Localhost 8080")
    )
    .catch((err) => console.log(err));
};

boot();
