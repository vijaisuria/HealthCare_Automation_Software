const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  username: String,
  email: String,
  date: Date,
  speciality: String,
  timeSlot: String,
  startTime: String, // Add startTime field
  endTime: String, // Add endTime field
  reason: String,
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
