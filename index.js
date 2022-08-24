// app.get("/", (req, res, next) => {
//   res.send(req.cookies);
// });
// const authSession = require("./src/middlewares/authSession");
require("dotenv").config();
const express = require("express");
const app = express();
app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});
