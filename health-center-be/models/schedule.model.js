const mongoose = require("mongoose");

const doctorScheduleSchema = new mongoose.Schema({
  day: { type: String, required: true },
  specialty: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
});

module.exports = mongoose.model("DoctorSchedule", doctorScheduleSchema);
