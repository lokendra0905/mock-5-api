const mongoose = require("mongoose");
const DoctorSchema = mongoose.Schema(
  {
    name: { type: String },
    image: { type: String },
    specialization: { type: String },
    experience: { type: String },
    location: { type: String },
    date: { type: String },
    slots: { type: Number },
  },
  {
    versionKey: false,
  }
);

const DoctorModel = mongoose.model("doctor", DoctorSchema);

module.exports = {
  DoctorModel,
};
