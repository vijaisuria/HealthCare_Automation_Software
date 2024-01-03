const express = require("express");
const router = express.Router();
const Appointment = require("../models/appointment.model");
const Schedule = require("../models/schedule.model");
const moment = require("moment");

// Create a new appointment
router.post("/", async (req, res) => {
  try {
    const newAppointment = new Appointment(req.body);
    const savedAppointment = await newAppointment.save();
    res.status(201).json(savedAppointment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route to get time slots based on selected speciality
router.get("/timeslot/:speciality/:day/", async (req, res) => {
  try {
    const selectedSpeciality = req.params.speciality;
    const selectedDay = req.params.day;

    console.log(selectedDay, selectedSpeciality);

    const appointments = await Appointment.find({
      speciality: selectedSpeciality,
    });

    const bookedTimeSlots = appointments.map((appointment) => {
      return {
        startTime: appointment.startTime,
        endTime: appointment.endTime,
      };
    });
    console.log(selectedSpeciality, bookedTimeSlots);

    // Fetch all time slots for the given speciality and day
    const schedule = await Schedule.findOne({
      specialty: selectedSpeciality,
      day: selectedDay,
    });
    console.log(schedule);

    const allTimeSlots = [];

    const startTime = moment(schedule.startTime, "HH:mm");
    const endTime = moment(schedule.endTime, "HH:mm");

    let currentTime = moment(startTime);

    while (currentTime.isBefore(endTime)) {
      const slot = {
        startTime: currentTime.format("HH:mm"),
        endTime: currentTime.add(20, "minutes").format("HH:mm"),
      };

      allTimeSlots.push(slot);
    }

    console.log(allTimeSlots);

    // Filter out booked time slots
    const availableTimeSlots = allTimeSlots.filter((timeSlot) => {
      const slotIsBooked = bookedTimeSlots.some((bookedSlot) => {
        console.log(bookedSlot, timeSlot);
        return (
          bookedSlot.startTime === timeSlot.startTime &&
          bookedSlot.endTime === timeSlot.endTime
        );
      });
      return !slotIsBooked;
    });
    console.log("available", availableTimeSlots);
    res.json(availableTimeSlots);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error fetching time slots" });
  }
});

// Get all appointments
router.get("/", async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get appointments of a particular user
router.get("/user/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const appointments = await Appointment.find({ username });
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a particular appointment by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findById(id);
    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a appointment
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(updatedAppointment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a appointment
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Appointment.findByIdAndDelete(id);
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
