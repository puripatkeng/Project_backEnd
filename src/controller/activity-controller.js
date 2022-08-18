const Activities = require("../model/activityModel");

exports.getAllActivities = async (req, res, next) => {
  const activities = await Activities.find();
  res.header("Access-Control-Allow-Origin", "*");
  res.send(activities);
};

exports.getActivityById = async (req, res, next) => {
  console.log("GET data from", req.params);

  try {
    const activity = await Activities.findById(req.params.activityId)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        return err;
      });
    if (activity.name === "CastError") {
      throw new Error(`Activity is not found`);
    }
    // console.log(activity);

    res.json(activity.toJSON());
  } catch (error) {
    res.status(200).send(`${error}`);
  }
};

exports.createActivity = async (req, res) => {
  // console.log(req.body);

  try {
    const newActivity = new Activities(req.body);

    await newActivity.save();
    res.send(newActivity);
  } catch (error) {
    res.status(400).send(`${error}`);
  }
};

exports.editActivity = async (req, res) => {
  // res.send('update')

  try {
    const uid = req.params.activityId;
    const activity = await Activities.updateOne(
      { _id: uid },
      { $set: req.body }
    );

    if (!activity) {
      throw new Error("Bad request");
    }

    // console.log(`updated data in id ${uid} !!`);
    res.status(200).send("activity updated");
  } catch (error) {
    res.status(400).send(`${error}`);
  }
};

exports.deleteActivity = async (req, res, next) => {
  const uid = req.params.activityId;
  const activity = await Activities.deleteOne({ _id: uid });
  if (!activity) {
    res.status(404).send("Activity not exists");
  }
  res.status(200).send(`activity id: ${uid} is deleted`);
};
