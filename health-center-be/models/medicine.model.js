// create a mongoose model for medicine
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const medicineSchema = new Schema(
  {
    name: { type: String, required: true },
    type: String,
    countInStock: {
      type: Number,
    },
    expdate: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

const Medicine = mongoose.model("Medicine", medicineSchema);

module.exports = Medicine;
