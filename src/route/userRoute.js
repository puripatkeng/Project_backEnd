const express = require("express");

const userRoutes = express.Router();

const userController = require("../controller/userController");

userRoutes.get("/:user_id", userController.getUserById);

module.exports = userRoutes;
