const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  registerNumber: {
    type: String,
    unique: true,
    required: true,
  },
  programme: {
    type: String,
    required: true,
    enum: ["UG", "PG", "PHD"],
    default: "UG",
  },
  dob: {
    type: Date,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    required: true,
  },
  residence: {
    type: String,
    enum: ["hosteller", "dayscholar", "other"],
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  verifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    default: null,
  },
  password: String,
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
