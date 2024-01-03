const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const querySchema = new Schema(
  {
    name: String,
    designation: {
      type: String,
      enum: ["Doctor", "Nurse", "Student", "Admin"],
      required: true,
    },
    subject: String,
    message: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Query", querySchema);
