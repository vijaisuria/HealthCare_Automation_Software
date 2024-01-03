const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  staffId: {
    type: String,
    required: true,
    unique: true,
  },
  phone: String,
  email: {
    type: String,
  },
  dob: {
    type: Date,
    required: true,
  },
  department: {
    type: String,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    required: true,
  },
  password: String,
});

const Staff = mongoose.model("Staff", staffSchema);

module.exports = Staff;
