const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

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
app.use(
  cors({
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  })
);
app.use(cookieParser());
app.use(routerIndex);

module.exports = app;
