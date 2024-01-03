const express = require("express");
const router = express.Router();
const doctorControler = require("../controllers/doctor.controler");

// Routes for prescriptions
router.get("/", doctorControler.getAllDoctors);
router.get("/:id", doctorControler.getDoctor);
router.post("/", doctorControler.addDoctor);
router.put("/:id", doctorControler.updateDoctor);
router.delete("/:id", doctorControler.deleteDoctor);
router.delete("/mail/:email", doctorControler.deleteMail);

module.exports = router;
