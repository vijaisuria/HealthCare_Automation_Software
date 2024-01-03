const mongoose = require("mongoose");

const prescriptionSchema = new mongoose.Schema(
  {
    nurseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Nurse",
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    patientName: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    year: String,
    patientRegNo: String,
    department: String,
    gender: String,
    temperature: Number,
    spo2: Number,
    heartRate: Number,
    bloodPressure: String,
    tests: String,
    date: {
      type: Date,
      required: true,
    },
    symptoms: String,
    medicine: [
      {
        name: String,
        dosage: String,
        food: String,
        duration: String,
        type: String,
      },
    ],
    nextVisit: Date,
    advice: String,
    isCompleted: {
      type: Boolean,
      default: false,
    },
    completedBy: {
      type: String,
      enum: ["Nurse", "Doctor"],
      default: "Nurse",
    },
  },
  {
    timestamps: true,
  }
);

const Prescription = mongoose.model("Prescription", prescriptionSchema);
module.exports = Prescription;
