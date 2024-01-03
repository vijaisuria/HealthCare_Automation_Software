const Doctor = require("../models/doctor.model");

// Controller functions for doctors
exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getDoctor = async (req, res) => {
  const did = req.params.id;
  try {
    const doctor = await Doctor.findById(did);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });
    res.status(200).json(doctor);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.addDoctor = async (req, res) => {
  try {
    const existing = await Doctor.findOne({ email: req.body.email });
    if (existing)
      return res.status(409).json({ message: "Doctor already exists" });
    const doctor = new Doctor(req.body);
    await doctor.save();
    res.status(201).json(doctor);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.status(200).json({ message: "Doctor deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteMail = async (req, res) => {
  const email = req.params.email;

  Doctor.findOneAndDelete({ email: email })
    .then((doctor) => {
      if (!doctor) {
        res.status(404).send("Doctor not found");
      } else {
        res.status(200).send("Doctor deleted successfully");
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    });
};
