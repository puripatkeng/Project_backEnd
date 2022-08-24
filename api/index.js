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
// Body parser to parse json in request body for us
app.use(bodyParser.json());
// CORS
app.use(
  cors({
    origin: "https://project-front-end-kappa.vercel.app/",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  })
);

app.use("/api", routerIndex);

module.exports = app;
