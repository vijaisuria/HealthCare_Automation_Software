const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
  name: String,
  email: String,
  message: String,
  phone: String,
  status: String,
  doctorId: String,
  doctorName: String,
  nurseId: String,
  nurseName: String,
  studentRegNo: String,
});

module.exports = mongoose.model("Feedback", feedbackSchema);
