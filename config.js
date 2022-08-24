require("dotenv").config();

const config = {
  isVercel: process.env.IS_VERCEL || false,
  port: +process.env.PORT || 4001,
  mongoUri: process.env.MONGO_URI,
  mongoOptions: {
    user: process.env.MONGO_USER,
    pass: process.env.MONGO_PASSWORD,
    dbName: process.env.MONGO_DATABASE,
    retryWrites: true,
    w: "majority",
  },
};

module.exports = config;
