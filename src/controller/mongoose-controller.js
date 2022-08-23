const mongoose = require("mongoose");

exports.connectMongoose = async (req, res, next) => {
  try {
    await mongoose.connect(""
    );
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
};
