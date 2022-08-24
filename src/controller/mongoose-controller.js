require("dotenv").config();
const mongoose = require("mongoose");
const config = require("../../config");

exports.connectMongoose = async (req, res, next) => {
  try {
    await mongoose.connect(config.mongoUri,config.mongoOptions)
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
};
