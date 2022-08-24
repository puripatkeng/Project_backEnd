require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const controllerMongoose = require("./src/controller/mongoose-controller");
const cookieParser = require("cookie-parser");
// const session = require("express-session");
const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
  credentials: true,
};
const routerIndex = require("./routerIndex");

app.use(bodyParser.json()); // for parsing application/json
app.use(cors(corsOptions));
app.use(cookieParser());

app.use(controllerMongoose.connectMongoose);
app.use(routerIndex);

// app.get("/", (req, res, next) => {
//   res.send(req.cookies);
// });
// const authSession = require("./src/middlewares/authSession");

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});
