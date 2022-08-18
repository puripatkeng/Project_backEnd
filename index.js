require("dotenv").config();
const cors = require('cors');
const express = require("express");
const app = express();
const activityRouter = require("./src/route/route");
const bodyParser = require("body-parser");
const controllerMongoose = require("./src/controller/mongoose-controller");
const corsOptions = {
  origin: 'http://127.0.0.1:5173/',
  optionsSuccessStatus: 200 ,
  credentials: true,
};


app.use(cors(corsOptions));

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(controllerMongoose.connectMongoose);

app.use("/activities", activityRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});
