const Activities = require("../model/activityModel");

exports.getAllActivities = async (req, res, next) => {
  try {
    let query = Activities.find().sort({ _id: -1 });
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * pageSize;
    const total = await Activities.countDocuments();
    const pages = Math.ceil(total / pageSize);

    query = query.skip(skip).limit(pageSize);
    if (page > pages) {
      return res.status(404).json({
        message: "No page found",
      });
    }

    const result = await query;

    res.status(200).json({
      status: "success",
      page,
      per_page: result.length,
      total,
      total_page: pages,
      activities: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Server Error",
    });
  }
};

exports.getActivityById = async (req, res, next) => {
  // console.log("GET data from", req.params);

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
    console.log(uid);
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
  try {
    const uid = req.params.activityId;
    console.log(uid);
    const activity = await Activities.deleteOne({ _id: uid });
    if (!activity) {
      throw new Error("Activity not exists");
    }
    res.status(200).send(`activity id: ${uid} is deleted`);
  } catch (error) {
    res.status(404).send(`${error}`);
  }
};
const currentTime = new Date();
const day = new Date(currentTime).getDate();
const month = new Date(currentTime).getMonth() + 1; // month is 0-11
const year = new Date(currentTime).getFullYear();

const formatDate = (month) => {
  if (month < 10) {
    return `0${month}`;
  }
  return `${month}`;
};
const thisMonth = `${year},${formatDate(month)}`;

exports.getAllActivitiesThisMonth = async (req, res, next) => {
  try {
    const { page:reqPage, limit } = req.query;

    let query = Activities.find({
      date: { $lt: new Date(), $gt: new Date(thisMonth) },
    }).sort({ _id: -1 });

    const total = await Activities.countDocuments();

    const page = parseInt(reqPage) || 1;
    const pageSize = parseInt(limit) || 10;
    const skip = (page - 1) * pageSize;
    const pages = Math.ceil(total / pageSize);

    query = query.skip(skip).limit(pageSize);

    if (page > pages) {
      return res.status(404).json({
        message: "No page found",
      });
    }

    const result = await query;

    const response = {
      status: "success",
      page,
      per_page: result.length,
      total,
      total_page: pages,
      activities: result,
    };

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Server Error",
    });
  }
};
