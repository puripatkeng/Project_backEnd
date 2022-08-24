const cors = require("cors");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
  credentials: true,
};
const routerIndex = require("../routerIndex");

app.use(bodyParser.json()); // for parsing application/json
app.use(cors(corsOptions));

app.use(routerIndex);

module.exports = app;
