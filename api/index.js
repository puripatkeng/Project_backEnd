const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routerIndex = require("../routerIndex");
const config = require("../config");

const app = express();

if (config.isVercel) {
  app.use(async (req, res, next) => {
    await mongoose.connect(config.mongoUri, config.mongoOptions);
    return next();
  });
}

app.use(cors());
app.use(bodyParser.json());
app.use("/api",routerIndex);

module.exports = app;
