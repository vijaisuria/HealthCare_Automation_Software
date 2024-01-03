// create a mongoose model for nurse
const mongoose = require("mongoose");

const nurseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    qualification: { type: String, required: false },
    specialization: { type: String, required: false },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Nurse = mongoose.model("Nurse", nurseSchema);
module.exports = Nurse;
