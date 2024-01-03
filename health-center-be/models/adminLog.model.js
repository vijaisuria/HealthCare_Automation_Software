const mongoose = require("mongoose");

const adminLogSchema = new mongoose.Schema(
  {
    adminUsername: {
      type: String,
      required: true,
    },
    action: {
      type: String,
      required: true,
    },
    notes: String,
  },
  { timestamps: true }
);

const AdminLog = mongoose.model("AdminLog", adminLogSchema);

module.exports = AdminLog;
