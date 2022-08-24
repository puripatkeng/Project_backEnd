const cors = require("cors");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const controllerMongoose = require("./src/controller/mongoose-controller");
const cookieParser = require("cookie-parser");

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
  credentials: true,
};
const routerIndex = require("./routerIndex");

app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(cookieParser());

app.use(controllerMongoose.connectMongoose);
app.use(routerIndex);
