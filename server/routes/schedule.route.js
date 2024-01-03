const express = require("express");
const router = express.Router();
const Schedule = require("../models/schedule.model");

// Get all schedules
router.get("/", async (req, res) => {
  try {
    const schedules = await Schedule.find();
    res.status(200).json(schedules);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a particular schedule by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const schedule = await Schedule.findById(id);
    res.status(200).json(schedule);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new schedule
router.post("/", async (req, res) => {
  try {
    const newBooking = new Schedule(req.body);
    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a schedule
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBooking = await Schedule.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedBooking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a schedule
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Schedule.findByIdAndDelete(id);
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
