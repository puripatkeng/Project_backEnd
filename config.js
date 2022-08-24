require('dotenv').config();

const config = {
  isVercel: process.env.IS_VERCEL || false,
  port: +process.env.PORT || 8080,
  mongodb: {
    uri: process.env.MONGO_URI,
    user: process.env.MONGO_USER,
    pass: process.env.MONGO_PASSWORD,
    dbName: process.env.MONGO_DATABASE,
    
  },
};

module.exports = config;