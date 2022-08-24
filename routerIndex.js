const express = require("express");
const router = express.Router();
// const authSession = require("./src/middlewares/authSession");

const activityRouter = require("./src/route/activityRoute");
const authRouter = require("./src/route/authRoute");
const userRouter = require("./src/route/userRoute");

router.use("/auth", authRouter);
router.use("/users", userRouter);
// router.use("/activities", authSession, activityRouter);
router.use("/activities", activityRouter);
module.exports = router;
