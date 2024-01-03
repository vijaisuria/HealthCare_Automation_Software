const express = require("express");
const router = express.Router();

const prescriptionController = require("../controllers/prescription.controler");

// Route for adding a new request
router.post("/", prescriptionController.addRequest);

// Route for getting all requests
router.get("/", prescriptionController.getAllRequests);

// Route for getting all requests for a specific doctor
router.get("/doctor/:doctorId", prescriptionController.getAllRequestsForDoctor);

// Route for updating the response to a request
router.put("/response/:requestId", prescriptionController.updateResponse);

router.get("/:id", prescriptionController.getRequest);

router.delete("/:requestId", prescriptionController.deleteRequest);

router.post("/upload-profile-image", prescriptionController.uploadProfileImage);

router.get("/user/:reg", prescriptionController.getAllStudentPrescriptions);

module.exports = router;
