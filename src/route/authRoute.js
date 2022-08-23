const express = require("express");
const authRoute = express.Router();

const userController = require("../controller/userController");
const authController = require("../controller/authController");

authRoute.post("/sign-in", authController.signIn);

authRoute.post("/sign-up", userController.createUser);

authRoute.post("/sign-out", authController.signOut);

module.exports = authRoute;
