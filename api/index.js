const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("../config");
const app = express();
const routerIndex = require("../routerIndex");
const cookieParser = require("cookie-parser");

if (config.isVercel) {
  app.use(async (req, res, next) => {
    await mongoose.connect(config.mongodb.uri, {
      user: config.mongodb.username,
      pass: config.mongodb.password,
      dbName: config.mongodb.dbName,
      retryWrites: true,
    });

    return next();
  });
}

app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());
app.use(routerIndex);

module.exports = app;
