const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const staff = require("../models/staff.model");

router.post("/register", async (req, res) => {
  try {
    const { name, staffId, dob, email, phone, department, gender } = req.body;
    const existingUser = await staff.findOne({ staffId });
    if (existingUser) {
      return res.status(409).json({ error: "Staff already exist" });
    }

    const newStaff = new staff({
      name,
      staffId,
      dob,
      email,
      phone,
      department,
      gender,
      password: dob.toString().slice(0, 10),
    });

    const savedStaff = await newStaff.save();
    res.status(201).json({
      message: "Staff signed up successfully",
      staff: newStaff,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Sign-up failed" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { staffId, password } = req.body;
    const Staff = await staff.findOne({ staffId: staffId });
    if (!Staff) {
      return res.status(404).json({ error: "Staff not found" });
    }

    if (password != Staff.password) {
      return res.status(401).json({ error: "Invalid password" });
    }

    res.status(200).json({
      message: "Login succesful",
      staff: {
        name: Staff.name,
        staffId: Staff.staffId,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Login failed" });
  }
});

//get all staff
router.get("/", async (req, res) => {
  try {
    const staffs = await staff.find();
    res.status(200).json(staffs);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to get staffs" });
  }
});

//get staff by id
router.get("/:id", async (req, res) => {
  try {
    const staffId = req.params.id;
    const staff = await staff.findOne({ staffId: staffId });
    if (!staff) {
      return res.status(404).json({ error: "Staff not found" });
    }
    res.status(200).json(staff);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to get staff" });
  }
});

//get staff by staffId
router.get("/staffId/:staffId", async (req, res) => {
  try {
    const staffId = req.params.staffId;
    const staff = await staff.findOne({ staffId: staffId });
    if (!staff) {
      return res.status(404).json({ error: "Staff not found" });
    }
    res.status(200).json(staff);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to get staff" });
  }
});

router.put("/verifyStaff/:staffId", async (req, res) => {
  const { staffId } = req.params;
  const { verifiedBy } = req.body;

  try {
    const updatedStaff = await Staff.findOneAndUpdate(
      { staffId },
      { verified: true, verifiedBy },
      { new: true }
    );

    if (!updatedStaff) {
      return res.status(404).json({ error: "Staff not found" });
    }

    res.json(updatedStaff);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
