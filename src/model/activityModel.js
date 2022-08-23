const mongoose = require("mongoose");
("use strict");
const mongooseDateFormat = require("mongoose-date-format-v2");

const options = {
  page: 1,
  limit: 3,
  totalPages: 2,
};
const activitiesSchema = new mongoose.Schema(
  {
    id: { type: String },
    type: {
      type: String,
      enum: ["Running", "Swimming", "Hiking", "Biking"],
      required: true,
    },
    date: { type: Date, required: true },
    durations: { type: Number, min: 0, required: true },
    calories: { type: Number, min: 0, required: true },
    note: { type: String, max: 100 },
  },
  { timestamps: true }
);
activitiesSchema.plugin(mongooseDateFormat);

const activitiesModel = mongoose.model("Activities", activitiesSchema);

module.exports = activitiesModel;
