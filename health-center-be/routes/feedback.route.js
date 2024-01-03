const express = require("express");
const router = express.Router();
const Nurse = require("../models/nurse.model");

router.get("/", async (req, res) => {
  try {
    const nurses = await Nurse.find({});
    res.status(200).json(nurses);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const nurse = await Nurse.findById(req.params.id);
    res.status(200).json(nurse);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const nurse = new Nurse(req.body);
    await nurse.save();
    res.status(200).json(nurse);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
