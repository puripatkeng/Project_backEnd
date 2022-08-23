const mongoose = require("mongoose");

exports.connectMongoose = async (req, res, next) => {
  try {
    await mongoose.connect("mongodb+srv://keng:keng1123@cluster0.veoyzwr.mongodb.net/?retryWrites=true&w=majority"
    );
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
};
