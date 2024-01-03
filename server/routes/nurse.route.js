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

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const nurse = await Nurse.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(nurse);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await Nurse.findByIdAndDelete(id);
    res.status(200).json({ message: "Nurse deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/mail/:email", async (req, res) => {
  const email = req.params.email;

  Nurse.findOneAndDelete({ email: email })
    .then((nurse) => {
      if (!nurse) {
        res.status(404).send("Nurse not found");
      } else {
        res.status(200).send("Nurse deleted successfully");
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    });
});

module.exports = router;
