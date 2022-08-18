const express = require("express");
const router = express.Router();
const controller = require("../controller/activity-controller");

router.get("/", controller.getAllActivities);

router.get("/:activityId", controller.getActivityById);

router.post("/", controller.createActivity);

router.patch("/:activityId", controller.editActivity);

router.delete("/:activityId", controller.deleteActivity);

module.exports = router;
