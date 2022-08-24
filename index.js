const express = require("express");
const mongoose = require("mongoose");
const app = require("./api/index");

const config = require("./config");

const boot = async () => {
  // Connect to mongodb
  await mongoose.connect(config.mongodb.uri, {
    user: config.mongodb.username,
    pass: config.mongodb.password,
    dbName: config.mongodb.dbName,
    retryWrites: true,
  });
  // Start express server
  app.listen(config.port, () => {
    console.log(`Server is listening on port ${config.port}`);
  });
};

boot();
