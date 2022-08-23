require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const controllerMongoose = require("./src/controller/mongoose-controller");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const routerIndex = require("./routerIndex");
app.use(cookieParser());



const oneDay = 1000 * 60 * 60 * 24;
app.use(
  session({
    secret: "asdjfklasdjklfjasldkjflkjlkasjlkfjldkasjflkajlskdf",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false,
  })
);


const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(cors());

app.get("/", (req, res, next) => {
  res.send(req.cookies);
});

const authSession = require("./src/middlewares/authSession");

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(controllerMongoose.connectMongoose);
app.use(routerIndex)


app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});
