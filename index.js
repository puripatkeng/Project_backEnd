// app.get("/", (req, res, next) => {
//   res.send(req.cookies);
// });
// const authSession = require("./src/middlewares/authSession");
// require("dotenv").config();
// const express = require("express");
// const app = express();
// app.listen(process.env.PORT, () => {
//   console.log(`Server is listening on port ${process.env.PORT}`);
// });

const mongoose = require("mongoose");
const app = require("./api/index");

const config = require("./config");

const boot = async () => {
  // Connect to mongodb
  await mongoose.connect(config.mongodb.uri, {
    user: process.env.MONGO_USER,
    pass: process.env.MONGO_PASSWORD,
    retryWrites: true,
  });
  // Start express server
  app.listen(config.port, () => {
    console.log(`Server is listening on port ${config.port}`);
  });
};

boot();
