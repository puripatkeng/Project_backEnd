const mongoose = require("mongoose");
("use strict");
const mongooseDateFormat = require("mongoose-date-format-v2");
const activitiesSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Running", "Swimming", "Hiking", "Biking"],
    required: true,
  },
  date: { type: Date, required: true },
  durations: { type: Number, min: 0, required: true },
  calories: { type: Number, min: 0, required: true },
  note: { type: String, max: 100 },
});
activitiesSchema.plugin(mongooseDateFormat);

const activitiesModel = mongoose.model("Activities", activitiesSchema);

module.exports = activitiesModel;
