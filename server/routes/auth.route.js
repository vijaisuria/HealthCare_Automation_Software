const express = require("express");
const router = express.Router();
const Doctor = require("../models/doctor.model");
const Admin = require("../models/admin.model");
const Nurse = require("../models/nurse.model");
const AdminLog = require("../models/adminLog.model");
const Student = require("../models/student.model");

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctor = await Doctor.findOne({ email });
    if (!doctor)
      return res.status(400).json({ message: "Doctor does not exist" });
    if (doctor.password !== password)
      return res.status(400).json({ message: "Incorrect password" });
    return res.status(200).json({
      message: "Logged in successfully",
      doctorId: doctor._id,
      doctorName: doctor.name,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
});

router.post("/nurse", async (req, res) => {
  try {
    const { email, password } = req.body;
    const nurse = await Nurse.findOne({ email });
    if (!nurse)
      return res.status(400).json({ message: "Nurse does not exist" });
    if (nurse.password !== password)
      return res.status(400).json({ message: "Incorrect password" });
    return res.status(200).json({
      message: "Logged in successfully",
      nurseId: nurse._id,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
});

router.post("/student", async (req, res) => {
  try {
    const { registerNumber, password } = req.body;
    console.log(registerNumber);
    const student = await Student.findOne({ registerNumber });
    if (!student)
      return res.status(400).json({ message: "Studnet does not exist" });
    if (student.password !== password)
      return res.status(400).json({ message: "Incorrect password" });
    return res.status(200).json({
      message: "Logged in successfully",
      nurseId: student._id,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/admin", async (req, res) => {
  try {
    const admin = await Admin.find();
    return res.status(200).json(admin);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
});

router.post("/admin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin)
      return res.status(400).json({ message: "Admin does not exist" });
    if (admin.password !== password)
      return res.status(400).json({ message: "Incorrect password" });
    return res
      .status(200)
      .json({
        message: "Logged in successfully",
        admin: admin.username,
        adminId: admin._id,
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/admin-logs", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const skip = (page - 1) * limit;

  const logs = await AdminLog.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  res.json(logs);
});

router.post("/admin-logs", async (req, res) => {
  const { adminUsername, action, notes } = req.body;
  const log = await AdminLog.create({ adminUsername, action, notes });
  res.json(log);
});

module.exports = router;
