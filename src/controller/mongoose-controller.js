const mongoose = require("mongoose");
const config = require("../../config");

exports.connectMongoose = async (req, res, next) => {
  try {
    await mongoose.connect(config.mongodb.uri, {
      user: process.env.MONGO_USER,
      pass: process.env.MONGO_PASSWORD,
      retryWrites:true,
    });
    console.log("Connected to Mongoose");
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
};
